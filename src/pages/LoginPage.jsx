import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from '../components/Spinner'

const ROLES = ['Administrador', 'Desarrollador', 'QA / Tester', 'Soporte Técnico', 'Product Manager']

export default function LoginPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [role, setRole] = useState('Desarrollador')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) { setError('Ingresa tu nombre para continuar'); return }
    if (name.trim().length < 2) { setError('El nombre debe tener al menos 2 caracteres'); return }
    setError('')
    setLoading(true)
    // Simulated async login
    await new Promise((r) => setTimeout(r, 600))
    login(name.trim(), role)
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="noise-bg scanline min-h-screen grid-bg flex items-center justify-center px-4 relative">
      <div className="w-full max-w-sm animate-slide-up">

        {/* Logo lockup */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#161b22] border border-cyan-500/20 mb-4 relative">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect x="3" y="3" width="10" height="10" rx="2" fill="#06b6d4" opacity="0.9"/>
              <rect x="15" y="3" width="10" height="10" rx="2" fill="#06b6d4" opacity="0.4"/>
              <rect x="3" y="15" width="10" height="10" rx="2" fill="#06b6d4" opacity="0.4"/>
              <rect x="15" y="15" width="10" height="10" rx="2" fill="#06b6d4" opacity="0.9"/>
            </svg>
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 blur-md" />
          </div>
          <h1 className="font-display text-xl font-bold tracking-widest text-white">
            ISSUE<span className="text-cyan-400">TRACK</span>
          </h1>
          <p className="text-xs text-[#8b949e] mt-1 font-mono tracking-wide">
            Sistema de Gestión de Incidencias
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          {/* Top accent */}
          <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          <div className="px-6 py-7">
            <h2 className="text-sm font-semibold text-[#e6edf3] mb-1">Bienvenido de vuelta</h2>
            <p className="text-xs text-[#8b949e] mb-6">Ingresa tus datos para acceder al panel</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-1.5">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError('') }}
                  placeholder="Ej: Ana García"
                  className={`form-input ${error ? 'border-rose-500/60' : ''}`}
                  autoFocus
                  disabled={loading}
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-xs font-mono text-[#8b949e] uppercase tracking-widest mb-1.5">
                  Rol
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="form-input"
                  disabled={loading}
                >
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
                    <circle cx="6" cy="6" r="5" stroke="#f43f5e" strokeWidth="1.2"/>
                    <path d="M6 3.5v3M6 8.5v.01" stroke="#f43f5e" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  <p className="text-xs text-rose-400 font-mono">{error}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-60 disabled:cursor-not-allowed text-[#060810] font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <><Spinner size="sm" /><span>Autenticando...</span></>
                ) : (
                  <>
                    <span>Ingresar al panel</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] text-[#8b949e]/50 font-mono mt-6 tracking-widest">
          v1.0.0 — ISSUETRACK © 2026
        </p>
      </div>
    </div>
  )
}
