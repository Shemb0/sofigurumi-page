from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from apps.cart.models import Cart, CartItem
from apps.orders.models import Order, OrderItem
from apps.products.models import Product
from django.core.mail import send_mail
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

        # Enviar email de confirmación
        try:
            send_mail(
                'Tu pedido en Sofigurumis',
                f'Hola {full_name},\n\n¡Recibimos tu pedido!\n\nGracias por tu compra en Sofigurumis.\nPodés ver el estado de tu pedido en tu panel de usuario.\n\nCon cariño,\nSofigurumis',
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=True
            )
        except Exception:
            pass

        # Limpiar carrito
        try:
            CartItem.objects.filter(cart=cart).delete()
            Cart.objects.filter(user=user).update(total_items=0)
        except Exception:
            pass

        return Response({'success': 'Pago exitoso y orden creada'}, status=status.HTTP_200_OK)
