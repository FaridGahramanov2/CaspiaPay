import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const PAGE_META = {
  '/investor-demo': { title: 'Investor sandbox', subtitle: 'Payments and financial operations, connected' },
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview of your payment activity' },
  '/transactions': { title: 'Transactions', subtitle: 'All payment transactions' },
  '/merchants': { title: 'Merchants', subtitle: 'Manage your merchant accounts' },
  '/payouts': { title: 'Payouts', subtitle: 'Merchant payouts and schedules' },
  '/analytics': { title: 'Analytics', subtitle: 'Revenue insights and trends' },
  '/settings': { title: 'Settings', subtitle: 'Platform configuration' },
}

export default function Layout({ children }) {
  const { pathname } = useLocation()
  const meta = PAGE_META[pathname] || { title: 'CaspiaPay', subtitle: '' }
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-navy-900">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 min-w-0 lg:ml-64 flex flex-col min-h-screen">
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 page-enter">{pathname !== '/investor-demo' && <p className="mb-4 rounded-lg bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-900/20 dark:text-amber-200">Historical sample data for demonstration only. These records are separate from the interactive Investor sandbox and do not represent actual customers or traction.</p>}{children}</main>
      </div>
    </div>
  )
}
