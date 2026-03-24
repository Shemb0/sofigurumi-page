import { connect } from "react-redux"
import { useState } from 'react'
import { MenuAlt2Icon, ClipboardCheckIcon, UserIcon } from '@heroicons/react/outline'
import Orders from "./ordenes/orderDetails"
import DashboardLink from "./dashboardLinks"

const navigation = [
  { name: 'Ordenes', href: '/Dashboard', icon: ClipboardCheckIcon },
  { name: 'Perfil', href: '/Dashboard/Perfil', icon: UserIcon },
]

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen">
      <DashboardLink
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        navigation={navigation}
      />
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Mobile topbar */}
        <div className="md:hidden sticky top-0 z-10 bg-white border-b border-sofi-100 px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-sofi-500 hover:text-sofi-700"
          >
            <MenuAlt2Icon className="h-6 w-6" />
          </button>
          <span className="text-sm font-semibold text-sofi-800">Mis Ordenes</span>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-sofi-800">Mis Pedidos</h1>
              <p className="text-sm text-sofi-500 mt-1">Seguí el estado de tus compras</p>
            </div>
            <Orders />
          </div>
        </main>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})

export default connect(mapStateToProps, {})(Dashboard)
