import { useState, useMemo } from 'react'
import { Search, Download, ChevronLeft, ChevronRight, Filter } from 'lucide-react'
import Badge from '../components/ui/Badge'
import TransactionDetail from './TransactionDetail'
import { TRANSACTIONS } from '../data/transactions'
import { formatCurrency, formatDate } from '../utils/formatters'
import { useToast } from '../components/ui/Toast'

const PAGE_SIZE = 20

function CardBrandIcon({ brand }) {
  if (brand === 'visa') {
    return <span className="text-blue-400 text-xs font-bold bg-blue-400/10 px-1.5 py-0.5 rounded">VISA</span>
  }
  return <span className="text-orange-400 text-xs font-bold bg-orange-400/10 px-1.5 py-0.5 rounded">MC</span>
}

export default function Transactions() {
  const toast = useToast()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [cardFilter, setCardFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selectedTx, setSelectedTx] = useState(null)

  const filtered = useMemo(() => {
    return TRANSACTIONS.filter(tx => {
      const q = search.toLowerCase()
      const matchSearch =
        !q ||
        tx.id.includes(q) ||
        tx.merchant?.name?.toLowerCase().includes(q) ||
        tx.customerEmail?.toLowerCase().includes(q) ||
        tx.description?.toLowerCase().includes(q)
      const matchStatus = statusFilter === 'all' || tx.status === statusFilter
      const matchCard = cardFilter === 'all' || tx.card?.brand === cardFilter
      return matchSearch && matchStatus && matchCard
    })
  }, [search, statusFilter, cardFilter])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const stats = useMemo(() => {
    const succeeded = TRANSACTIONS.filter(t => t.status === 'succeeded')
    const today = '2026-04-13'
    const thisMonth = TRANSACTIONS.filter(t => t.createdAt.startsWith('2026-04') && t.status === 'succeeded')
    return {
      total: TRANSACTIONS.length,
      thisMonth: thisMonth.reduce((s, t) => s + t.amount, 0),
      successRate: ((succeeded.length / TRANSACTIONS.length) * 100).toFixed(1),
      failed: TRANSACTIONS.filter(t => t.status === 'failed').length,
    }
  }, [])

  function handleSearch(e) {
    setSearch(e.target.value)
    setPage(1)
  }

  function handleExport() {
    const headers = ['ID', 'Merchant', 'Amount', 'Status', 'Card Brand', 'Card Last4', 'Date']
    const rows = filtered.map(tx => [
      tx.id,
      tx.merchant?.name,
      tx.amount,
      tx.status,
      tx.card?.brand,
      tx.card?.last4,
      tx.createdAt,
    ])
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'transactions.csv'
    a.click()
    URL.revokeObjectURL(url)
    toast('Transactions exported to CSV', 'success')
  }

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Transactions', value: stats.total.toLocaleString() },
          { label: 'This Month Revenue', value: formatCurrency(stats.thisMonth) },
          { label: 'Success Rate', value: `${stats.successRate}%` },
          { label: 'Failed', value: stats.failed.toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/5 rounded-xl p-4 shadow-sm">
            <p className="text-gray-500 dark:text-slate-500 text-xs">{label}</p>
            <p className="text-gray-900 dark:text-white text-xl font-semibold mt-1">{value}</p>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm">
        {/* Filters */}
        <div className="px-4 sm:px-5 py-4 border-b border-gray-200 dark:border-white/5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-navy-900 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 flex-1 min-w-[180px] max-w-xs">
            <Search size={14} className="text-gray-500 dark:text-slate-500 flex-shrink-0" />
            <input
              value={search}
              onChange={handleSearch}
              placeholder="Search transactions…"
              className="bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 focus:outline-none flex-1 min-w-0"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => { setStatusFilter(e.target.value); setPage(1) }}
            className="bg-gray-100 dark:bg-navy-900 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-gray-600 dark:text-slate-400 focus:outline-none cursor-pointer"
          >
            <option value="all">All statuses</option>
            <option value="succeeded">Succeeded</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={cardFilter}
            onChange={e => { setCardFilter(e.target.value); setPage(1) }}
            className="bg-gray-100 dark:bg-navy-900 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-gray-600 dark:text-slate-400 focus:outline-none cursor-pointer"
          >
            <option value="all">All cards</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
          </select>

          <div className="ml-auto flex items-center gap-2">
            <span className="hidden sm:inline text-gray-500 dark:text-slate-500 text-xs">{filtered.length} results</span>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-sm text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white transition"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200 dark:divide-white/5">
          {paginated.map(tx => (
            <div
              key={tx.id}
              onClick={() => setSelectedTx(tx)}
              className="p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 dark:text-white text-sm font-medium truncate">{tx.merchant?.name}</div>
                  <div className="text-gray-600 dark:text-slate-400 text-xs mt-0.5 truncate">{tx.description}</div>
                  <div className="font-mono text-xs text-gray-500 dark:text-slate-400 mt-1">{tx.id.slice(0, 14)}…</div>
                </div>
                <div className="ml-3">
                  <Badge status={tx.status} />
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                <div>
                  <div className={`text-sm font-semibold ${tx.status === 'failed' ? 'text-gray-400 dark:text-slate-500' : 'text-gray-900 dark:text-white'}`}>
                    {formatCurrency(tx.amount)}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <CardBrandIcon brand={tx.card?.brand} />
                    <span className="text-gray-500 dark:text-slate-500 text-xs">•••• {tx.card?.last4}</span>
                  </div>
                </div>
                <div className="text-right text-gray-500 dark:text-slate-500 text-xs">
                  {formatDate(tx.createdAt, { time: true })}
                </div>
              </div>
            </div>
          ))}
          {paginated.length === 0 && (
            <div className="px-4 py-12 text-center text-gray-400 dark:text-slate-600">No transactions found</div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/5">
                {['Transaction ID', 'Merchant', 'Description', 'Amount', 'Status', 'Card', 'Date'].map(h => (
                  <th key={h} className="text-left text-gray-500 dark:text-slate-500 font-medium text-xs px-5 py-3 uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map(tx => (
                <tr
                  key={tx.id}
                  onClick={() => setSelectedTx(tx)}
                  className="border-b border-gray-200 dark:border-white/5 last:border-0 hover:bg-gray-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors"
                >
                  <td className="px-5 py-3">
                    <span className="font-mono text-xs text-gray-500 dark:text-slate-400">{tx.id.slice(0, 16)}…</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-gray-900 dark:text-white text-xs font-medium whitespace-nowrap">{tx.merchant?.name}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-gray-600 dark:text-slate-400 text-xs whitespace-nowrap">{tx.description}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-sm font-semibold whitespace-nowrap ${tx.status === 'failed' ? 'text-gray-400 dark:text-slate-500' : 'text-gray-900 dark:text-white'}`}>
                      {formatCurrency(tx.amount)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <Badge status={tx.status} />
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      <CardBrandIcon brand={tx.card?.brand} />
                      <span className="text-gray-500 dark:text-slate-500 text-xs">•••• {tx.card?.last4}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="text-gray-500 dark:text-slate-500 text-xs whitespace-nowrap">{formatDate(tx.createdAt, { time: true })}</span>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-gray-400 dark:text-slate-600">No transactions found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-5 py-3 border-t border-gray-200 dark:border-white/5 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-slate-500">
              Page {page} of {totalPages} · {filtered.length} transactions
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pg = Math.max(1, Math.min(page - 2, totalPages - 4)) + i
                return (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    className={`w-7 h-7 rounded-lg text-xs transition ${
                      pg === page ? 'bg-sage/10 text-sage dark:bg-teal/10 dark:text-teal' : 'text-gray-500 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    {pg}
                  </button>
                )
              })}
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      <TransactionDetail transaction={selectedTx} onClose={() => setSelectedTx(null)} />
    </div>
  )
}
