import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="noise-bg grid-bg min-h-screen flex items-center justify-center px-4">
      <div className="text-center animate-slide-up">
        <p className="text-8xl font-display font-bold text-cyan-500/20 mb-2 tracking-widest select-none">
          404
        </p>
        <h1 className="font-display text-lg font-bold text-white mb-2 tracking-wide">
          PÁGINA NO ENCONTRADA
        </h1>
        <p className="text-sm text-[#8b949e] mb-8 max-w-xs">
          La ruta que estás buscando no existe o fue movida.
        </p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-5 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#060810] font-semibold text-sm transition-all duration-200"
        >
          Volver al panel
        </button>
      </div>
    </div>
  )
}
