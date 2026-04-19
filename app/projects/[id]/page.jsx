import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import SiteShell from "@/components/SiteShell"
import { getProjects } from "@/lib/portfolio-content"

export default async function ProjectPage({ params }) {
  const { id } = await params
  const projects = await getProjects()
  const project = projects.find((item) => item.id === id)

  if (!project) {
    notFound()
  }

  return (
    <SiteShell>
      <section className="page-section">
        <Link href="/projects" className="text-sm text-sky-200 transition hover:text-white">
          Back to projects
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="section-kicker">{project.category}</p>
            <h1 className="page-title mt-4">{project.title}</h1>
            <p className="page-copy mt-5">{project.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noreferrer" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                  GitHub
                </a>
              )}
              {project.live !== "#" && (
                <a href={project.live} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                  Live site
                </a>
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1219]/90">
            <div className="relative aspect-[4/3]">
              <Image src={project.image} alt={project.title} fill className="object-cover" />
            </div>
            <div className="space-y-3 p-6">
              <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                <span>Timeline</span>
                <span>{project.timeline}</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-sm text-slate-400">
                <span>Status</span>
                <span>{project.timeline === "Ongoing" ? "In progress" : "Completed"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 panel">
          <h2 className="panel-title">Project overview</h2>
          <p className="mt-6 panel-copy">
            {project.summary} This project reflects my interest in combining practical implementation with clear user value, whether
            through interface design, backend structure, or research-driven experimentation.
          </p>
        </div>
      </section>
    </SiteShell>
  )
}
