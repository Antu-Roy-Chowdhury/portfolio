import Link from "next/link"
import SiteShell from "@/components/SiteShell"
import { getAchievementItems, getResearchItems } from "@/lib/portfolio-content"

function FilterLink({ active, href, label }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-sky-300/30 bg-sky-300/10 text-sky-100"
          : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
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
  const filteredResearch = researchItems.filter((item) => {
    const typeMatch = activeType === "All" || item.kind === activeType
    const yearMatch = activeYear === "All" || String(item.year) === String(activeYear)
    return typeMatch && yearMatch
  })

  return (
    <SiteShell>
      <section className="page-section">
        <div className="page-intro">
          <p className="section-kicker">Research</p>
          <h1 className="page-title">Research interests rooted in machine learning, accessibility, and engineering systems.</h1>
          <p className="page-copy">
            My research work aims to connect technical depth with practical usefulness, especially where intelligent systems can improve human outcomes.
          </p>
        </div>

        <div className="mt-14 space-y-8">
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

          <div className="space-y-6">
            {filteredResearch.map((item) => (
              <article key={`${item.title}-${item.venue}`} className="panel">
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="panel">
          <p className="section-kicker">Recognition</p>
          <h2 className="section-title mt-4">A few milestones beyond project delivery.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {achievementItems.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-sky-200/80">{item.meta}</p>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
