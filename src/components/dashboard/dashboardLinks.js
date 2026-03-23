import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/img/logo/sofi.png';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardLink = ({ sidebarOpen, setSidebarOpen, navigation }) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-sofi-900/30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white border-r border-sofi-100">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-3 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-5 py-5 border-b border-sofi-100">
                <Link to="/"><img className="h-10 w-auto" src={logo} alt="Sofigurumi" style={{ mixBlendMode: 'multiply' }} /></Link>
              </div>
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <nav className="space-y-1">
                  {navigation.map((item) => {
                    const active = location.pathname === item.href;
                    return (
                      <Link key={item.name} to={item.href}
                        className={classNames(
                          active ? 'bg-sofi-100 text-sofi-800 font-semibold' : 'text-sofi-600 hover:bg-sofi-50 hover:text-sofi-800',
                          'group flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-150'
                        )}
                      >
                        <item.icon className={classNames(active ? 'text-sofi-500' : 'text-sofi-400 group-hover:text-sofi-500', 'h-5 w-5 flex-shrink-0')} aria-hidden="true" />
                        {item.name}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true" />
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white border-r border-sofi-100 overflow-y-auto">

          {/* Logo */}
          <div className="flex items-center flex-shrink-0 px-5 py-5 border-b border-sofi-100">
            <Link to="/">
              <img className="h-10 w-auto" src={logo} alt="Sofigurumi" style={{ mixBlendMode: 'multiply' }} />
            </Link>
          </div>

          {/* Section label */}
          <div className="px-5 pt-5 pb-2">
            <p className="text-xs font-semibold text-sofi-400 uppercase tracking-widest">Mi cuenta</p>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-3 pb-4 space-y-1">
            {navigation.map((item) => {
              const active = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}
                  className={classNames(
                    active ? 'bg-sofi-100 text-sofi-800 font-semibold' : 'text-sofi-600 hover:bg-sofi-50 hover:text-sofi-800',
                    'group flex items-center gap-3 px-3 py-2.5 text-sm rounded-xl transition-all duration-150'
                  )}
                >
                  <item.icon
                    className={classNames(active ? 'text-sofi-500' : 'text-sofi-400 group-hover:text-sofi-500', 'h-5 w-5 flex-shrink-0')}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Back to store */}
          <div className="px-5 py-4 border-t border-sofi-100">
            <Link to="/" className="text-xs text-sofi-400 hover:text-sofi-600 transition-colors">
              ← Volver a la tienda
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLink
