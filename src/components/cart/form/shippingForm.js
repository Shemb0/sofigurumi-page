const ShippingForm = ({
  full_name,
  address_line_1,
  address_line_2,
  city,
  state_province_region,
  postal_zip_code,
  telephone_number,
  countries,
  onChange,
  buy,
  user,
  total_amount,
  total_compare_amount,
  estimated_tax,
  renderPaymentInfo,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    buy();
  };

  const inputClass = "w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition";
  const labelClass = "block text-sm font-medium text-sofi-700 mb-1.5";

  return (
    <section aria-labelledby="summary-heading" className="lg:col-span-5">
      <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm overflow-hidden sticky top-4">

        {/* Resumen del pedido */}
        <div className="px-6 py-4 border-b border-sofi-100">
          <h2 id="summary-heading" className="text-sm font-semibold text-sofi-800">Resumen del pedido</h2>
        </div>
        <div className="px-6 py-4 space-y-2.5 border-b border-sofi-100">
          <div className="flex justify-between text-sm text-sofi-600">
            <span>Subtotal</span>
            <span className="font-medium text-sofi-800">${total_compare_amount}</span>
          </div>
          <div className="flex justify-between text-sm text-sofi-600">
            <span>Impuestos estimados</span>
            <span className="font-medium text-sofi-800">${estimated_tax}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-sofi-800 pt-2 border-t border-sofi-100">
            <span>Total</span>
            <span className="text-sofi-500">${total_amount}</span>
          </div>
        </div>

        {/* Formulario de envío */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 space-y-4">
            <p className="text-xs font-semibold text-sofi-400 uppercase tracking-wider">Datos de envío</p>

            <div>
              <label className={labelClass}>Nombre completo *</label>
              <input
                type="text"
                name="full_name"
                placeholder={`${user?.first_name || ''} ${user?.last_name || ''}`}
                onChange={e => onChange(e)}
                value={full_name}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Dirección línea 1 *</label>
              <input
                type="text"
                name="address_line_1"
                onChange={e => onChange(e)}
                value={address_line_1}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Dirección línea 2</label>
              <input
                type="text"
                name="address_line_2"
                onChange={e => onChange(e)}
                value={address_line_2}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Ciudad *</label>
                <input
                  type="text"
                  name="city"
                  onChange={e => onChange(e)}
                  value={city}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Provincia *</label>
                <input
                  type="text"
                  name="state_province_region"
                  onChange={e => onChange(e)}
                  value={state_province_region}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Código postal *</label>
                <input
                  type="text"
                  name="postal_zip_code"
                  onChange={e => onChange(e)}
                  value={postal_zip_code}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Teléfono *</label>
                <input
                  type="tel"
                  name="telephone_number"
                  onChange={e => onChange(e)}
                  value={telephone_number}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>País *</label>
              <select
                id="country_region"
                name="country_region"
                onChange={e => onChange(e)}
                className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 bg-white focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
              >
                {countries && countries.map((country, index) => (
                  <option key={index} value={country.name}>{country.name}</option>
                ))}
              </select>
            </div>

            <div className="pt-2">
              {renderPaymentInfo()}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ShippingForm;
