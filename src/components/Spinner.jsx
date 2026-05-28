export default function Spinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5 border-2',
    md: 'w-9 h-9 border-[3px]',
    lg: 'w-14 h-14 border-4',
  }

  return (
    <div
      className={`${sizes[size]} border-[#21262d] border-t-cyan-400 rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Cargando..."
    />
  )
}
