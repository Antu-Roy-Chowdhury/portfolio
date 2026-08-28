"use client"

import Image from "next/image"
import { useMemo, useState } from "react"

function PaperActions({ item, compact = false }) {
  const paperUrl = item.paperUrl || item.url
  const buttonClass = compact
    ? "rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
    : "rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
  const primaryClass = compact
    ? "rounded-full bg-sky-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-200"
    : "rounded-full bg-sky-300 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200"

  return (
    <>
      {paperUrl && paperUrl !== "#" ? (
        <a href={paperUrl} target="_blank" rel="noreferrer" className={buttonClass}>Paper URL</a>
      ) : (
        <span aria-disabled="true" className={`${buttonClass} cursor-not-allowed opacity-45`}>Not published yet</span>
      )}
      {item.pdfUrl ? (
        <>
          <a href={item.pdfUrl} target="_blank" rel="noreferrer" className={primaryClass}>View Paper</a>
          <a href={`/api/research/${encodeURIComponent(item.id)}/pdf`} className={buttonClass}>Download PDF</a>
        </>
      ) : null}
      {item.codeUrl && item.codeUrl !== "#" ? (
        <a href={item.codeUrl} target="_blank" rel="noreferrer" className={buttonClass}>Code / GitHub</a>
      ) : null}
    </>
  )
}

export default function ResearchCards({ items = [] }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const activeItem = useMemo(() => (activeIndex === null ? null : items[activeIndex] || null), [activeIndex, items])

  return (
    <>
      <div className="grid gap-6 xl:grid-cols-2">
        {items.map((item, index) => {
          const hasImage = Boolean(item.image)

          return (
            <article key={`${item.title}-${item.venue}`} className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#09111a]/92">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">{item.venue}</p>
                      {item.year ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{item.year}</span> : null}
                      {item.kind ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{item.kind}</span> : null}
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{item.citationCount || 0} citations</span>
                    </div>
                    <h2 className="text-2xl font-semibold leading-tight text-white">{item.title}</h2>
                    {item.authors ? <p className="text-sm leading-7 text-slate-400">{item.authors}</p> : null}
                  </div>
                </div>

                <div className={`mt-5 grid gap-5 ${hasImage ? "lg:grid-cols-[1.5fr_1fr]" : ""}`}>
                  <div className="min-w-0">
                    {/* paragraph will be center aligned */}
                    <p className="text-sm leading-8 text-slate-300 text-justify">{item.summary.slice(0, 270)}...</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.slice(0, 4).map((tag) => ( 
                        <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>

                  </div>

                  {hasImage ? (
                    <button
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className="group relative h-full min-h-[13.75rem] overflow-hidden rounded-[1.35rem] border border-white/10 bg-white/5 text-left"
                    >
                      <Image src={item.image} alt={item.title} fill className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.03]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#09111a]/70 via-transparent to-transparent" />
                    </button>
                  ) : null}
                </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className="rounded-full bg-sky-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-200"
                      >
                        View details
                      </button>
                      <PaperActions item={item} compact />
                    </div>
              </div>
            </article>
          )
        })}
      </div>

      {activeItem ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#02050a]/80 px-4 py-8 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#071019] shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-5 top-5 z-10 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-white transition hover:bg-black/50"
            >
              Close
            </button>
        
            <div className="overflow-y-auto p-6 md:p-8">
              <div className={`grid gap-8 ${activeItem.image ? "lg:grid-cols-[1.6fr_0.9fr]" : ""}`}>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-100">
                      {activeItem.kind}
                    </span>
                    {activeItem.year ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{activeItem.year}</span> : null}
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{activeItem.venue}</span>
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{activeItem.citationCount || 0} citations</span>
                  </div>
                  <h2 className="mt-5 text-3xl font-semibold leading-tight text-white md:text-4xl">{activeItem.title}</h2>
                  {activeItem.authors ? <p className="mt-4 text-sm leading-7 text-slate-400">{activeItem.authors}</p> : null}
                  <p className="mt-6 text-sm leading-8 text-slate-300">{activeItem.abstract}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {activeItem.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {activeItem.image ? (
                  <div className="relative max-h-[40rem] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5">
                    <Image src={activeItem.image} alt={activeItem.title} fill className="object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071019] via-transparent to-transparent" />
                  </div>
                ) : null}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <PaperActions item={activeItem} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
