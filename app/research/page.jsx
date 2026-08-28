import Link from "next/link"
import PageHeroGraphic from "@/components/PageHeroGraphic"
import RecognitionGrid from "@/components/RecognitionGrid"
import ResearchCards from "@/components/research/ResearchCards"
import SiteShell from "@/components/SiteShell"
import { getAchievementItems, getResearchItems } from "@/lib/portfolio-content"

function FilterLink({ active, href, label }) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-4 py-2 text-sm transition ${
        active
          ? "border-[#7dd3fc]/55 bg-[rgba(125,211,252,0.18)] text-white shadow-[0_0_0_1px_rgba(125,211,252,0.28),0_0_26px_rgba(125,211,252,0.22)]"
          : "border-white/10 bg-transparent text-slate-300 hover:border-sky-300/25 hover:text-white"
      }`}
    >
      {label}
    </Link>
  )
}

export default async function ResearchPage({ searchParams }) {
  const [achievementItems, researchItems] = await Promise.all([getAchievementItems("research"), getResearchItems()])
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

          <ResearchCards items={filteredResearch} />
          {!filteredResearch.length ? (
            <div className="panel">
              <h2 className="panel-title">No matching research items</h2>
              <p className="mt-4 panel-copy">Try a different type or year filter to explore the full set.</p>
            </div>
          ) : null}
        </div>
      </section>

      <RecognitionGrid items={achievementItems} heading="Research-adjacent milestones, awards, and project highlights." />
    </SiteShell>
  )
}
