from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.cart.models import Cart, CartItem
from apps.orders.models import Order, OrderItem
from apps.products.models import Product
from django.core.mail import EmailMultiAlternatives
import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY


class GetPaymentTotalView(APIView):
    def get(self, request, format=None):
        user = self.request.user
        tax = 0.21

        try:
            cart = Cart.objects.get(user=user)

            if not CartItem.objects.filter(cart=cart).exists():
                return Response(
                    {'error': 'Need to have items in cart'},
                    status=status.HTTP_404_NOT_FOUND
                )

            cart_items = CartItem.objects.filter(cart=cart)
            total_amount = 0.0
            total_compare_amount = 0.0

            for cart_item in cart_items:
                if not Product.objects.filter(id=cart_item.product.id).exists():
                    return Response(
                        {'error': 'A product with the provided ID does not exist'},
                        status=status.HTTP_404_NOT_FOUND
                    )
                if int(cart_item.count) > int(cart_item.product.quantity):
                    return Response(
                        {'error': 'Not enough items in stock'},
                        status=status.HTTP_200_OK
                    )
                total_amount += float(cart_item.product.price) * float(cart_item.count)
                total_compare_amount += float(cart_item.product.compare_price) * float(cart_item.count)

            total_compare_amount = round(total_compare_amount, 2)
            original_price = round(total_amount, 2)
            estimated_tax = round(total_amount * tax, 2)
            total_amount = round(total_amount + (total_amount * tax), 2)

            return Response({
                'original_price': f'{original_price:.2f}',
                'total_amount': f'{total_amount:.2f}',
                'total_compare_amount': f'{total_compare_amount:.2f}',
                'estimated_tax': f'{estimated_tax:.2f}',
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {'error': 'Something went wrong when retrieving payment total'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class ProcessPaymentView(APIView):
    def post(self, request, format=None):
        user = self.request.user
        data = self.request.data
        tax = 0.21

        payment_method_id = data['payment_method_id']
        full_name = data['full_name']
        address_line_1 = data['address_line_1']
        address_line_2 = data['address_line_2']
        city = data['city']
        state_province_region = data['state_province_region']
        postal_zip_code = data['postal_zip_code']
        country_region = data['country_region']
        telephone_number = data['telephone_number']

        try:
            cart = Cart.objects.get(user=user)
        except Cart.DoesNotExist:
            return Response({'error': 'Cart not found'}, status=status.HTTP_404_NOT_FOUND)

        cart_items = CartItem.objects.filter(cart=cart)
        if not cart_items.exists():
            return Response({'error': 'Need to have items in cart'}, status=status.HTTP_404_NOT_FOUND)

        total_amount = 0.0
        for cart_item in cart_items:
            total_amount += float(cart_item.product.price) * float(cart_item.count)
        total_amount = round(total_amount + (total_amount * tax), 2)
        total_amount_cents = int(total_amount * 100)

        # Crear y confirmar PaymentIntent con Stripe
        try:
            intent = stripe.PaymentIntent.create(
                amount=total_amount_cents,
                currency='usd',
                payment_method=payment_method_id,
                confirm=True,
                automatic_payment_methods={
                    'enabled': True,
                    'allow_redirects': 'never'
                },
            )
        except stripe.error.CardError as e:
            return Response({'error': e.user_message}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': 'Error al procesar el pago'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if intent.status != 'succeeded':
            return Response({'error': 'El pago no fue aprobado'}, status=status.HTTP_400_BAD_REQUEST)

        # Actualizar stock
        for cart_item in cart_items:
            product = Product.objects.get(id=cart_item.product.id)
            Product.objects.filter(id=cart_item.product.id).update(
                quantity=int(product.quantity) - int(cart_item.count),
                sold=int(product.sold) + int(cart_item.count)
            )

        # Crear orden
        try:
            order = Order.objects.create(
                user=user,
                transaction_id=intent.id,
                amount=total_amount,
                full_name=full_name,
                address_line_1=address_line_1,
                address_line_2=address_line_2,
                city=city,
                state_province_region=state_province_region,
                postal_zip_code=postal_zip_code,
                country_region=country_region,
                telephone_number=telephone_number,
            )
        except Exception as e:
            return Response(
                {'error': 'Pago exitoso pero error al crear la orden'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        for cart_item in cart_items:
            try:
                product = Product.objects.get(id=cart_item.product.id)
                OrderItem.objects.create(
                    product=product,
                    order=order,
                    name=product.name,
                    price=cart_item.product.price,
                    count=cart_item.count
                )
            except Exception as e:
                return Response(
                    {'error': 'Orden creada pero error al crear items de orden'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        # Construir detalle de productos para el recibo
        subtotal_amount = round(sum(float(ci.product.price) * float(ci.count) for ci in cart_items), 2)
        tax_amount = round(subtotal_amount * tax, 2)

        items_rows_text = ""
        items_rows_html = ""
        for ci in cart_items:
            line_total = float(ci.product.price) * float(ci.count)
            items_rows_text += f"\n  · {ci.product.name} x{ci.count}  —  ${line_total:.2f}"
            items_rows_html += f"""
                <tr>
                    <td style="padding:8px 12px;border-bottom:1px solid #fce4e4;">{ci.product.name}</td>
                    <td style="padding:8px 12px;border-bottom:1px solid #fce4e4;text-align:center;">{ci.count}</td>
                    <td style="padding:8px 12px;border-bottom:1px solid #fce4e4;text-align:right;">${float(ci.product.price):.2f}</td>
                    <td style="padding:8px 12px;border-bottom:1px solid #fce4e4;text-align:right;">${line_total:.2f}</td>
                </tr>"""

        fecha = order.date_issued.strftime('%d/%m/%Y %H:%M')

        # Versión texto plano
        text_body = f"""Hola {full_name},

¡Gracias por tu compra en Sofigurumis! 🧶
Tu pedido fue recibido y está siendo procesado.

━━━━━━━━━━━━━━━━━━━━━━━━
  RECIBO DE COMPRA
━━━━━━━━━━━━━━━━━━━━━━━━
N° de orden : {order.transaction_id}
Fecha       : {fecha}

PRODUCTOS:{items_rows_text}

──────────────────────────
Subtotal (sin IVA) : ${subtotal_amount:.2f}
IVA (21%)          : ${tax_amount:.2f}
TOTAL              : ${total_amount:.2f}
──────────────────────────

DIRECCIÓN DE ENVÍO:
{full_name}
{address_line_1}{(' — ' + address_line_2) if address_line_2 else ''}
{city}, {state_province_region} {postal_zip_code}
{country_region}
Tel: {telephone_number}

Podés ver el estado de tu pedido en tu panel de usuario.

Con cariño,
El equipo de Sofigurumis ✨
"""

        # Versión HTML
        html_body = f"""
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#FFF5F5;font-family:'Helvetica Neue',Arial,sans-serif;color:#3D0F0F;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF5F5;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(61,15,15,0.08);">

        <!-- Header -->
        <tr>
          <td style="background:#c87c7c;padding:32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:800;letter-spacing:1px;">Sofigurumis</h1>
            <p style="margin:8px 0 0;color:#fce4e4;font-size:14px;">🧶 Amigurumis artesanales</p>
          </td>
        </tr>

        <!-- Saludo -->
        <tr>
          <td style="padding:32px 40px 16px;">
            <h2 style="margin:0 0 8px;font-size:20px;color:#7c3d3d;">¡Gracias por tu compra, {full_name}!</h2>
            <p style="margin:0;color:#7c5c5c;font-size:14px;line-height:1.6;">
              Tu pedido fue recibido y está siendo procesado. A continuación encontrás el detalle de tu compra.
            </p>
          </td>
        </tr>

        <!-- N° orden y fecha -->
        <tr>
          <td style="padding:0 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff5f5;border-radius:10px;border:1px solid #fce4e4;">
              <tr>
                <td style="padding:14px 20px;">
                  <span style="font-size:12px;color:#c87c7c;font-weight:600;text-transform:uppercase;letter-spacing:1px;">N° de orden</span><br>
                  <span style="font-size:13px;color:#3D0F0F;font-family:monospace;">{order.transaction_id}</span>
                </td>
                <td style="padding:14px 20px;text-align:right;">
                  <span style="font-size:12px;color:#c87c7c;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Fecha</span><br>
                  <span style="font-size:13px;color:#3D0F0F;">{fecha}</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Tabla de productos -->
        <tr>
          <td style="padding:0 40px 24px;">
            <h3 style="margin:0 0 12px;font-size:13px;color:#c87c7c;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Productos</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #fce4e4;">
              <tr style="background:#fff0f0;">
                <th style="padding:10px 12px;text-align:left;font-size:12px;color:#c87c7c;font-weight:600;">Producto</th>
                <th style="padding:10px 12px;text-align:center;font-size:12px;color:#c87c7c;font-weight:600;">Cant.</th>
                <th style="padding:10px 12px;text-align:right;font-size:12px;color:#c87c7c;font-weight:600;">Precio</th>
                <th style="padding:10px 12px;text-align:right;font-size:12px;color:#c87c7c;font-weight:600;">Subtotal</th>
              </tr>
              {items_rows_html}
            </table>
          </td>
        </tr>

        <!-- Totales -->
        <tr>
          <td style="padding:0 40px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#7c5c5c;">Subtotal (sin IVA)</td>
                <td style="padding:6px 0;font-size:13px;color:#3D0F0F;text-align:right;">${subtotal_amount:.2f}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#7c5c5c;">IVA (21%)</td>
                <td style="padding:6px 0;font-size:13px;color:#3D0F0F;text-align:right;">${tax_amount:.2f}</td>
              </tr>
              <tr style="border-top:2px solid #fce4e4;">
                <td style="padding:12px 0 0;font-size:16px;font-weight:800;color:#3D0F0F;">TOTAL</td>
                <td style="padding:12px 0 0;font-size:16px;font-weight:800;color:#c87c7c;text-align:right;">${total_amount:.2f}</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Dirección de envío -->
        <tr>
          <td style="padding:0 40px 32px;">
            <h3 style="margin:0 0 12px;font-size:13px;color:#c87c7c;text-transform:uppercase;letter-spacing:1px;font-weight:700;">Dirección de envío</h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#fff5f5;border-radius:10px;border:1px solid #fce4e4;">
              <tr>
                <td style="padding:16px 20px;font-size:13px;color:#3D0F0F;line-height:1.8;">
                  <strong>{full_name}</strong><br>
                  {address_line_1}{(' — ' + address_line_2) if address_line_2 else ''}<br>
                  {city}, {state_province_region} {postal_zip_code}<br>
                  {country_region}<br>
                  Tel: {telephone_number}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#fff0f0;padding:24px 40px;text-align:center;border-top:1px solid #fce4e4;">
            <p style="margin:0 0 8px;font-size:13px;color:#7c5c5c;">
              Podés ver el estado de tu pedido en tu <strong>panel de usuario</strong>.
            </p>
            <p style="margin:0;font-size:12px;color:#c8a0a0;">Con cariño, el equipo de Sofigurumis ✨</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""

        # Enviar email de confirmación
        try:
            msg = EmailMultiAlternatives(
                subject='Recibo de compra — Sofigurumis',
                body=text_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=[user.email],
            )
            msg.attach_alternative(html_body, "text/html")
            msg.send(fail_silently=True)
        except Exception:
            pass

        # Limpiar carrito
        try:
            CartItem.objects.filter(cart=cart).delete()
            Cart.objects.filter(user=user).update(total_items=0)
        except Exception:
            pass

        return Response({'success': 'Pago exitoso y orden creada'}, status=status.HTTP_200_OK)
