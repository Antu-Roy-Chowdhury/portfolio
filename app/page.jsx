import Image from "next/image"
import Link from "next/link"
import RecognitionGrid from "@/components/RecognitionGrid"
import SiteShell from "@/components/SiteShell"
import { getHomeContent } from "@/lib/portfolio-content"
<meta name="google-site-verification" content="6ucf9Waw55dvsgAfqWAXzRxHfsrnWFajHQZjkQUileg" />
{/* <meta name="google-site-verification" content="DLkOFY-jUyuJxgULwkiJVd-LOrJJc6EKftkU_zwrYp0" /> */}
export default async function Home() {
  const { experiences, featuredProjects, featuredResearch, hero, highlightStats, recognitionItems, researchMetrics, siteMeta, skillGroups, strengths } = await getHomeContent()
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteMeta.name,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.anturoychowdhury.me",
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
<div className="space-y-6 sm:space-y-8">
  {/* Badge with live indicator dot */}
  <div className="inline-flex items-center gap-2 rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-sky-100/90 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.28em]">
    <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
    {hero.badge}
  </div>

  {/* Typography Block */}
  <div className="space-y-3 sm:space-y-5">
    <p className="text-xs uppercase tracking-[0.24em] text-slate-400 sm:text-sm sm:tracking-[0.32em]">
      Antu Roy Chowdhury
    </p>
    <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
      {hero.title}
    </h1>
    <p className="max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-8 md:text-lg">
      {hero.description}
    </p>
  </div>

  {/* Responsive Action Buttons */}
  <div className="flex flex-wrap items-center gap-3 pt-1 sm:gap-4 sm:pt-2">
    <Link
      href={hero.primaryButtonUrl}
      className="inline-flex items-center justify-center rounded-full bg-sky-300 px-5 py-2.5 text-xs font-semibold text-slate-950 transition-all hover:bg-sky-200 hover:shadow-lg hover:shadow-sky-300/20 active:scale-95 sm:px-6 sm:py-3 sm:text-sm sm:font-medium"
    >
      {hero.primaryButtonLabel}
    </Link>

    {hero.secondaryButtonUrl.startsWith("/") ? (
      <Link
        href={hero.secondaryButtonUrl}
        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
      >
        {hero.secondaryButtonLabel}
      </Link>
    ) : (
      <a
        href={hero.secondaryButtonUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95 sm:px-6 sm:py-3 sm:text-sm"
      >
        {hero.secondaryButtonLabel}
      </a>
    )}
  </div>
</div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
  {highlightStats.map((item) => (
    <div
      key={item.label}
      className="rounded-xl sm:rounded-3xl border border-white/10 bg-white/5 p-2 sm:p-5 backdrop-blur text-center sm:text-left flex flex-col justify-center"
    >
      <p className="text-sm sm:text-2xl font-bold tracking-tight text-white truncate">
        {item.value}
      </p>
      <p className="mt-0.5 sm:mt-2 text-[10px] leading-tight sm:text-sm text-slate-400 line-clamp-2">
        {item.label}
      </p>
    </div>
  ))}

  {researchMetrics.map((item) => (
    <div
      key={item.label}
      className="rounded-xl sm:rounded-3xl border border-white/10 bg-white/5 p-2 sm:p-6 backdrop-blur text-center sm:text-left flex flex-col justify-center"
    >
      <p className="text-base sm:text-3xl font-bold tracking-tight text-white truncate">
        {item.value}
      </p>
      <p className="mt-0.5 sm:mt-2 text-[10px] leading-tight sm:text-sm text-slate-400 line-clamp-2">
        {item.label}
      </p>
    </div>
  ))}
</div>
          </div>
          {/* Research Metrics Section */}
 

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
                src={hero.image}
                alt={siteMeta.name} 
                fill 
                className="object-cover object-top scale-[1]" 
                priority 
              />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="mx-auto max-w-[88rem] px-5 py-8" aria-labelledby="research-metrics-heading">
        <div className="mb-8">
          <p className="section-kicker">Research metrics</p>
          <h2 id="research-metrics-heading" className="section-title">A concise view of research reach and momentum.</h2>
        </div>
        
      </section> */}
<section className="mx-auto max-w-[88rem] px-4 py-6 sm:px-5 sm:py-8">
  <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
    {strengths.map((item) => (
      <article
        key={item.title}
        className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur-sm transition-all duration-300 hover:border-sky-400/20 hover:bg-[#0c1219] sm:rounded-[2rem] sm:p-8"
      >
        <div>
          {/* Strength Card Banner */}
          {item.image ? (
            <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl border border-white/10 sm:mb-6 sm:rounded-[1.25rem]">
              <Image
                src={item.image}
                alt={item.title || "Strength graphic"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          ) : null}

          <p className="text-[10px] uppercase tracking-[0.2em] text-sky-200/80 sm:text-sm sm:tracking-[0.28em]">
            Strength
          </p>

          <h2
            className="mt-1.5 line-clamp-2 text-xs font-semibold leading-snug text-white group-hover:text-sky-200 sm:mt-4 sm:text-2xl sm:leading-tight"
            title={item.title}
          >
            {item.title}
          </h2>

          <p
            className="mt-1.5 line-clamp-3 text-[11px] leading-relaxed text-slate-400 sm:mt-4 sm:text-sm sm:leading-7"
            title={item.description}
          >
            {item.description}
          </p>
        </div>
      </article>
    ))}
  </div>
</section>
<section className="mx-auto max-w-[88rem] px-4 py-12 sm:px-5 sm:py-20">
  <div className="mb-6 flex flex-col gap-3 sm:mb-10 sm:gap-4 md:flex-row md:items-end md:justify-between">
    <div>
      <p className="section-kicker">Selected Work</p>
      <h2 className="section-title text-xl sm:text-3xl lg:text-4xl">
        A portfolio built across web, AI, automation, and engineering.
      </h2>
    </div>
    <Link
      href="/projects"
      className="text-xs font-medium text-sky-200 transition hover:text-white sm:text-sm"
    >
      See all projects &rarr;
    </Link>
  </div>

  <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
    {featuredProjects.map((project) => (
      <article
        key={project.id}
        className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0c1219]/90 sm:rounded-[2rem]"
      >
        <div>
          {/* Image Container scaled for mobile 2-col */}
          <div className="relative h-28 overflow-hidden sm:h-56">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1219] via-[#0c1219]/20 to-transparent" />
          </div>

          {/* Content Body */}
          <div className="space-y-2 p-3 sm:space-y-4 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-3">
              <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-sky-100 sm:px-3 sm:py-1 sm:text-xs sm:tracking-[0.24em]">
                {project.category}
              </span>
              <span className="text-[10px] text-slate-500 sm:text-xs">
                {project.timeline}
              </span>
            </div>

            <h3
              className="line-clamp-2 text-sm font-semibold leading-snug text-white sm:text-2xl sm:leading-tight"
              title={project.title}
            >
              {project.title}
            </h3>

            <p
              className="line-clamp-2 text-xs leading-relaxed text-slate-400 sm:text-sm sm:leading-7"
              title={project.summary}
            >
              {project.summary}
            </p>

            {/* Tech badges hidden on small screens to prevent card bloating */}
            <div className="hidden flex-wrap gap-2 sm:flex">
              {project.tech.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Link pinned to card bottom */}
        <div className="p-3 pt-0 sm:p-6 sm:pt-0">
          <Link
            href={`/projects/${project.id}`}
            className="inline-flex text-xs font-medium text-sky-200 transition hover:text-white sm:text-sm"
          >
            View Project &rarr;
          </Link>
        </div>
      </article>
    ))}
  </div>
</section>

      {featuredResearch.length ? (
        <section className="mx-auto max-w-[88rem] px-5 pb-20">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-kicker">Selected Research</p>
              <h2 className="section-title">Featured publications and research work.</h2>
            </div>
            <Link href="/research" className="text-sm text-sky-200 transition hover:text-white">
              See all research
            </Link>
          </div>

<div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
  {featuredResearch.map((research) => (
    <article
      key={research.id || research.title}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl sm:rounded-[2rem] border border-white/10 bg-[#0c1219]/90"
    >
      <div>
        {research.image ? (
          <div className="relative h-28 sm:h-56 overflow-hidden">
            <Image
              src={research.image}
              alt={research.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1219] via-[#0c1219]/20 to-transparent" />
          </div>
        ) : (
          <div className="flex h-28 sm:h-56 items-end bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.18),transparent_45%),linear-gradient(135deg,#0e1a27,#081019)] p-3 sm:p-6">
            <p className="max-w-xs text-[10px] sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.28em] text-sky-200/70 truncate">
              {research.venue}
            </p>
          </div>
        )}

        <div className="space-y-2 sm:space-y-4 p-3 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-3">
            <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs uppercase tracking-wider text-sky-100">
              {research.kind}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-500">
              {research.year || research.status}
            </span>
          </div>

          <h3 className="line-clamp-2 text-sm sm:text-2xl font-semibold leading-snug sm:leading-tight text-white" title={research.title}>
            {research.title}
          </h3>

          <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed sm:leading-7 text-slate-400" title={research.summary}>
            {research.summary}
          </p>

          <div className="hidden sm:flex flex-wrap gap-2">
            {research.tags?.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-3 pt-0 sm:p-6 sm:pt-0">
        {research.paperUrl ? (
          <a
            href={research.paperUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-xs sm:text-sm font-medium text-sky-200 transition hover:text-white"
          >
            Read paper &rarr;
          </a>
        ) : (
          <Link
            href="/research"
            className="inline-flex text-xs sm:text-sm font-medium text-sky-200 transition hover:text-white"
          >
            View research &rarr;
          </Link>
        )}
      </div>
    </article>
  ))}
</div>
        </section>
      ) : null}

<section className="mx-auto max-w-[88rem] px-4 pb-12 sm:px-5 sm:pb-20">
  <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
    {/* Left Panel: Experience */}
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
      <div className="flex items-center justify-between">
        <p className="section-kicker text-xs font-semibold uppercase tracking-wider text-sky-400 sm:text-sm">
          Experience
        </p>
        <span className="hidden h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400/80 sm:inline-block" />
      </div>

      <div className="mt-4 space-y-0 sm:mt-8">
        {experiences.map((item) => (
          <div
            key={`${item.year}-${item.title}`}
            className="relative pl-6 before:absolute before:left-[0.45rem] before:top-0 before:h-full before:w-px before:bg-white/10 last:before:h-6 sm:pl-9 sm:before:left-[0.6rem] sm:last:before:h-10"
          >
            {/* Timeline bullet scaled for mobile & desktop */}
            <span
              className={`absolute left-0 top-1 h-3.5 w-3.5 rounded-full border-2 border-sky-300 sm:top-1.5 sm:h-5 sm:w-5 ${
                item.isCurrent ? "bg-transparent" : "bg-sky-300"
              }`}
            />
            <div className="pb-5 last:pb-0 sm:pb-8">
              <p className="text-[10px] uppercase tracking-[0.2em] text-sky-200/70 sm:text-xs sm:tracking-[0.24em]">
                {item.year}
              </p>
              <h3 className="mt-1 text-sm font-semibold text-white sm:mt-2 sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-slate-300 sm:mt-1 sm:text-sm">
                {item.org}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-slate-400 sm:mt-3 sm:text-sm sm:leading-7">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Right Panel: Skills Snapshot */}
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm sm:rounded-[2rem] sm:p-8">
      <div className="flex items-center justify-between">
        <p className="section-kicker text-xs font-semibold uppercase tracking-wider text-sky-400 sm:text-sm">
          Skills Snapshot
        </p>
        <span className="hidden h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400/80 sm:inline-block" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-5">
        {skillGroups.map((group) => {
          const skills = [...(group.core || []), ...(group.familiar || [])].slice(0, 4);

          return (
            <div
              key={group.key || group.title}
              className="group flex flex-col justify-between rounded-xl border border-white/10 bg-[#0c1219]/80 p-3 transition-all duration-300 hover:border-sky-400/30 hover:bg-[#0c1219] sm:rounded-[1.5rem] sm:p-5"
            >
              <div>
                <h3 className="truncate text-xs font-semibold text-white transition-colors group-hover:text-sky-200 sm:text-base">
                  {group.title}
                </h3>

                {group.description && (
                  <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-400 sm:mt-2 sm:text-xs sm:leading-6">
                    {group.description}
                  </p>
                )}
              </div>

              <div className="mt-3 flex flex-wrap gap-1 sm:mt-4 sm:gap-2">
                {skills.map((item) => (
                  <span
                    key={item.id || item.name}
                    className="rounded-md border border-white/5 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-300 transition-colors group-hover:border-sky-300/20 group-hover:text-sky-100 sm:rounded-full sm:px-3 sm:py-1 sm:text-xs"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
</section>
      <RecognitionGrid items={recognitionItems} heading="Selected awards, leadership milestones, and recognitions." />
    </SiteShell>
  )
}
