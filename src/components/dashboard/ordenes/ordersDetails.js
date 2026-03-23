import { connect } from "react-redux";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Distant Mountains Artwork Tee",
    price: "$36.00",
    description: "You awake in a new, mysterious land. Mist hangs low along the distant mountains. What does it mean?",
    address: ["Floyd Miles", "7363 Cynthia Pass", "Toronto, ON N3Y 4H8"],
    email: "f•••@example.com",
    phone: "1•••••••••40",
    href: "#",
    status: "En proceso",
    date: "24 de marzo, 2021",
    datetime: "2021-03-24",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg",
    imageAlt: "Off-white t-shirt",
  },
];

function OrdersDetails() {
  return (
    <div className="min-h-screen bg-sofi-50 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-sofi-800">Detalle del Pedido</h1>
          <p className="text-sm text-sofi-500 mt-1">Información completa de tu compra</p>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl border border-sofi-100 shadow-sm overflow-hidden">

              {/* Header */}
              <div className="px-6 py-4 border-b border-sofi-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-sofi-600">
                    Pedido <span className="font-semibold text-sofi-800">W086438695</span>
                  </span>
                  <span className="text-sofi-300">·</span>
                  <time className="text-sm text-sofi-500" dateTime={product.datetime}>{product.date}</time>
                </div>
                <span className="text-xs bg-sofi-100 text-sofi-600 font-semibold px-3 py-1 rounded-full">
                  {product.status}
                </span>
              </div>

              {/* Product */}
              <div className="px-6 py-5 flex gap-5 border-b border-sofi-50">
                <div className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-sofi-50 border border-sofi-100">
                  <img src={product.imageSrc} alt={product.imageAlt} className="w-full h-full object-cover object-center" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-sofi-800">{product.name}</h3>
                  <p className="text-xs text-sofi-500 mt-1">{product.description}</p>
                  <p className="text-sm font-bold text-sofi-500 mt-2">{product.price}</p>
                </div>
              </div>

              {/* Delivery info */}
              <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-5 border-b border-sofi-50">
                <div>
                  <p className="text-xs font-semibold text-sofi-400 uppercase tracking-wider mb-2">Dirección de envío</p>
                  <div className="text-sm text-sofi-700 space-y-0.5">
                    {product.address.map((line, i) => <span key={i} className="block">{line}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-sofi-400 uppercase tracking-wider mb-2">Actualizaciones</p>
                  <div className="text-sm text-sofi-700 space-y-0.5">
                    <span className="block">{product.email}</span>
                    <span className="block">{product.phone}</span>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="px-6 py-4 bg-sofi-50">
                <div className="max-w-xs ml-auto space-y-2">
                  <div className="flex justify-between text-sm text-sofi-600">
                    <span>Subtotal</span><span>$72.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-sofi-600">
                    <span>Envío</span><span>$5.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-sofi-600">
                    <span>Impuestos</span><span>$6.16</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-sofi-800 pt-2 border-t border-sofi-200">
                    <span>Total</span>
                    <span className="text-sofi-500">$83.16</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {})(OrdersDetails);
