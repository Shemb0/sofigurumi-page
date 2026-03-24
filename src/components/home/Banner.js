import { connect } from "react-redux"


  

  function Banner() {
    return (
      <div>
        <div className="max-w-7xl mx-auto py-20 px-4 sm:py-32 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-sofi-500 tracking-widest uppercase">
              Hecho con amor
            </h2>
            <p className="mt-3 text-4xl font-extrabold text-sofi-800 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Gurumis únicos para vos
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-sofi-600">
              Cada pieza es tejida a mano con cariño. Descubrí nuestra colección de amigurumis artesanales.
            </p>
          </div>
        </div>
      </div>
    )
  }
  
  
  const mapStateToProps = state => ({
  
  })
  
  export default connect (mapStateToProps,{}) (Banner)
