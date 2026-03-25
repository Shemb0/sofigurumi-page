import { connect } from "react-redux"
import { useState } from "react"

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [sent, setSent] = useState(false)

  const { name, email, message } = formData

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    // Aquí podés conectar con tu backend o servicio de email
    setSent(true)
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-base font-semibold text-sofi-500 tracking-widest uppercase">
            Contacto
          </h2>
          <p className="mt-3 text-4xl font-extrabold text-sofi-800 sm:text-5xl sm:tracking-tight lg:text-6xl">
            ¿Hablamos?
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-sofi-600">
            Respondemos todas las consultas a la brevedad. No dudes en escribirnos.
          </p>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-2 lg:gap-16 items-start">

          {/* Info de contacto */}
          <div className="space-y-8">

            <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-sofi-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📩</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-sofi-800">Email</h3>
                <p className="mt-1 text-sm text-sofi-600">
                  Escribinos a cualquier hora. Te respondemos en menos de 24 hs.
                </p>
                <a
                  href="mailto:sofigurumis@gmail.com"
                  className="mt-2 inline-block text-sm font-semibold text-sofi-500 hover:text-sofi-700 transition-colors"
                >
                  sofigurumis@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-sofi-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📸</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-sofi-800">Instagram</h3>
                <p className="mt-1 text-sm text-sofi-600">
                  Seguinos para ver los últimos diseños y novedades.
                </p>
                <a
                  href="https://instagram.com/sofigurumis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-sofi-500 hover:text-sofi-700 transition-colors"
                >
                  @sofigurumis
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-sofi-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xl">⏰</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-sofi-800">Horario de atención</h3>
                <p className="mt-1 text-sm text-sofi-600">
                  Lunes a viernes de 9:00 a 18:00 hs.
                </p>
              </div>
            </div>

            {/* Card de ubicación con Maps */}
            <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm overflow-hidden">
              <div className="p-6 flex items-start gap-4 border-b border-sofi-100">
                <div className="w-10 h-10 bg-sofi-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">📍</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-sofi-800">Ubicación</h3>
                  {/* Reemplazá el texto con tu dirección real */}
                  <p className="mt-1 text-sm text-sofi-600">Buenos Aires, Argentina</p>
                  {/* Reemplazá el href con el link de Google Maps de tu dirección */}
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-sofi-500 hover:text-sofi-700 transition-colors"
                  >
                    Ver en Google Maps →
                  </a>
                </div>
              </div>
              {/* Mini preview del mapa — reemplazá el src con tu embed de Google Maps */}
              <iframe
                title="Ubicación Sofigurumis"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d209715.0431568578!2d-58.70429485!3d-34.6157126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcca3b4ef90cbd%3A0xa0b3812d575c6f4c!2sBuenos%20Aires%2C%20CABA!5e0!3m2!1ses!2sar!4v1700000000000"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block"
              />
            </div>

          </div>

          {/* Formulario */}
          <div className="mt-10 lg:mt-0">
            {sent ? (
              <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-10 text-center">
                <div className="text-5xl mb-4">🧶</div>
                <h3 className="text-xl font-bold text-sofi-800 mb-2">¡Mensaje enviado!</h3>
                <p className="text-sm text-sofi-600">
                  Gracias por escribirnos. Te respondemos a la brevedad.
                </p>
                <button
                  type="button"
                  onClick={() => { setSent(false); setFormData({ name: "", email: "", message: "" }) }}
                  className="mt-6 inline-flex items-center px-5 py-2.5 rounded-full border border-sofi-400 text-sm font-semibold text-sofi-600 hover:bg-sofi-400 hover:text-white transition-all duration-200"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm p-8">
                <h3 className="text-sm font-semibold text-sofi-800 mb-6">Envianos tu consulta</h3>
                <form onSubmit={onSubmit} className="space-y-5">

                  <div>
                    <label className="block text-sm font-medium text-sofi-700 mb-1.5">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={onChange}
                      required
                      placeholder="Tu nombre"
                      className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sofi-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={onChange}
                      required
                      placeholder="tu@email.com"
                      className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sofi-700 mb-1.5">
                      Mensaje *
                    </label>
                    <textarea
                      name="message"
                      value={message}
                      onChange={onChange}
                      required
                      rows={5}
                      placeholder="¿En qué te podemos ayudar?"
                      className="w-full rounded-xl border border-sofi-200 px-4 py-3 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none resize-none transition"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-sofi-400 text-white text-sm font-semibold hover:bg-sofi-500 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300"
                  >
                    Enviar mensaje
                  </button>

                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Contact)
