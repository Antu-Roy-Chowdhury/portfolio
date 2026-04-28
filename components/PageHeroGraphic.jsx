export default function PageHeroGraphic({ eyebrow = "Overview", title, points = [], variant = "grid" }) {
  const variantClasses = {
    grid: "from-sky-400/18 via-cyan-300/6 to-transparent",
    orbit: "from-fuchsia-400/12 via-sky-300/10 to-transparent",
    stack: "from-emerald-300/12 via-sky-300/10 to-transparent",
    flow: "from-sky-300/16 via-white/5 to-transparent",
  }

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#081019]/88 p-6 shadow-[0_24px_90px_rgba(0,0,0,0.24)]">
      <div className={`absolute inset-0 bg-gradient-to-br ${variantClasses[variant] || variantClasses.grid}`} />
      <div className="absolute -right-12 top-8 h-36 w-36 rounded-full border border-sky-300/15" />
      <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-sky-300/10 blur-2xl" />

      <div className="relative rounded-[1.6rem] border border-white/10 bg-[#09121c]/92 p-5">
        <div className="mb-5 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-sky-100/75">{eyebrow}</p>
        <h2 className="mt-4 max-w-sm text-2xl font-semibold leading-tight text-white">{title}</h2>
        <div className="mt-6 space-y-3">
          {points.map((point) => (
            <div key={point} className="flex items-center gap-3 rounded-[1.1rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
              <span className="h-2 w-2 rounded-full bg-[#7dd3fc]" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
