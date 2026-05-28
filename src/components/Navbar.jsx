import { useAuth } from '../context/AuthContext'
import Swal from 'sweetalert2'

export default function Navbar() {
  const { session, logout } = useAuth()

  const handleLogout = () => {
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Deseas salir de tu sesión actual?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      customClass: { popup: 'swal2-popup' },
    }).then((result) => {
      if (result.isConfirmed) logout()
    })
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[#21262d] bg-[#0d1117]/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill="#06b6d4" opacity="0.8"/>
              <rect x="8" y="1" width="5" height="5" rx="1" fill="#06b6d4" opacity="0.4"/>
              <rect x="1" y="8" width="5" height="5" rx="1" fill="#06b6d4" opacity="0.4"/>
              <rect x="8" y="8" width="5" height="5" rx="1" fill="#06b6d4" opacity="0.8"/>
            </svg>
          </div>
          <span className="font-display text-sm font-bold tracking-wider text-white">
            ISSUE<span className="text-cyan-400">TRACK</span>
          </span>
        </div>

        {/* Right side */}
        {session && (
          <div className="flex items-center gap-3">
            {/* User chip */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#21262d]">
              <div className="w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                <span className="text-cyan-400 text-[10px] font-bold font-mono">
                  {session.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xs text-[#e6edf3] font-medium">{session.name}</span>
              <span className="text-[10px] text-[#8b949e] font-mono px-1.5 py-0.5 rounded bg-[#21262d]">
                {session.role}
              </span>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-[#8b949e] hover:text-[#f43f5e] hover:bg-[#f43f5e]/10 border border-transparent hover:border-[#f43f5e]/20 transition-all duration-200"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4.5 1.5H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h2.5M8 8.5L10.5 6 8 3.5M10.5 6H5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="hidden sm:inline">Cerrar sesión</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
