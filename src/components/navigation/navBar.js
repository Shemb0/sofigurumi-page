import { Fragment, useState, useEffect } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../alert/alert";
// import DarkModeSwitch from "components/darkmode";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { get_search_products } from "../../redux/actions/products";
import SearchBox from "./searchBox";
import logo from "../../assets/img/logo/sofi.png";
import {
  BookmarkAltIcon,
  BriefcaseIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CursorClickIcon,
  DesktopComputerIcon,
  GlobeAltIcon,
  InformationCircleIcon,
  MenuIcon,
  NewspaperIcon,
  OfficeBuildingIcon,
  PhoneIcon,
  PlayIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ViewGridIcon,
  XIcon,
  BellIcon,
  LoginIcon,
  UserAddIcon,
} from "@heroicons/react/outline";
import { logout } from "../../redux/actions/auth";
import CartItem from "components/cart/cartItem";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Teams", href: "#", current: false },
  { name: "Directory", href: "#", current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const solutions = [
  {
    name: "Analytics",
    description:
      "Get a better understanding of where your traffic is coming from.",
    href: "#",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers in a more meaningful way.",
    href: "#",
    icon: CursorClickIcon,
  },
  {
    name: "Security",
    description: "Your customers' data will be safe and secure.",
    href: "#",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools that you're already using.",
    href: "#",
    icon: ViewGridIcon,
  },
];
const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "View All Products", href: "#", icon: CheckCircleIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];
const company = [
  { name: "About", href: "#", icon: InformationCircleIcon },
  { name: "Customers", href: "#", icon: OfficeBuildingIcon },
  { name: "Press", href: "#", icon: NewspaperIcon },
  { name: "Careers", href: "#", icon: BriefcaseIcon },
  { name: "Privacy", href: "#", icon: ShieldCheckIcon },
];
const resources = [
  { name: "Community", href: "#", icon: UserGroupIcon },
  { name: "Partners", href: "#", icon: GlobeAltIcon },
  { name: "Guides", href: "#", icon: BookmarkAltIcon },
  { name: "Webinars", href: "#", icon: DesktopComputerIcon },
];
const blogPosts = [
  {
    id: 1,
    name: "Boost your conversion rate",
    href: "#",
    preview:
      "Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.",
    imageUrl:
      "https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80",
  },
  {
    id: 2,
    name: "How to use search engine optimization to drive traffic to your site",
    href: "#",
    preview:
      "Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.",
    imageUrl:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2300&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function NavBar({
  isAuthenticated,
  user,
  logout,
  categories,
  get_search_products,
  total_items,
}) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {}, []);

  // // const [showProductos, setShowProductos] = useState(false);

  // // const toggleShowProductos = () => {
  // //   setShowProductos(!showProductos); // Cambia el estado a su opuesto (abierto/cerrado)
  // // };

  const [render, setRender] = useState(false);

  const [formData, setFormData] = useState({
    category_id: "0",
    search: "",
  });

  const { category_id, search } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    get_search_products(category_id, search);
    setRender(!render);
  };

  if (render) {
    return <Navigate to="/search" />;
  }

  const logOutHandler = (e) => {
    e.preventDefault();
    logout();
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  const authLinks = (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center gap-1.5 rounded-full border border-sofi-400 px-4 py-2 bg-white text-sm font-semibold text-sofi-600 hover:bg-sofi-400 hover:text-white hover:border-sofi-400 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300 transition-all duration-200">
          <span>{user && user.first_name ? user.first_name : "Mi cuenta"}</span>
          <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-sofi-200 focus:outline-none overflow-hidden">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link to={"/Dashboard"}
                  className={classNames(
                    active ? "bg-sofi-50 text-sofi-700" : "text-sofi-600",
                    "block px-4 py-2 text-sm font-medium transition-colors duration-150"
                  )}
                >
                  Dashboard
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-sofi-50 text-sofi-700" : "text-sofi-600",
                    "block px-4 py-2 text-sm font-medium transition-colors duration-150"
                  )}
                >
                  Soporte
                </a>
              )}
            </Menu.Item>
            <div className="border-t border-sofi-100 my-1" />
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    type="button"
                    onClick={logOutHandler}
                    className={classNames(
                      active ? "bg-sofi-50 text-sofi-700" : "text-sofi-600",
                      "block w-full text-left px-4 py-2 text-sm font-medium transition-colors duration-150"
                    )}
                  >
                    Cerrar sesión
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );

  const guestLinks = (
    <Fragment>
      <Link
        to={"/Login"}
        className="inline-flex items-center gap-1.5 px-4 py-2 border border-sofi-400 rounded-full text-sm font-semibold text-sofi-600 hover:bg-sofi-400 hover:text-white hover:border-sofi-400 hover:shadow-sm transition-all duration-200"
      >
        <LoginIcon className="h-4 w-4" aria-hidden="true" />
        Ingresar
      </Link>
      <Link
        to="/registro"
        className="inline-flex items-center gap-1.5 px-4 py-2 border border-transparent rounded-full text-sm font-semibold text-white bg-sofi-400 hover:bg-sofi-500 hover:shadow-md transition-all duration-200"
      >
        <UserAddIcon className="h-4 w-4" aria-hidden="true" />
        Registrarse
      </Link>
    </Fragment>
  );
  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            " bg-white shadow-md border-b border-sofi-200 lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex items-center h-16 gap-6">

                {/* Izquierda: Logo + separador + links de navegación */}
                <div className="flex items-center gap-5 flex-shrink-0">
                  <Link to={"/"}>
                    <img
                      className="block h-12 w-auto mix-blend-multiply"
                      src={logo}
                      alt="Sofigurumi"
                    />
                  </Link>
                  <span className="hidden lg:block h-6 w-px bg-sofi-200" aria-hidden="true" />
                  <div className="hidden lg:flex items-center gap-2">
                    <Link
                      to={"/categories"}
                      className="inline-flex items-center px-4 py-2 border border-sofi-400 rounded-full text-sm font-semibold text-sofi-600 hover:bg-sofi-400 hover:text-white hover:shadow-sm transition-all duration-200"
                    >
                      Categorías
                    </Link>
                    <Link
                      to={"/about"}
                      className="inline-flex items-center px-4 py-2 border border-sofi-400 rounded-full text-sm font-semibold text-sofi-600 hover:bg-sofi-400 hover:text-white hover:shadow-sm transition-all duration-200"
                    >
                      Sobre Nosotros
                    </Link>
                    <Link
                      to={"/contact"}
                      className="inline-flex items-center px-4 py-2 border border-sofi-400 rounded-full text-sm font-semibold text-sofi-600 hover:bg-sofi-400 hover:text-white hover:shadow-sm transition-all duration-200"
                    >
                      Contacto
                    </Link>
                  </div>
                </div>

                {/* Centro: Buscador */}
                <div className="flex-1 hidden lg:block">
                  <label htmlFor="search" className="sr-only">Search</label>
                  <div className="relative">
                    {window.location.pathname !== "/search/" && (
                      <SearchBox
                        categories={categories}
                        onSubmit={onSubmit}
                        onChange={onChange}
                        search={search}
                      />
                    )}
                  </div>
                </div>

                {/* Derecha: Carrito + autenticación */}
                <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
                  <div className="relative">
                    <CartItem />
                    {total_items > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-sofi-500 text-white text-xs font-bold rounded-full pointer-events-none">
                        {total_items}
                      </span>
                    )}
                  </div>
                  <span className="h-6 w-px bg-sofi-200" aria-hidden="true" />
                  {isAuthenticated ? authLinks : guestLinks}
                </div>

                {/* Botón menú mobile */}
                <div className="flex items-center ml-auto lg:hidden">
                  <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-sofi-500 hover:bg-sofi-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-sofi-300">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>

              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              {/* Buscador mobile */}
              <div className="px-4 pt-3 pb-2 border-b border-sofi-100">
                {window.location.pathname !== "/search/" && (
                  <SearchBox
                    categories={categories}
                    onSubmit={onSubmit}
                    onChange={onChange}
                    search={search}
                  />
                )}
              </div>

              {/* Links de navegación */}
              <div className="px-4 pt-3 pb-2 space-y-1">
                <Link
                  to="/categories"
                  className="block rounded-lg py-2.5 px-3 text-base font-semibold text-sofi-700 hover:bg-sofi-50 transition-colors"
                >
                  Categorías
                </Link>
                <Link
                  to="/about"
                  className="block rounded-lg py-2.5 px-3 text-base font-semibold text-sofi-700 hover:bg-sofi-50 transition-colors"
                >
                  Sobre Nosotros
                </Link>
                <Link
                  to="/contact"
                  className="block rounded-lg py-2.5 px-3 text-base font-semibold text-sofi-700 hover:bg-sofi-50 transition-colors"
                >
                  Contacto
                </Link>
              </div>

              {/* Carrito + auth */}
              <div className="border-t border-sofi-100 px-4 py-4 flex items-center justify-between gap-3">
                <div className="relative">
                  <CartItem />
                  {total_items > 0 && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center bg-sofi-500 text-white text-xs font-bold rounded-full pointer-events-none">
                      {total_items}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isAuthenticated ? authLinks : guestLinks}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <Alert />;
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.Categories.categories,
  total_items: state.Cart.total_items,
});

export default connect(mapStateToProps, {
  get_search_products,
  logout,
})(NavBar);
