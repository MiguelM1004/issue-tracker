export default function SkeletonCard() {
  return (
    <div className="relative bg-[#161b22] border border-[#21262d] rounded-xl p-5 overflow-hidden">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <div className="h-3 w-12 rounded-full bg-[#21262d]" />
        <div className="h-5 w-16 rounded-full bg-[#21262d]" />
      </div>

      {/* Title */}
      <div className="h-4 w-3/4 rounded-full bg-[#21262d] mb-2" />
      <div className="h-4 w-1/2 rounded-full bg-[#21262d] mb-4" />

      {/* Description */}
      <div className="h-3 w-full rounded-full bg-[#21262d] mb-1.5" />
      <div className="h-3 w-5/6 rounded-full bg-[#21262d] mb-4" />

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 rounded-full bg-[#21262d]" />
        <div className="h-3 w-16 rounded-full bg-[#21262d]" />
      </div>
    </div>
  )
}