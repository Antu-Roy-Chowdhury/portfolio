import Image from "next/image"
import Link from "next/link"
import PageHeroGraphic from "@/components/PageHeroGraphic"
import SiteShell from "@/components/SiteShell"
import { getProjects } from "@/lib/portfolio-content"

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

export default async function ProjectsPage({ searchParams }) {
  const projects = await getProjects()
  const params = await searchParams
  const activeCatagory = params?.category || "All"
  const activeTag = params?.tag || "All"
  const catOptions = ["All", ...new Set(projects.flatMap((project) => project.category || []))]
  const tagOptions = ["All", ...new Set(projects.flatMap((project) => project.tech || []))]
  const filteredProjects = projects.filter((project) => {
    const categoryMatch = activeCatagory === "All" ? true : (project.category || []).includes(activeCatagory)
    const tagMatch = activeTag === "All" ? true : (project.tech || []).includes(activeTag)
    return categoryMatch && tagMatch
  })

  return (
    <SiteShell>
      <section className="page-section">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="page-intro">
            <p className="section-kicker">Projects</p>
            <h1 className="page-title">Selected work across product, ML, scraping, and systems thinking.</h1>
            <p className="page-copy">
              These projects show the range of my work, from full-stack products to machine learning applications and engineering-led builds.
            </p>
          </div>
          <PageHeroGraphic
            eyebrow="Project lens"
            title="I tend to move between product delivery, research-driven builds, and practical systems."
            points={["Tag filters for stack discovery", "Case-study oriented cards", "Built to scale as the portfolio grows"]}
            variant="grid"
          />
        </div>

        <div className="mt-14 space-y-8">
          <div className="flex flex-wrap gap-3">
            {catOptions.map((category) => (
              <FilterLink key={category} active={category === activeCatagory} href={category === "All" ? `/projects${activeTag !== "All" ? `?tag=${encodeURIComponent(activeTag)}` : ""}` : `/projects?category=${encodeURIComponent(category)}${activeTag !== "All" ? `&tag=${encodeURIComponent(activeTag)}` : ""}`} label={category} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {tagOptions.map((tag) => (
              <FilterLink key={tag} active={tag === activeTag} href={tag === "All" ? `/projects${activeCatagory !== "All" ? `?category=${encodeURIComponent(activeCatagory)}` : ""}` : `/projects?${activeCatagory !== "All" ? `category=${encodeURIComponent(activeCatagory)}&` : ""}tag=${encodeURIComponent(tag)}`} label={tag} />
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProjects.map((project) => (
              <article key={project.id} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1219]/90">
                <div className="relative h-64 overflow-hidden">
                  <Image src={project.image} alt={project.title} fill className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c1219] via-[#0c1219]/20 to-transparent" />
                </div>
                <div className="space-y-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-100">
                      {project.category}
                    </span>
                    
                  </div>
                  <h2 className="text-2xl font-semibold text-white"><Link href={`/projects/${project.id}`}>{project.title}</Link></h2>
                  <p className="text-sm leading-7 text-slate-400">{project.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link href={`/projects/${project.id}`} className="rounded-full bg-sky-300 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                      View details
                    </Link>
                    {project.github !== "#" && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                        GitHub
                      </a>
                    )}
                    {project.live !== "#" && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10">
                        Live site
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {!filteredProjects.length ? (
            <div className="panel">
              <h2 className="panel-title">No matching projects</h2>
              <p className="mt-4 panel-copy">Try a different category or tag filter to see more work.</p>
            </div>
          ) : null}
        </div>
      </section>
    </SiteShell>
  )
}
