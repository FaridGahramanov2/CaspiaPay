import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const PAGE_META = {
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

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-navy-900">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header title={meta.title} subtitle={meta.subtitle} />
        <main className="flex-1 p-6 page-enter">{children}</main>
      </div>
    </div>
  )
}
