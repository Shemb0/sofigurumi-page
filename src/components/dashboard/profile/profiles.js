import { connect } from 'react-redux'
import { list_orders } from '../../../redux/actions/orders'
import { get_items, get_total, get_item_total } from "../../../redux/actions/cart";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import DashboardLink from '../../../components/dashboard/dashboardLinks';
import { MenuAlt2Icon, UserIcon, ClipboardCheckIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import { countries } from '../../../helpers/fixedCountries';
import { update_user_profile } from '../../../redux/actions/profile';
import { Oval } from "react-loader-spinner"

const navigation = [
  { name: 'Ordenes', href: '/Dashboard', icon: ClipboardCheckIcon },
  { name: 'Perfil', href: '/Dashboard/Perfil', icon: UserIcon },
]

const Profile = ({
  list_orders,
  get_items,
  get_total,
  get_item_total,
  orders,
  isAuthenticated,
  user,
  update_user_profile,
  profile
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    get_items()
    get_total()
    get_item_total()
    list_orders()
  }, [])

  const [formData, setFormData] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    state_province_region: '',
    zipcode: '',
    phone: '',
    country_region: 'Canada'
  });

  const { address_line_1, address_line_2, city, state_province_region, zipcode, phone, country_region } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    setLoading(true);
    update_user_profile(address_line_1, address_line_2, city, state_province_region, zipcode, phone, country_region);
    setLoading(false);
    window.scrollTo(0, 0);
  };

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-sofi-50">
      <DashboardLink
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />

      <div className="md:pl-64 flex flex-col flex-1">
        {/* Mobile topbar */}
        <div className="md:hidden sticky top-0 z-10 bg-white border-b border-sofi-100 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="text-sofi-500 hover:text-sofi-700">
            <MenuAlt2Icon className="h-6 w-6" />
          </button>
          <span className="text-sm font-semibold text-sofi-800">Mi Perfil</span>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-2xl mx-auto">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-sofi-800">Mi Perfil</h1>
              <p className="text-sm text-sofi-500 mt-1">Actualizá tus datos de envío</p>
            </div>

            {/* User info card */}
            {user && (
              <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm px-6 py-5 mb-5 flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sofi-100 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-sofi-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-sofi-800">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-sofi-500">{user.email}</p>
                </div>
              </div>
            )}

            {/* Form card */}
            <form onSubmit={onSubmit}>
              <div className="bg-white rounded-2xl border border-sofi-100 shadow-sm overflow-hidden">

                <div className="px-6 py-4 border-b border-sofi-100">
                  <h2 className="text-sm font-semibold text-sofi-800">Datos de envío</h2>
                </div>

                <div className="px-6 py-5 space-y-4">

                  {/* Address line 1 */}
                  <div>
                    <label className="block text-sm font-medium text-sofi-700 mb-1.5">
                      Dirección línea 1
                    </label>
                    <input
                      type="text"
                      name="address_line_1"
                      placeholder={profile?.address_line_1 || "Ej: Av. Corrientes 1234"}
                      onChange={onChange}
                      value={address_line_1}
                      className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                    />
                  </div>

                  {/* Address line 2 */}
                  <div>
                    <label className="block text-sm font-medium text-sofi-700 mb-1.5">
                      Dirección línea 2
                    </label>
                    <input
                      type="text"
                      name="address_line_2"
                      placeholder={profile?.address_line_2 || "Piso, depto, etc. (opcional)"}
                      onChange={onChange}
                      value={address_line_2}
                      className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                    />
                  </div>

                  {/* City + State row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sofi-700 mb-1.5">Ciudad</label>
                      <input
                        type="text"
                        name="city"
                        placeholder={profile?.city || "Ej: Buenos Aires"}
                        onChange={onChange}
                        value={city}
                        className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sofi-700 mb-1.5">Provincia / Estado</label>
                      <input
                        type="text"
                        name="state_province_region"
                        placeholder={profile?.state_province_region || "Ej: Buenos Aires"}
                        onChange={onChange}
                        value={state_province_region}
                        className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Zipcode + Phone row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sofi-700 mb-1.5">Código postal</label>
                      <input
                        type="text"
                        name="zipcode"
                        placeholder={profile?.zipcode || "Ej: 1425"}
                        onChange={onChange}
                        value={zipcode}
                        className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sofi-700 mb-1.5">Teléfono</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder={profile?.phone || "Ej: +54 11 1234-5678"}
                        onChange={onChange}
                        value={phone}
                        className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 placeholder-sofi-300 focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-sofi-700 mb-1.5">País</label>
                    <select
                      id="country_region"
                      name="country_region"
                      onChange={onChange}
                      value={country_region}
                      className="w-full rounded-xl border border-sofi-200 px-4 py-2.5 text-sm text-sofi-800 bg-white focus:ring-2 focus:ring-sofi-300 focus:border-sofi-300 outline-none transition"
                    >
                      <option value={country_region}>{profile?.country_region || country_region}</option>
                      {countries && countries.map((country, index) => (
                        <option key={index} value={country.name}>{country.name}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-sofi-100 bg-sofi-50 flex justify-end">
                  {loading ? (
                    <button className="inline-flex items-center px-6 py-2.5 rounded-full bg-sofi-400 text-white text-sm font-semibold">
                      <Oval type="Oval" width={18} height={18} color="#fff" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-full bg-sofi-400 text-white text-sm font-semibold hover:bg-sofi-500 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sofi-300"
                    >
                      Guardar cambios
                    </button>
                  )}
                </div>

              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  orders: state.Orders.orders,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  profile: state.Profile.profile,
})

export default connect(mapStateToProps, {
  list_orders,
  get_items,
  get_total,
  get_item_total,
  update_user_profile
})(Profile)
