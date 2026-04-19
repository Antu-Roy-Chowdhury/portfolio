import Image from "next/image"
import Link from "next/link"
import SiteShell from "@/components/SiteShell"
import { getProjects } from "@/lib/portfolio-content"

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <SiteShell>
      <section className="page-section">
        <div className="page-intro">
          <p className="section-kicker">Projects</p>
          <h1 className="page-title">Selected work across product, ML, scraping, and systems thinking.</h1>
          <p className="page-copy">
            These projects show the range of my work, from full-stack products to machine learning applications and engineering-led builds.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
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
                  <span className="text-xs text-slate-500">{project.timeline}</span>
                </div>
                <h2 className="text-2xl font-semibold text-white">{project.title}</h2>
                <p className="text-sm leading-7 text-slate-400">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link href={`/projects/${project.id}`} className="text-sm text-sky-200 transition hover:text-white">
                    View details
                  </Link>
                  {project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="text-sm text-slate-300 transition hover:text-white">
                      GitHub
                    </a>
                  )}
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="text-sm text-slate-300 transition hover:text-white">
                      Live site
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  )
}
