export default function SkeletonCard() {
  return (
    <div className="relative bg-[#161b22] border border-[#21262d] rounded-xl p-5 overflow-hidden">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
        style={{background: 'linear-gradient(90deg, transparent, rgba(6,182,212,0.04), transparent)'}}
      />
      <div className="flex items-center justify-between mb-3">
        <div className="h-3 w-12 bg-[#21262d] rounded-full animate-pulse" />
        <div className="h-5 w-16 bg-[#21262d] rounded-full animate-pulse" />
      </div>
      <div className="h-4 w-3/4 bg-[#21262d] rounded animate-pulse mb-2" />
      <div className="h-3 w-full bg-[#21262d] rounded animate-pulse mb-1" />
      <div className="h-3 w-2/3 bg-[#21262d] rounded animate-pulse mb-4" />
      <div className="flex items-center justify-between">
        <div className="h-5 w-20 bg-[#21262d] rounded-full animate-pulse" />
        <div className="h-3 w-16 bg-[#21262d] rounded animate-pulse" />
      </div>
    </div>
  )
}