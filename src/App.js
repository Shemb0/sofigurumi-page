import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Error from "containers/error/error";
import Home from "containers/home/home";
import Activate from "components/auth/activate";
import RecoverPass from "components/auth/recoverPass";
import PasswordConfirm from "components/auth/PasswordConfirm";
import Categorias from "containers/pages/categorias";
import Busqueda from "containers/pages/busqueda";
import ProductDetail from "containers/pages/productDetail";
import Cart from "containers/pages/cart";
import TanksYou from "containers/pages/tanksYou";
import Dashboard from "containers/pages/dashboard/dashboard";
import OrdersDetails from "./containers/pages/dashboard/OrdersDetails/ordersDetails";
import Profile from "containers/pages/dashboard/profile/profile";
import Login from "containers/auth/login";
import SingUp from "containers/auth/register"




function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="*" element={<Error />}></Route>
          <Route path="/" element={<Home />}></Route>

          {/* Authentication */}
          <Route path="/registro" element={<SingUp />}></Route>
          <Route path="/activate/:uid/:token" element={<Activate />}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/Recuperacion" element={<RecoverPass />}></Route>
          <Route path="/password/reset/confirm/:uid/:token" element={<PasswordConfirm />}></Route>

         
            {/* categorias */}
            <Route path="/categories" element={<Categorias />}></Route>

            {/* Busqueda de productos */}
            <Route path="/search/" element={<Busqueda/>}></Route>

            {/* Detalles de productos */}
            <Route path="/ProductDetail/:productId" element={<ProductDetail />}></Route>

           {/* confirmacion de compra */}
           <Route path="/cart" element={<Cart/>}></Route>

           {/* Dashboard */}
           <Route path="/Dashboard" element={<Dashboard/>}></Route>

           {/* Gracias */}
           <Route path="/TanksYou" element={<TanksYou/>}></Route>

           {/* detalle de las ordenes */}
           <Route path="/DetallesOrden" element={<OrdersDetails/>}></Route>

           {/* perfil */}
           <Route path="/Dashboard/Perfil" element={<Profile/>}></Route>


          
        </Routes>
      </Router>
    </Provider>
  )
}

export default App;
