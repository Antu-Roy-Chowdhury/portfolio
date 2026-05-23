import Image from "next/image"
import Link from "next/link"
import SiteShell from "@/components/SiteShell"
import { getHomeContent } from "@/lib/portfolio-content"

export default async function Home() {
  const { experiences, featuredProjects, hero, highlightStats, siteMeta, skillGroups, strengths } = await getHomeContent()
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMeta.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://anturoychowdhury.vercel.app",
    image: siteMeta.portrait,
    jobTitle: "Research-oriented software developer",
    alumniOf: "Rajshahi University of Engineering and Technology",
    email: siteMeta.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rajshahi",
      addressCountry: "Bangladesh",
    },
    sameAs: siteMeta.socialLinks?.map((item) => item.href).filter(Boolean),
  }

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[88rem] items-center px-5 pb-16 pt-10">
        <div className="grid w-full gap-12 lg:grid-cols-[1.25fr_0.75fr] lg:items-center xl:gap-20">
          <div className="order-2 space-y-8 lg:order-1">
            <div className="inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-100/90">
              {hero.badge}
            </div>
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Antu Roy Chowdhury</p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-white md:text-7xl">
                {hero.title}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">{hero.description}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href={hero.primaryButtonUrl} className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                {hero.primaryButtonLabel}
              </Link>
              <Link
                href={hero.secondaryButtonUrl}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {hero.secondaryButtonLabel}
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {highlightStats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* <div className="order-1 relative mx-auto w-full max-w-[17rem] sm:max-w-[21rem] lg:order-2 lg:max-w-[29rem] xl:max-w-[32rem]">
            <div className="absolute inset-x-8 bottom-2 top-10 rounded-full bg-sky-300/10 blur-3xl" />
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-[8%] rounded-full border border-sky-300/20" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-full">
              <Image src={siteMeta.portrait} alt={siteMeta.name} fill className="object-contain object-top scale-[1.04]" priority />
            </div>
          </div> */}
          <div className="order-1 relative mx-auto w-full max-w-[17rem] sm:max-w-[21rem] lg:order-2 lg:max-w-[29rem] xl:max-w-[32rem]">
            {/* The "Glow" behind the image */}
            <div className="absolute inset-x-8 bottom-2 top-10 rounded-full bg-sky-300/15 blur-3xl" />
            {/* The Main Oval Container */}
            <div className="relative aspect-[5/6] overflow-hidden rounded-full shadow-xl">
              <Image 
                src={siteMeta.portrait} 
                alt={siteMeta.name} 
                fill 
                className="object-cover object-top scale-[1]" 
                priority 
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {strengths.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="text-sm uppercase tracking-[0.28em] text-sky-200/80">Strength</p>
              <h2 className="mt-4 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 py-20">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Selected Work</p>
            <h2 className="section-title">A portfolio built across web, AI, automation, and engineering.</h2>
          </div>
          <Link href="/projects" className="text-sm text-sky-200 transition hover:text-white">
            See all projects
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article key={project.id} className="group overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c1219]/90">
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1219] via-[#0c1219]/20 to-transparent" />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-sky-100">
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-500">{project.timeline}</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm leading-7 text-slate-400">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <Link href={`/projects/${project.id}`} className="inline-flex text-sm text-sky-200 transition hover:text-white">
                  View case study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[88rem] px-5 pb-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="section-kicker">Experience</p>
            <div className="mt-8 space-y-0">
              {experiences.map((item) => (
                <div
                  key={`${item.year}-${item.title}`}
                  className="relative pl-9 before:absolute before:left-[0.6rem] before:top-0 before:h-full before:w-px before:bg-white/10 last:before:h-10"
                >
                  <span
                    className={`absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-sky-300 ${
                      item.isCurrent ? "bg-transparent" : "bg-sky-300"
                    }`}
                  />
                  <div className="pb-8 last:pb-0">
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">{item.year}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{item.org}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <p className="section-kicker">Skills Snapshot</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.key || group.title} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                  <h3 className="text-lg font-semibold text-white">{group.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{group.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {[...(group.core || []), ...(group.familiar || [])].slice(0, 4).map((item) => (
                      <span key={item.id || item.name} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
