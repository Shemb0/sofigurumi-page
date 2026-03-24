import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { get_product, get_related_products } from "../../redux/actions/products";
import ImageGalery from "../products/ImageGalery";
import { get_items, add_item, get_total, get_item_total } from "../../redux/actions/cart";
import {
  add_wishlist_item,
  get_wishlist_items,
  get_wishlist_item_total,
  remove_wishlist_item,
} from "../../redux/actions/wishlist";
import {
  get_reviews,
  get_review,
  create_review,
  update_review,
  delete_review,
  filter_reviews,
} from "../../redux/actions/reviews";
import { Oval } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import WishlistHeart from "./wishlistHeart";
import Stars from "./stars";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Product_Detail({
  get_product,
  get_related_products,
  product,
  add_item,
  isAuthenticated,
  add_wishlist_item,
  get_wishlist_items,
  get_wishlist_item_total,
  remove_wishlist_item,
  get_reviews,
  get_review,
  create_review,
  update_review,
  delete_review,
  filter_reviews,
  wishlist,
  review,
  reviews,
}) {
  const params = useParams();
  const id = params.productId;

  useEffect(() => {
    window.scrollTo(0, 0);
    get_product(id);
    get_related_products(id);
    get_wishlist_items();
    get_wishlist_item_total();
  }, []);

  useEffect(() => { get_reviews(id); }, [id]);
  useEffect(() => { get_review(id); }, [id]);

  const [formData, setFormData] = useState({ comment: '', rating: '5' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { comment, rating } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const addToCart = async () => {
    if (product && product !== null && product !== undefined && product.quantity > 0) {
      setLoading(true);
      await add_item(product);
      setLoading(false);
      navigate("/categories");
    }
  };

  if (!isAuthenticated) return <Navigate to="/Login" />;

  const addToWishlist = async (isPresent) => {
    if (isAuthenticated) {
      if (isPresent) {
        await remove_wishlist_item(product.id);
      } else {
        await add_wishlist_item(product.id);
      }
      await get_wishlist_items();
      await get_wishlist_item_total();
    }
  };

  const leaveReview = e => {
    e.preventDefault();
    if (rating !== null) create_review(id, rating, comment);
  };

  const updateReview = e => {
    e.preventDefault();
    if (rating !== null) update_review(id, rating, comment);
  };

  const deleteReview = () => {
    const fetchData = async () => {
      await delete_review(id);
      await get_review(id);
      setFormData({ comment: '', rating: '5' });
    };
    fetchData();
  };

  const inStock = product && product.quantity > product.sold;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Sección principal: imagen + info */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-start">

          {/* Imagen */}
          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm overflow-hidden">
            <ImageGalery photo={product && product.photo} />
          </div>

          {/* Info del producto */}
          <div className="mt-8 lg:mt-0">

            {/* Nombre */}
            <h1 className="text-2xl font-bold text-sofi-800 leading-tight">
              {product?.name}
            </h1>

            {/* Precio */}
            <p className="mt-3 text-3xl font-bold text-sofi-500">
              ${product?.price}
            </p>

            {/* Stock badge */}
            <div className="mt-4">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 text-xs bg-green-50 text-green-700 font-semibold px-3 py-1 rounded-full border border-green-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                  En stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs bg-red-50 text-red-600 font-semibold px-3 py-1 rounded-full border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
                  Sin stock
                </span>
              )}
            </div>

            {/* Separador */}
            <div className="mt-6 border-t border-sofi-100 pt-6">
              <p className="text-sm text-sofi-600 leading-relaxed">
                {product?.description}
              </p>
            </div>

            {/* Botones de acción */}
            <div className="mt-8 flex items-center gap-3">
              {loading ? (
                <button className="flex-1 py-3 rounded-full bg-sofi-400 text-white flex items-center justify-center">
                  <Oval type="Oval" color="#fff" width={20} height={20} />
                </button>
              ) : (
                <button
                  onClick={addToCart}
                  disabled={!inStock}
                  className={classNames(
                    "flex-1 py-3 rounded-full text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300",
                    inStock
                      ? "bg-sofi-400 text-white hover:bg-sofi-500 hover:shadow-md"
                      : "bg-sofi-100 text-sofi-400 cursor-not-allowed"
                  )}
                >
                  Agregar al carrito
                </button>
              )}
              <WishlistHeart
                product={product}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
              />
            </div>

          </div>
        </div>

        {/* Sección de reseñas */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Formulario de reseña */}
          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-sofi-800 mb-4">
              {review ? 'Editar tu reseña' : 'Dejar una reseña'}
            </h3>
            <form onSubmit={review ? updateReview : leaveReview} className="space-y-4">
              <textarea
                rows={4}
                name="comment"
                value={comment}
                onChange={onChange}
                required
                placeholder={review ? review.comment : 'Compartí tu experiencia con este producto...'}
                className="w-full rounded-xl border border-sofi-200 px-4 py-3 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none resize-none transition"
              />
              <div className="flex items-center justify-between">
                <select
                  name="rating"
                  value={rating}
                  onChange={onChange}
                  required
                  className="rounded-xl border border-sofi-200 px-3 py-2 text-sm text-sofi-700 bg-white focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                >
                  <option value="1">★ 1</option>
                  <option value="2">★★ 2</option>
                  <option value="3">★★★ 3</option>
                  <option value="4">★★★★ 4</option>
                  <option value="5">★★★★★ 5</option>
                </select>
                <div className="flex items-center gap-2">
                  {review && (
                    <button
                      type="button"
                      onClick={deleteReview}
                      className="px-4 py-2 rounded-full border border-sofi-200 text-xs font-semibold text-sofi-500 hover:bg-sofi-50 transition-all duration-200"
                    >
                      Eliminar
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-sofi-400 text-white text-xs font-semibold hover:bg-sofi-500 hover:shadow-md transition-all duration-200"
                  >
                    {review ? 'Actualizar' : 'Publicar'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Lista de reseñas */}
          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6">
            <h3 className="text-sm font-semibold text-sofi-800 mb-4">
              Reseñas {reviews && reviews.length > 0 && (
                <span className="ml-1 text-xs bg-sofi-100 text-sofi-600 font-semibold px-2 py-0.5 rounded-full">
                  {reviews.length}
                </span>
              )}
            </h3>

            {reviews && reviews.length > 0 ? (
              <div className="space-y-1 max-h-80 overflow-y-auto">
                {reviews.map((rev, index) => (
                  <div key={index} className="flex gap-3 py-3 border-b border-sofi-50 last:border-0">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-sofi-100 flex items-center justify-center">
                      <svg className="h-5 w-5 text-sofi-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-sofi-800 truncate">{rev.user}</h4>
                        <Stars rating={rev.rating} />
                      </div>
                      <p className="text-sm text-sofi-600 mt-1">{rev.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-sofi-400">Todavía no hay reseñas para este producto.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  product: state.Products.product,
  wishlist: state.Wishlist.items,
  review: state.Reviews.review,
  reviews: state.Reviews.reviews,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  get_product,
  get_related_products,
  get_items,
  add_item,
  get_total,
  get_item_total,
  add_wishlist_item,
  get_wishlist_items,
  get_wishlist_item_total,
  remove_wishlist_item,
  get_reviews,
  get_review,
  create_review,
  update_review,
  delete_review,
  filter_reviews,
})(Product_Detail);
