import { Link } from "react-router-dom"
const ProductCard =({product})=>{
    return(
        <div key={product.id} className="group relative bg-white rounded-2xl border border-sofi-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
          {/* Imagen */}
          <div className="relative w-full aspect-square bg-sofi-50 overflow-hidden">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-full object-center object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay hover */}
            <div className="absolute inset-0 bg-sofi-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
              <span className="bg-white text-sofi-600 text-xs font-semibold px-4 py-1.5 rounded-full shadow-md pointer-events-none">
                Ver producto →
              </span>
            </div>
          </div>
          {/* Info */}
          <div className="p-4 flex justify-between items-center">
            <h3 className="text-sm font-semibold text-sofi-800 truncate">
              <Link to={`/ProductDetail/${product.id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <p className="text-sm font-bold text-sofi-500 ml-2 flex-shrink-0">${product.price}</p>
          </div>
        </div>
    )
}

export default ProductCard