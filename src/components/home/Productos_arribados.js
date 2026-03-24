import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { add_wishlist_item, get_wishlist_items, get_wishlist_item_total, remove_wishlist_item } from '../../redux/actions/wishlist'
import WishlistHeart from '../products/wishlistHeart'

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

function Arrivals_products({ data, isAuthenticated, wishlist, add_wishlist_item, get_wishlist_items, get_wishlist_item_total, remove_wishlist_item }) {

  const addToWishlist = async (product, isPresent) => {
    if (isAuthenticated) {
      if (isPresent) {
        await remove_wishlist_item(product.id);
      } else {
        await add_wishlist_item(product.id);
      }
      await get_wishlist_items();
      await get_wishlist_item_total();
    }
  }

  return (
    
    <div>
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-sofi-800">
          NUEVOS PROYECTOS
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {
              data &&
              data !== null &&
              data !== undefined &&
              data.map((product) => (
                product.quantity - product.sold > 0? (
              <div key={product.id} className="group relative bg-white rounded-2xl border border-sofi-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                {/* Imagen con badge NUEVO */}
                <div className="relative w-full aspect-square bg-sofi-50 overflow-hidden">
                  <span className="absolute top-3 left-3 z-10 bg-sofi-400 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
                    NUEVO
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
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-sm font-semibold text-sofi-800 truncate">
                    <Link to={`ProductDetail/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <div className="flex items-center flex-shrink-0">
                    <p className="text-sm font-bold text-sofi-500">
                      ${product.price}
                    </p>
                    <WishlistHeart
                      product={product}
                      wishlist={wishlist}
                      addToWishlist={(isPresent) => addToWishlist(product, isPresent)}
                    />
                  </div>
                </div>
              </div>)
              : (<></>)
            ))
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  wishlist: state.Wishlist.items
});

export default connect(mapStateToProps, {
  add_wishlist_item,
  get_wishlist_items,
  get_wishlist_item_total,
  remove_wishlist_item
})(Arrivals_products);
