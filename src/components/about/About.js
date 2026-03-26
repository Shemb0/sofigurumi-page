import { connect } from "react-redux"
import { Link } from "react-router-dom"
import logo from "../../assets/img/logo/sofi.png"
import amigurumi from "../../assets/img/AMIGURUMI2.jpg"

function About() {
  return (
    <div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">

        {/* Hero */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <h2 className="text-base font-semibold text-sofi-500 tracking-widest uppercase">
              Nuestra historia
            </h2>
            <p className="mt-3 text-4xl font-extrabold text-sofi-800 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Sofigurumis
            </p>
            <p className="max-w-xl mt-5 text-xl text-sofi-600">
              Somos un emprendimiento dedicado a la creación artesanal de amigurumis,
              muñecos tejidos a ganchillo con hilo suave y relleno de alta calidad.
              Cada pieza es única, realizada a mano con dedicación y amor.
            </p>
            <p className="max-w-xl mt-4 text-xl text-sofi-600">
              Nos inspiramos en la técnica japonesa del amigurumi para dar vida a
              animales, personajes y figuras fantásticas que alegran el día de quienes
              los reciben.
            </p>
            <div className="mt-8">
              <Link
                to="/categories"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-full text-sm font-semibold text-white bg-sofi-400 hover:bg-sofi-500 hover:shadow-md transition-all duration-200"
              >
                Ver la tienda →
              </Link>
            </div>
          </div>

          
          <div className="mt-12 lg:mt-0">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square bg-sofi-100 flex items-center justify-center">
              <img
                src={amigurumi}
                alt="Amigurumis artesanales"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            </div>
          </div>
        </div>

        <hr className="border-sofi-200/60 my-16" />

        {/* Por qué elegirnos */}
        <h2 className="text-2xl font-extrabold tracking-tight text-sofi-800 text-center mb-10">
          ¿Por qué elegirnos?
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">

          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 text-center">
            <div className="text-3xl mb-4">🧶</div>
            <h3 className="text-base font-bold text-sofi-800 mb-2">100% Artesanal</h3>
            <p className="text-sm text-sofi-600 leading-relaxed">
              Cada amigurumi es tejido a mano, uno por uno. No hay dos piezas iguales.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 text-center">
            <div className="text-3xl mb-4">💛</div>
            <h3 className="text-base font-bold text-sofi-800 mb-2">Hecho con amor</h3>
            <p className="text-sm text-sofi-600 leading-relaxed">
              Ponemos el corazón en cada punto para que tu amigurumi transmita ternura.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 text-center">
            <div className="text-3xl mb-4">✨</div>
            <h3 className="text-base font-bold text-sofi-800 mb-2">Materiales de calidad</h3>
            <p className="text-sm text-sofi-600 leading-relaxed">
              Hilos suaves y rellenos seguros para todas las edades.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 text-center">
            <div className="text-3xl mb-4">🎁</div>
            <h3 className="text-base font-bold text-sofi-800 mb-2">Regalo perfecto</h3>
            <p className="text-sm text-sofi-600 leading-relaxed">
              Ideales para cumpleaños, baby shower o cualquier ocasión especial.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 text-center">
            <div className="text-3xl mb-4">🐾</div>
            <h3 className="text-base font-bold text-sofi-800 mb-2">Variedad de diseños</h3>
            <p className="text-sm text-sofi-600 leading-relaxed">
              Animales, personajes y más. Siempre sumamos diseños nuevos.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 text-center">
            <div className="text-3xl mb-4">📦</div>
            <h3 className="text-base font-bold text-sofi-800 mb-2">Envíos a todo el país</h3>
            <p className="text-sm text-sofi-600 leading-relaxed">
              Llevamos nuestros amigurumis a cualquier punto de Argentina.
            </p>
          </div>

        </div>

        <hr className="border-sofi-200/60 my-16" />

        {/* CTA final */}
        <div className="text-center">
          <img
            src={logo}
            alt="Sofigurumi"
            className="h-16 w-auto mx-auto mb-6 mix-blend-multiply"
          />
          <p className="mt-3 text-4xl font-extrabold text-sofi-800 sm:text-5xl">
            ¿Querés llevarte uno?
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-sofi-600">
            Explorá nuestra tienda y encontrá el amigurumi que te robe el corazón.
          </p>
          <div className="mt-8">
            <Link
              to="/categories"
              className="inline-flex items-center px-8 py-3 border border-transparent rounded-full text-sm font-semibold text-white bg-sofi-400 hover:bg-sofi-500 hover:shadow-lg transition-all duration-200"
            >
              Ver todos los productos →
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(About)
