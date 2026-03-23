import { connect } from "react-redux";
import { ShoppingCartIcon } from "@heroicons/react/outline";
import { Fragment, useState,useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  ChartBarIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";
import { Oval } from "react-loader-spinner";
import {
  get_items,
  get_total,
  get_item_total,
  remove_item,
  update_item,
} from "../../redux/actions/cart";
import { useNavigate } from "react-router-dom";


const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CartItem({
  itemarray,
  count,
  update_item,
  remove_item,
  render,
  setRender,
  total_items,
  product,
  amount,
  get_items,
  get_total,
  get_item_total,
}) {
  useEffect(() => {
    get_items();
    get_total();
    get_item_total();
  }, []);


  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRemoveItem = (productId) => {
    // Llama a la función remove_item pasando el ID del producto
    remove_item(productId);
  };

 

  const addToCart2 = async () => {
    navigate("/cart");
    // if (
    //   itemarray &&
    //   itemarray !== null &&
    //   itemarray !== undefined &&
    //   itemarray.quantity > 0
    // ) {
    //   setLoading(true);
    //   await add_item(itemarray);
    //   await get_items();
    //   await get_total();
    //   await get_item_total();
    //   setLoading(false);

    // }
  };

  return (
    <Popover className=" ">
      {({ open }) => (
        <>
          <Popover.Button
            className={classNames(
              "group inline-flex items-center justify-center rounded-full p-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300",
              open
                ? "bg-sofi-400 text-white shadow-sm"
                : "bg-sofi-50 text-sofi-500 hover:bg-sofi-400 hover:text-white hover:shadow-sm"
            )}
          >
            <ShoppingCartIcon
              className="h-5 w-5"
              aria-hidden="true"
            />
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
          >
            <Popover.Panel className="hidden md:block absolute z-10 top-full left-0 mt-2 w-96 rounded-2xl shadow-xl bg-white border border-sofi-100 overflow-hidden">
              {/* Header */}
              <div className="px-5 py-4 border-b border-sofi-100 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-sofi-800">Mi carrito</h3>
                <span className="text-xs bg-sofi-100 text-sofi-600 font-semibold px-2.5 py-0.5 rounded-full">
                  {total_items} {total_items === 1 ? "producto" : "productos"}
                </span>
              </div>

              {/* Lista de items */}
              <div className="px-5 max-h-72 overflow-y-auto divide-y divide-sofi-50">
                {itemarray && itemarray.length > 0 ? (
                  itemarray.map((items, index) => (
                    <div key={index} className="flex items-center gap-3 py-3">
                      <div className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-sofi-50 border border-sofi-100">
                        <img
                          src={items.product.photo}
                          alt={items.product.name}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-sofi-800 truncate">
                          {items.product.name}
                        </p>
                        <p className="text-xs text-sofi-400 mt-0.5">
                          {items.count} {items.count === 1 ? "unidad" : "unidades"}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <p className="text-sm font-bold text-sofi-500">
                          ${items.product.price}
                        </p>
                        <button
                          onClick={() => handleRemoveItem(items)}
                          className="text-sofi-300 hover:text-sofi-500 transition-colors duration-150"
                        >
                          <XIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center">
                    <ShoppingCartIcon className="h-10 w-10 text-sofi-200 mx-auto mb-2" />
                    <p className="text-sm text-sofi-400">Tu carrito está vacío</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-4 border-t border-sofi-100 bg-sofi-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-sofi-600">Total</span>
                  <span className="text-base font-bold text-sofi-800">${amount}</span>
                </div>
                {loading ? (
                  <button className="w-full flex items-center justify-center py-2.5 rounded-full bg-sofi-400 text-white">
                    <Oval type="Oval" color="#fff" width={20} height={20} />
                  </button>
                ) : (
                  <button
                    onClick={addToCart2}
                    className="w-full py-2.5 rounded-full bg-sofi-400 text-white text-sm font-semibold hover:bg-sofi-500 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300"
                  >
                    Finalizar Compra
                  </button>
                )}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
const mapStateToProps = (state) => ({
  total_items: state.Cart.total_items,
  product: state.Products.products,
  amount: state.Cart.amount,
  itemarray: state.Cart.items,
});
export default connect(mapStateToProps, {
  remove_item,
  update_item,
  get_items,
  get_total,
  get_item_total,
})(CartItem);
