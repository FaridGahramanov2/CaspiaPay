import { useMemo, useState } from 'react'
import { DollarSign, ArrowLeftRight, Store, TrendingUp } from 'lucide-react'
import StatCard from '../components/ui/StatCard'
import RevenueChart from '../components/charts/RevenueChart'
import VolumeChart from '../components/charts/VolumeChart'
import MethodPieChart from '../components/charts/MethodPieChart'
import Badge from '../components/ui/Badge'
import TransactionDetail from './TransactionDetail'
import { TRANSACTIONS } from '../data/transactions'
import { MERCHANTS } from '../data/merchants'
import { formatCurrency, formatTimeAgo } from '../utils/formatters'

function CardBrandIcon({ brand }) {
  if (brand === 'visa') {
    return <span className="text-blue-400 text-xs font-bold bg-blue-400/10 px-1.5 py-0.5 rounded">VISA</span>
  }
  return <span className="text-orange-400 text-xs font-bold bg-orange-400/10 px-1.5 py-0.5 rounded">MC</span>
}

export default function Dashboard() {
  const [selectedTx, setSelectedTx] = useState(null)

  const stats = useMemo(() => {
    const today = '2026-04-13'
    const todayTxns = TRANSACTIONS.filter(t => t.createdAt.startsWith(today))
    const succeeded = TRANSACTIONS.filter(t => t.status === 'succeeded')
    const totalRevenue = succeeded.reduce((s, t) => s + t.amount, 0)
    const activeMerchants = MERCHANTS.filter(m => m.status === 'active').length

    return {
      totalRevenue: formatCurrency(totalRevenue),
      transactionsToday: todayTxns.length,
      activeMerchants,
      successRate: '98.7%',
    }
  }, [])

  const recentTxns = useMemo(() => TRANSACTIONS.slice(0, 10), [])

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          change={12.4}
          changeLabel="vs last month"
          icon={DollarSign}
          iconColor="teal"
        />
        <StatCard
          title="Transactions Today"
          value={stats.transactionsToday}
          change={8.2}
          changeLabel="vs yesterday"
          icon={ArrowLeftRight}
          iconColor="blue"
        />
        <StatCard
          title="Active Merchants"
          value={stats.activeMerchants}
          change={6.7}
          changeLabel="vs last month"
          icon={Store}
          iconColor="gold"
        />
        <StatCard
          title="Success Rate"
          value={stats.successRate}
          change={0.3}
          changeLabel="vs last month"
          icon={TrendingUp}
          iconColor="emerald"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-gray-900 dark:text-white font-semibold text-sm">Revenue Over Time</h2>
              <p className="text-gray-500 dark:text-slate-500 text-xs mt-0.5">Last 30 days</p>
            </div>
            <div className="flex items-center gap-2">
              {['Daily', 'Weekly', 'Monthly'].map((period, i) => (
                <button
                  key={period}
                  className={`text-xs px-2.5 py-1 rounded-lg transition ${
                    i === 0
                      ? 'bg-sage/10 text-sage dark:bg-teal/10 dark:text-teal'
                      : 'text-gray-500 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <RevenueChart />
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
          <div className="mb-2">
            <h2 className="text-gray-900 dark:text-white font-semibold text-sm">Payment Methods</h2>
            <p className="text-gray-500 dark:text-slate-500 text-xs mt-0.5">Card brand breakdown</p>
          </div>
          <MethodPieChart />
        </div>
      </div>

      {/* Volume by Hour */}
      <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/5 rounded-xl p-5 shadow-sm">
        <div className="mb-3">
          <h2 className="text-gray-900 dark:text-white font-semibold text-sm">Transaction Volume by Hour</h2>
          <p className="text-gray-500 dark:text-slate-500 text-xs mt-0.5">Today, April 13 — peak hours highlighted</p>
        </div>
        <VolumeChart />
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
        <div className="px-4 sm:px-5 py-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 dark:text-white font-semibold text-sm">Recent Transactions</h2>
            <p className="text-gray-500 dark:text-slate-500 text-xs mt-0.5">Last 10 transactions</p>
          </div>
          <a href="/transactions" className="text-sage dark:text-teal text-xs hover:underline">View all →</a>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200 dark:divide-white/5">
          {recentTxns.map(tx => (
            <div
              key={tx.id}
              onClick={() => setSelectedTx(tx)}
              className="p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 dark:text-white text-sm font-medium truncate">{tx.merchant?.name}</div>
                  <div className="font-mono text-xs text-gray-500 dark:text-slate-400 mt-0.5">{tx.id.slice(0, 14)}…</div>
                </div>
                <div className="ml-3">
                  <Badge status={tx.status} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1.5">
                  <CardBrandIcon brand={tx.card?.brand} />
                  <span className="text-gray-500 dark:text-slate-500 text-xs">•••• {tx.card?.last4}</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${tx.status === 'failed' ? 'text-gray-400 dark:text-slate-500' : 'text-gray-900 dark:text-white'}`}>
                    {formatCurrency(tx.amount)}
                  </div>
                  <div className="text-gray-500 dark:text-slate-500 text-xs mt-0.5">{formatTimeAgo(tx.createdAt)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/5">
                <th className="text-left text-gray-500 dark:text-slate-500 font-medium text-xs px-5 py-3 uppercase tracking-wide">Transaction</th>
                <th className="text-left text-gray-500 dark:text-slate-500 font-medium text-xs px-4 py-3 uppercase tracking-wide">Merchant</th>
                <th className="text-right text-gray-500 dark:text-slate-500 font-medium text-xs px-4 py-3 uppercase tracking-wide">Amount</th>
                <th className="text-left text-gray-500 dark:text-slate-500 font-medium text-xs px-4 py-3 uppercase tracking-wide">Status</th>
                <th className="text-left text-gray-500 dark:text-slate-500 font-medium text-xs px-4 py-3 uppercase tracking-wide">Card</th>
                <th className="text-left text-gray-500 dark:text-slate-500 font-medium text-xs px-4 py-3 uppercase tracking-wide">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentTxns.map(tx => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3">
                    <span className="font-mono text-xs text-gray-500 dark:text-slate-400">{tx.id.slice(0, 14)}…</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-900 dark:text-white text-xs font-medium">{tx.merchant?.name}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`text-sm font-semibold ${tx.status === 'failed' ? 'text-gray-400 dark:text-slate-500' : 'text-gray-900 dark:text-white'}`}>
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={tx.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <CardBrandIcon brand={tx.card?.brand} />
                      <span className="text-gray-500 dark:text-slate-500 text-xs">•••• {tx.card?.last4}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gray-500 dark:text-slate-500 text-xs">{formatTimeAgo(tx.createdAt)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TransactionDetail transaction={selectedTx} onClose={() => setSelectedTx(null)} />
    </div>
  )
}
