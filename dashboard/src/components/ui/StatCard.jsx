import { TrendingUp, TrendingDown } from 'lucide-react'

const ICON_COLORS = {
  teal: 'text-teal bg-teal/10 border-teal/20',
  gold: 'text-gold bg-gold/10 border-gold/20',
  purple: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  blue: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  emerald: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
}

export default function StatCard({ title, value, change, changeLabel, icon: Icon, iconColor = 'teal' }) {
  const isPositive = change >= 0
  const colorClass = ICON_COLORS[iconColor] || ICON_COLORS.teal

  return (
    <div className="bg-white dark:bg-navy-800 border border-gray-200 dark:border-white/5 rounded-xl p-5 hover:border-gray-300 dark:hover:border-white/10 transition-all shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <p className="text-gray-500 dark:text-slate-500 text-sm">{title}</p>
        {Icon && (
          <div className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${colorClass}`}>
            <Icon size={17} />
          </div>
        )}
      </div>
      <p className="text-gray-900 dark:text-white text-2xl font-semibold tracking-tight">{value}</p>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-xs ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          <span className="font-medium">{isPositive ? '+' : ''}{change}%</span>
          <span className="text-gray-500 dark:text-slate-500">{changeLabel || 'vs last period'}</span>
        </div>
      )}
    </div>
  )
}
