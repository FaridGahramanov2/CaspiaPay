import { Bell, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function Header({ title, subtitle }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="h-16 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-navy-800/60 backdrop-blur-sm flex items-center px-6 sticky top-0 z-20">
      <div className="flex-1">
        <h1 className="text-gray-900 dark:text-white font-semibold text-lg leading-tight">{title}</h1>
        {subtitle && <p className="text-gray-500 dark:text-slate-500 text-xs">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition flex items-center justify-center text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/5"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        {/* Date badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 dark:text-slate-500 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2">
          <span className="w-1.5 h-1.5 bg-sage rounded-full"></span>
          <span>Apr 13, 2026</span>
        </div>
        {/* Notification bell */}
        <div className="relative">
          <button className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition flex items-center justify-center text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/5">
            <Bell size={16} />
          </button>
          <span className="absolute top-1 right-1 w-2 h-2 bg-sage rounded-full border-2 border-white dark:border-navy-800"></span>
        </div>
      </div>
    </header>
  )
}
