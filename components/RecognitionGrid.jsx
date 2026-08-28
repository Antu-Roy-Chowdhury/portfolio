import Image from "next/image"

export default function RecognitionGrid({ items = [], heading = "Recognition", description }) {
  if (!items.length) return null

  return (
    <section className="page-section pt-0">
      <div className="panel">
        <p className="section-kicker">Recognition</p>
        <h2 className="section-title mt-4">{heading}</h2>
        {description ? <p className="mt-4 max-w-3xl panel-copy">{description}</p> : null}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {items.map((item) => (
            <article key={item.id || item.title} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/10">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
              </div>
              {item.image ? (
                <div className="relative h-52 overflow-hidden border-b border-white/10">
                  <Image src={item.image} alt={item.title} fill className="object-cover" />
                </div>
              ) : null}
              <div className="p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-sm text-sky-200/80">{item.meta}</p>
                  {item.date ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{item.date}</span> : null}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.text}</p>
                {item.tags?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{tag}</span>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
