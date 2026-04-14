import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Store,
  Banknote,
  BarChart3,
  Settings,
  LogOut,
  ChevronRight,
} from 'lucide-react'

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/merchants', icon: Store, label: 'Merchants' },
  { to: '/payouts', icon: Banknote, label: 'Payouts' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('caspiapay_authed')
    navigate('/')
  }

  function handleNavClick() {
    // Close mobile menu when navigating
    if (onClose) onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 min-h-screen bg-white dark:bg-navy-900 border-r border-gray-200 dark:border-white/5 flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo */}
      <div className="p-5 border-b border-gray-200 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sage flex items-center justify-center text-white font-bold text-base flex-shrink-0">
            CP
          </div>
          <div>
            <span className="text-gray-900 dark:text-white font-semibold text-base tracking-tight">CaspiaPay</span>
            <div className="text-xs text-gray-500 dark:text-slate-500 leading-none mt-0.5">Payment Platform</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              onClick={handleNavClick}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                active
                  ? 'bg-sage/10 text-sage dark:bg-teal/10 dark:text-teal'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
              }`}
            >
              <Icon size={17} className="flex-shrink-0" />
              <span className="flex-1">{label}</span>
              {active && <ChevronRight size={13} className="opacity-60" />}
            </Link>
          )
        })}
      </nav>

      {/* Divider + User */}
      <div className="p-4 border-t border-gray-200 dark:border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sage to-sage-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            FG
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 dark:text-white truncate">Admin</div>
            <div className="text-xs text-gray-500 dark:text-slate-500">Administrator</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 text-gray-500 dark:text-slate-500 hover:text-red-400 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
            title="Sign out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
    </>
  )
}
