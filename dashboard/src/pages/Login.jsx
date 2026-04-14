import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('admin@caspiapay.az')
  const [password, setPassword] = useState('demo1234')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      localStorage.setItem('caspiapay_authed', 'true')
      navigate('/dashboard')
    }, 900)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-moss via-slate to-slate-600 flex items-center justify-center relative overflow-hidden p-6">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-sage rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-lavender rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-lime to-sage mb-5 shadow-2xl shadow-lime/30">
            <span className="text-slate-700 text-3xl font-black">A</span>
          </div>
          <h1 className="text-white text-3xl font-bold mb-2">Welcome to CaspiaPay</h1>
          <p className="text-cream/70 text-sm">Sign in to your merchant dashboard</p>
        </div>

        {/* Login card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-cream/90 mb-2 font-medium">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 backdrop-blur border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/30 transition placeholder-white/30"
                placeholder="admin@caspiapay.az"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-cream/90 font-medium">Password</label>
                <span className="text-xs text-lime hover:text-lime-600 cursor-pointer transition">
                  Forgot password?
                </span>
              </div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-white/5 backdrop-blur border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-lime focus:ring-2 focus:ring-lime/30 transition placeholder-white/30"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-lime to-sage hover:from-lime-600 hover:to-sage-600 text-slate-700 font-bold py-3.5 rounded-xl text-sm transition-all mt-2 disabled:opacity-60 flex items-center justify-center gap-2 shadow-xl shadow-lime/20 group"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-slate-700/30 border-t-slate-700 rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-xs text-cream/60">
              <span className="w-2 h-2 bg-sage rounded-full animate-pulse"></span>
              Demo mode — any credentials work
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-cream/40 mt-6">
          © 2026 CaspiaPay. Built for Azerbaijan's digital economy.
        </p>
      </div>
    </div>
  )
}
