import Image from "next/image"
import Link from "next/link"
import PageHeroGraphic from "@/components/PageHeroGraphic"
import SiteShell from "@/components/SiteShell"
import { getAchievementItems, getResearchItems } from "@/lib/portfolio-content"

function FilterLink({ active, href, label }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-sky-300/30 bg-sky-300/10 text-sky-100"
          : "border-white/10 bg-transparent text-slate-300 hover:border-sky-300/25 hover:text-white"
      }`}
    >
      {label}
    </Link>
  )
}

export default async function ResearchPage({ searchParams }) {
  const [achievementItems, researchItems] = await Promise.all([getAchievementItems(), getResearchItems()])
  const params = await searchParams
  const activeType = params?.type || "All"
  const activeYear = params?.year || "All"
  const typeOptions = ["All", ...new Set(researchItems.map((item) => item.kind).filter(Boolean))]
  const yearOptions = ["All", ...new Set(researchItems.map((item) => item.year).filter(Boolean)).values()]
  const typeCounts = typeOptions
    .filter((type) => type !== "All")
    .map((type) => ({
      type,
      count: researchItems.filter((item) => item.kind === type).length,
    }))
    .filter((item) => item.count > 0)
  const filteredResearch = researchItems.filter((item) => {
    const typeMatch = activeType === "All" || item.kind === activeType
    const yearMatch = activeYear === "All" || String(item.year) === String(activeYear)
    return typeMatch && yearMatch
  })

  return (
    <SiteShell>
      <section className="page-section">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="page-intro">
            <p className="section-kicker">Research</p>
            <h1 className="page-title">Research interests rooted in machine learning, accessibility, and engineering systems.</h1>
            <p className="page-copy">
              My research work aims to connect technical depth with practical usefulness, especially where intelligent systems can improve human outcomes.
            </p>
          </div>
          <PageHeroGraphic
            eyebrow="Research map"
            title="Publications, ongoing investigations, and technical writing collected with more structure."
            points={["Filter by type and year", "Counts surface active research areas", "Visual cards keep the page from feeling flat"]}
            variant="orbit"
          />
        </div>

        <div className="mt-14 space-y-8">
          {typeCounts.length ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {typeCounts.map((item) => (
                <div key={item.type} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-200/75">{item.type}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{item.count}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {typeOptions.map((type) => (
                <FilterLink
                  key={type}
                  active={type === activeType}
                  href={type === "All" ? `/research${activeYear !== "All" ? `?year=${encodeURIComponent(activeYear)}` : ""}` : `/research?type=${encodeURIComponent(type)}${activeYear !== "All" ? `&year=${encodeURIComponent(activeYear)}` : ""}`}
                  label={type}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {yearOptions.map((year) => (
                <FilterLink
                  key={year}
                  active={String(year) === String(activeYear)}
                  href={year === "All" ? `/research${activeType !== "All" ? `?type=${encodeURIComponent(activeType)}` : ""}` : `/research?${activeType !== "All" ? `type=${encodeURIComponent(activeType)}&` : ""}year=${encodeURIComponent(year)}`}
                  label={year}
                />
              ))}
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            {filteredResearch.map((item) => (
              <article key={`${item.title}-${item.venue}`} className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#09111a]/92">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </div>
                {item.image ? (
                  <div className="relative h-52 overflow-hidden border-b border-white/10">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09111a] via-transparent to-transparent" />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">{item.venue}</p>
                    {item.year ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{item.year}</span> : null}
                    {item.kind ? <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">{item.kind}</span> : null}
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{item.title}</h2>
                  <p className="mt-4 panel-copy">{item.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {item.url && item.url !== "#" ? (
                    <a href={item.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-sm text-sky-200 transition hover:text-white">
                      Open publication
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
          {!filteredResearch.length ? (
            <div className="panel">
              <h2 className="panel-title">No matching research items</h2>
              <p className="mt-4 panel-copy">Try a different type or year filter to explore the full set.</p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="panel">
          <p className="section-kicker">Recognition</p>
          <h2 className="section-title mt-4">Research-adjacent milestones, awards, and project highlights.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {achievementItems.map((item) => (
              <div key={item.title} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/10">
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
                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
