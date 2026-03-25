import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";



const products = [
  {
    id: 1,
    name: "Black Basic Tee",
    price: "$32",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg",
    imageAlt: "Model wearing women's black cotton crewneck tee.",
  },
  // More products...
];

function Product_sold({ data }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-sofi-800">
            PRODUCTOS MÁS VENDIDOS
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 sm:gap-y-0 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          {data &&
            data !== null &&
            data !== undefined &&
            data.map((product) => (
              <div key={product.id} className="group relative bg-sofi-50 rounded-2xl border border-sofi-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Imagen portrait con badge TOP */}
                <div className="relative w-full aspect-[2/3] overflow-hidden">
                  <span className="absolute top-3 right-3 z-10 bg-sofi-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                    TOP
                  </span>
                  <img
                    src={product.photo}
                    alt={product.name}
                    className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-sofi-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="bg-white text-sofi-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-md pointer-events-none">
                      Ver producto →
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-4 bg-sofi-50 border-t border-sofi-100">
                  <h3 className="text-base font-semibold text-sofi-800">
                    <Link to={`/ProductDetail/${product.id}`}>
                      <span className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-bold text-sofi-500">${product.price}</p>
                </div>
              </div>
            ))}
        </div>

        <div className="mt-6 sm:hidden">
       
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Product_sold);
