import Image from "next/image"

export default function RecognitionGrid({ items = [], heading = "Recognition", description }) {
  if (!items.length) return null

  return (
<section className="page-section pt-0">
  <div className="panel p-4 sm:p-8">
    <p className="section-kicker">Recognition</p>
    <h2 className="section-title mt-2 text-xl sm:mt-4 sm:text-3xl lg:text-4xl">
      {heading}
    </h2>
    {description ? (
      <p className="mt-2 max-w-3xl text-xs sm:mt-4 sm:text-sm panel-copy">
        {description}
      </p>
    ) : null}

    <div className="mt-6 sm:mt-10 grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.id || item.title}
          className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/10 transition-all duration-300 hover:border-sky-400/20 sm:rounded-[1.5rem]"
        >
          <div>
            {/* Window Controls Header */}
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/5 px-3 py-2 sm:gap-2 sm:px-5 sm:py-3">
              <span className="h-1.5 w-1.5 rounded-full bg-rose-300/80 sm:h-2.5 sm:w-2.5" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-300/80 sm:h-2.5 sm:w-2.5" />
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/80 sm:h-2.5 sm:w-2.5" />
            </div>

            {/* Certificate/Recognition Image */}
            {item.image ? (
              <div className="relative h-28 w-full border-b border-white/10 overflow-hidden sm:h-64">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ) : null}

            {/* Content Body */}
            <div className="p-3 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-3">
                <p className="truncate text-[10px] font-medium text-sky-200/80 sm:text-sm">
                  {item.meta}
                </p>
                {item.date ? (
                  <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-400 sm:px-3 sm:py-1 sm:text-xs">
                    {item.date}
                  </span>
                ) : null}
              </div>

              <h3
                className="mt-1.5 line-clamp-2 text-xs font-semibold leading-snug text-white sm:mt-3 sm:text-xl sm:leading-tight"
                title={item.title}
              >
                {item.title}
              </h3>

              <p
                className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-slate-400 sm:mt-4 sm:text-sm sm:leading-7"
                title={item.text}
              >
                {item.text}
              </p>

              {/* Tags visible on desktop, hidden on compact mobile view to prevent overflowing */}
              {item.tags?.length ? (
                <div className="mt-3 hidden flex-wrap gap-2 sm:mt-5 sm:flex">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
</section>
  )
}
