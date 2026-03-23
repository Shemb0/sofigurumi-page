import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { reset_password } from "../../redux/actions/auth";
import { Oval } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import logo from "../../assets/img/logo/sofi.png";
// lo traemos para poder registrar el usuario
function Recoverpass({ reset_password, loading }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email} = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // con esta funcion lo que hacemos es que con cada una de las cosas que escribamos en los inputs react las captas y lo que escribamos en el campo name los pasa al campo value

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    reset_password(email, 
    setRequestSent(true));
  };
  // esto lo que hace es tomar ese valor que colocamos en value y enviarlo

  if (requestSent && !loading) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-sofi-50">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-20 w-auto mix-blend-multiply"
            src={logo}
            alt="Sofigurumi"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-sofi-800">
            Recuperar contraseña
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={(e) => onSubmit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => onChange(e)}
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sofi-300 focus:border-sofi-300 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                {loading ? (
                  <button className="inline-flex mt-12 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sofi-400 hover:bg-sofi-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300">
                    <Oval type="Oval" color="#fff" width={20} height={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sofi-400 hover:bg-sofi-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300"
                  >
                    Enviar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  // funciones que queremos traer
  reset_password,
})(Recoverpass);
