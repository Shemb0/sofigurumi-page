import { connect } from "react-redux";
import Layout from "../../hocs/layout";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { reset } from "../../redux/actions/payment";





function TanksYou({
    isAuthenticated,
    reset
}) {
    useEffect(() => {
        window.scrollTo(0, 0);
        reset()
      }, []);
    
    if (!isAuthenticated) {
        return <Navigate to={"/"}/>
    }


  return (
    <Layout>
      <div className="bg-sofi-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          <h1 className="text-4xl font-extrabold text-sofi-800 mb-4">¡Gracias por tu compra!</h1>
          <p className="text-sofi-600 text-lg mb-8">Tu pedido fue recibido. Te enviaremos un correo con los detalles.</p>
          <a href="/" className="inline-flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sofi-400 hover:bg-sofi-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300">
            Volver al inicio
          </a>
        </div>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  reset
})(TanksYou);
