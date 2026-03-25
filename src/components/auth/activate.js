import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { activate } from "../../redux/actions/auth";
import { Oval } from "react-loader-spinner";
import logo from "../../assets/img/logo/sofi.png";

function Activate({ activate, loading }) {
  const { uid, token } = useParams();
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleActivate = async () => {
    if (!uid || !token) {
      setError(true);
      return;
    }
    const success = await activate(uid, token);
    if (success) {
      setActivated(true);
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sofi-50 to-white px-4">
      <Link to="/" className="mb-8">
        <img src={logo} alt="Sofigurumis" className="h-16 w-auto mix-blend-multiply" />
      </Link>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-sofi-100 p-8 text-center">

        {/* Error */}
        {error && (
          <>
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-sofi-800 mb-2">Error al activar la cuenta</h2>
            <p className="text-sofi-600 text-sm mb-6">
              El enlace de activación no es válido o ya expiró. Por favor, registrate nuevamente o contactanos.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-sofi-400 text-white text-sm font-semibold hover:bg-sofi-500 transition-all duration-200 shadow-sm"
            >
              Volver al inicio
            </Link>
          </>
        )}

        {/* Success */}
        {!error && activated && !loading && (
          <>
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-sofi-800 mb-2">¡Cuenta activada!</h2>
            <p className="text-sofi-600 text-sm mb-6">
              Usuario registrado con éxito. Ya podés iniciar sesión y comenzar a explorar Sofigurumis.
            </p>
            <Link
              to="/Login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-sofi-400 text-white text-sm font-semibold hover:bg-sofi-500 transition-all duration-200 shadow-sm"
            >
              Iniciar sesión
            </Link>
          </>
        )}

        {/* Default: activate button */}
        {!error && !activated && (
          <>
            <h2 className="text-2xl font-bold text-sofi-800 mb-2">Activá tu cuenta</h2>
            <p className="text-sofi-600 text-sm mb-6">
              Hacé clic en el botón para confirmar tu registro y activar tu cuenta en Sofigurumis.
            </p>
            <button
              onClick={handleActivate}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sofi-400 text-white text-sm font-semibold hover:bg-sofi-500 disabled:opacity-60 transition-all duration-200 shadow-sm"
            >
              {loading ? (
                <>
                  <Oval color="#fff" width={18} height={18} />
                  Activando...
                </>
              ) : (
                "Activar cuenta"
              )}
            </button>
          </>
        )}

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { activate })(Activate);
