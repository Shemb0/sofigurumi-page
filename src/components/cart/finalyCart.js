import { connect } from "react-redux";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { remove_item, update_item } from "../../redux/actions/cart";
import { setAlert } from "../../redux/actions/alert";
import { useEffect, useState } from "react";
import { get_payment_total, process_payment } from "../../redux/actions/payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { countries } from "../../helpers/fixedCountries";
import { Oval } from "react-loader-spinner";
import ShippingForm from "./form/shippingForm";
import { refresh } from "../../redux/actions/auth";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ProductForm from "./form/productForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: "14px",
      color: "#7c3d3d",
      fontFamily: "'Inter', sans-serif",
      "::placeholder": { color: "#d4a0a0" },
    },
    invalid: { color: "#e05c5c" },
  },
};

// Componente interno que usa hooks de Stripe (debe estar dentro de <Elements>)
function CartPageContent({
  isAuthenticated,
  items,
  update_item,
  remove_item,
  process_payment,
  user,
  made_payment,
  loading,
  total_amount,
  total_compare_amount,
  estimated_tax,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [formData, setFormData] = useState({
    full_name: "",
    address_line_1: "",
    address_line_2: "",
    city: "",
    state_province_region: "",
    postal_zip_code: "",
    country_region: "Argentina",
    telephone_number: "",
  });

  const {
    full_name, address_line_1, address_line_2, city,
    state_province_region, postal_zip_code, country_region, telephone_number,
  } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const remove = (product_id) => remove_item(product_id);

  const buy = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: { name: full_name },
    });

    if (error) {
      console.error("Stripe error:", error.message);
      return;
    }

    process_payment(
      paymentMethod.id,
      full_name, address_line_1, address_line_2, city,
      state_province_region, postal_zip_code, country_region, telephone_number
    );
  };

  const renderPaymentInfo = () => {
    if (!isAuthenticated) {
      return (
        <Link
          to="/login"
          className="w-full flex items-center justify-center py-3 rounded-full bg-sofi-700 text-white text-sm font-semibold hover:bg-sofi-800 transition-all duration-200"
        >
          Iniciá sesión para continuar
        </Link>
      );
    }

    return (
      <div className="space-y-3">
        <p className="text-xs font-semibold text-sofi-400 uppercase tracking-wider">
          Datos de tarjeta
        </p>
        <div className="rounded-xl border border-sofi-200 bg-sofi-50 px-4 py-3">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-xs text-sofi-400 flex items-center gap-1">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Pago seguro con Stripe
        </p>
        <div className="pt-1">
          {loading ? (
            <button className="w-full flex items-center justify-center py-3 rounded-full bg-sofi-400 text-white">
              <Oval type="Oval" color="#fff" width={20} height={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={buy}
              className="w-full py-3 rounded-full bg-sofi-400 text-white text-sm font-semibold hover:bg-sofi-500 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300"
            >
              Confirmar pedido
            </button>
          )}
        </div>
      </div>
    );
  };

  if (made_payment) return <Navigate to="/TanksYou" />;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-sofi-800">Carrito de compras</h1>
          {items && items.length > 0 && (
            <p className="text-sm text-sofi-500 mt-1">
              {items.length} {items.length === 1 ? "producto" : "productos"}
            </p>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">
          {/* Lista de productos */}
          <section className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-sofi-100">
                <h2 className="text-sm font-semibold text-sofi-800">Productos</h2>
              </div>

              {items && items.length > 0 ? (
                <ul className="divide-y divide-sofi-50">
                  {items.map((product, idx) => (
                    <li key={idx} className="px-6 py-5 flex gap-5">
                      <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-sofi-50 border border-sofi-100">
                        <img
                          src={product.product.photo}
                          alt={product.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-sm font-semibold text-sofi-800">{product.product.name}</h3>
                          <p className="text-sm font-bold text-sofi-500 flex-shrink-0">${product.product.price}</p>
                        </div>
                        <div className="mt-3">
                          <ProductForm onChange={onChange} remove={remove} product={product} />
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                          {product.product.quantity > product.product.sold ? (
                            <>
                              <CheckIcon className="h-4 w-4 text-green-500" />
                              <span className="text-xs text-green-600">En stock</span>
                            </>
                          ) : (
                            <>
                              <XIcon className="h-4 w-4 text-red-400" />
                              <span className="text-xs text-red-500">Sin stock</span>
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-6 py-16 text-center">
                  <p className="text-sofi-400 text-sm">Tu carrito está vacío.</p>
                  <Link to="/" className="mt-3 inline-block text-sm font-semibold text-sofi-500 hover:text-sofi-700 transition-colors">
                    Ir a la tienda →
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* Formulario + resumen + pago */}
          <ShippingForm
            full_name={full_name}
            address_line_1={address_line_1}
            address_line_2={address_line_2}
            city={city}
            state_province_region={state_province_region}
            postal_zip_code={postal_zip_code}
            telephone_number={telephone_number}
            countries={countries}
            onChange={onChange}
            buy={buy}
            user={user}
            total_amount={total_amount}
            total_compare_amount={total_compare_amount}
            estimated_tax={estimated_tax}
            renderPaymentInfo={renderPaymentInfo}
          />
        </div>
      </div>
    </div>
  );
}

// Componente externo que provee Elements de Stripe
function FinalyCart(props) {
  useEffect(() => {
    props.get_payment_total();
    window.scrollTo(0, 0);
  }, [props.user]);

  return (
    <Elements stripe={stripePromise}>
      <CartPageContent {...props} />
    </Elements>
  );
}

const mapStateToProps = (state) => ({
  items: state.Cart.items,
  amount: state.Cart.amount,
  total_items: state.Cart.total_items,
  made_payment: state.Payment.made_payment,
  loading: state.Payment.loading,
  original_price: state.Payment.original_price,
  total_after_coupon: state.Payment.total_after_coupon,
  total_amount: state.Payment.total_amount,
  total_compare_amount: state.Payment.total_compare_amount,
  estimated_tax: state.Payment.estimated_tax,
  shipping_cost: state.Payment.shipping_cost,
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  remove_item,
  get_payment_total,
  update_item,
  setAlert,
  refresh,
  process_payment,
})(FinalyCart);
