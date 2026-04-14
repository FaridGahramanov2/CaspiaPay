import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Merchants from './pages/Merchants'
import Payouts from './pages/Payouts'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import { ToastProvider } from './components/ui/Toast'

function RequireAuth({ children }) {
  const authed = localStorage.getItem('caspiapay_authed')
  if (!authed) return <Navigate to="/" replace />
  return children
}

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<RequireAuth><Layout><Dashboard /></Layout></RequireAuth>}
        />
        <Route
          path="/transactions"
          element={<RequireAuth><Layout><Transactions /></Layout></RequireAuth>}
        />
        <Route
          path="/merchants"
          element={<RequireAuth><Layout><Merchants /></Layout></RequireAuth>}
        />
        <Route
          path="/payouts"
          element={<RequireAuth><Layout><Payouts /></Layout></RequireAuth>}
        />
        <Route
          path="/analytics"
          element={<RequireAuth><Layout><Analytics /></Layout></RequireAuth>}
        />
        <Route
          path="/settings"
          element={<RequireAuth><Layout><Settings /></Layout></RequireAuth>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  )
}
