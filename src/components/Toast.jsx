import { useEffect, useState } from 'react'

const ICONS = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#34d399" strokeWidth="1.5"/>
      <path d="M5 8l2 2 4-4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#f43f5e" strokeWidth="1.5"/>
      <path d="M5 5l6 6M11 5l-6 6" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#06b6d4" strokeWidth="1.5"/>
      <path d="M8 7v5M8 5v.01" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
}

const COLORS = {
  success: { border: 'rgba(52,211,153,0.2)', bar: '#34d399' },
  error: { border: 'rgba(244,63,94,0.2)', bar: '#f43f5e' },
  info: { border: 'rgba(6,182,212,0.2)', bar: '#06b6d4' },
}

function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setVisible(true), 10)
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onRemove(toast.id), 300)
    }, toast.duration || 3000)
    return () => clearTimeout(timer)
  }, [])

  const color = COLORS[toast.type] || COLORS.info

  return (
    <div
      className="relative overflow-hidden flex items-start gap-3 px-4 py-3 rounded-xl border bg-[#161b22] shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 min-w-[280px] max-w-[360px]"
      style={{
        borderColor: color.border,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
      }}
    >
      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 rounded-full"
        style={{
          background: color.bar,
          width: '100%',
          animation: `shrink ${toast.duration || 3000}ms linear forwards`,
        }}
      />

      <div className="shrink-0 mt-0.5">{ICONS[toast.type]}</div>
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-white mb-0.5">{toast.title}</p>
        )}
        {toast.message && (
          <p className="text-xs text-[#8b949e]">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="shrink-0 text-[#8b949e] hover:text-white transition-colors mt-0.5"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

export default function Toast({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 items-end">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}