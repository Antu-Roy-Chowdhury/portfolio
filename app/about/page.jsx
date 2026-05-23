import Image from "next/image"
import SiteShell from "@/components/SiteShell"
import PageHeroGraphic from "@/components/PageHeroGraphic"
import { getCertifications, getEducationItems, getExperienceItems, getSiteChrome } from "@/lib/portfolio-content"

function TimelineMarker({ open = false }) {
  return <span className={`absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 border-sky-300 ${open ? "bg-transparent" : "bg-sky-300"}`} />
}

export default async function AboutPage() {
  const [{ siteMeta }, certifications, educationItems, experienceItems] = await Promise.all([
    getSiteChrome(),
    getCertifications(),
    getEducationItems(),
    getExperienceItems(),
  ])

  return (
    <SiteShell>
      <section className="page-section">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="page-intro">
            <p className="section-kicker">About</p>
            <h1 className="page-title">A broader picture of who I am and how I work.</h1>
            <p className="page-copy">{siteMeta.about}</p>
          </div>
          <PageHeroGraphic
            eyebrow="Working style"
            title="Research-minded, product-aware, and comfortable across engineering layers."
            points={["Systems before noise", "Useful interfaces over decoration", "Academic depth with practical output"]}
            variant="flow"
          />
        </div>

        <div className="mt-14 grid items-start gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel space-y-5 self-start">
            <h2 className="panel-title">My approach</h2>
            <p className="panel-copy">
              I enjoy working where engineering, product thinking, and design meet. My best work usually starts with a clear problem,
              becomes sharper through iteration, and ends with a solution that feels calm and intentional for the user.
            </p>
            <p className="panel-copy">
              I am especially interested in projects that combine useful systems, meaningful interfaces, and real-world impact across
              web platforms, automation, accessibility-focused technology, and research-led prototyping.
            </p>
          </div>

          <div className="panel self-start">
            <h2 className="panel-title">Quick facts</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-slate-500">Location</span>
                <span>{siteMeta.location}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-slate-500">Focus</span>
                <span>Research systems, ML, embedded thinking</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-slate-500">Availability</span>
                <span>Open to opportunities</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-slate-500">Email</span>
                <span>{siteMeta.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="panel self-start">
            <h2 className="panel-title">Experience timeline</h2>
            <div className="mt-8 space-y-0">
              {experienceItems.map((item) => (
                <div
                  key={`${item.timeline}-${item.title}`}
                  className="relative pl-9 before:absolute before:left-[0.6rem] before:top-0 before:h-full before:w-px before:bg-white/10 last:before:h-10"
                >
                  <TimelineMarker open={item.isCurrent} />
                  <div className="pb-8 last:pb-0">
                    <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">{item.timeline || item.year}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">{item.org}</p>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 self-start">
            <div className="panel">
              <h2 className="panel-title">Education</h2>
              <div className="mt-8 space-y-0">
                {educationItems.map((item, index) => (
                  <div
                    key={`${item.degree}-${item.institution}-${index}`}
                    className="relative pl-9 before:absolute before:left-[0.6rem] before:top-0 before:h-full before:w-px before:bg-white/10 last:before:h-10"
                  >
                    <TimelineMarker />
                    <div className="pb-8 last:pb-0">
                      <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">{item.duration}</p>
                      <div className={`mt-4 grid gap-5 ${item.image ? "lg:grid-cols-[1fr_11rem]" : ""}`}>
                        <div>
                          <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                          <p className="mt-1 text-sm text-slate-300">{item.institution}</p>
                          <div className="mt-4 flex flex-wrap gap-3 text-sm">
                            <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">{item.result}</span>
                          </div>
                          {item.coreFocus ? (
                            <p className="mt-4 rounded-[1.25rem] border border-sky-300/15 bg-sky-300/5 px-4 py-3 text-sm leading-7 text-slate-300">
                              {item.coreFocus}
                            </p>
                          ) : null}
                          <p className="mt-5 text-sm leading-7 text-slate-400">{item.text}</p>
                        </div>

                        {item.image ? (
                          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] border border-white/10 bg-white/5">
                            <Image src={item.image} alt={item.degree} fill className="object-cover" />
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
            <div className="panel mt-10">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="section-kicker">Certificates</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Selected credentials</h2>
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{certifications.length} listed</p>
              </div>

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                {certifications.map((item) => (
                  <div key={item.credentialId} className="grid gap-4 rounded-[1.4rem] border border-white/10 bg-black/10 p-4 sm:grid-cols-[8rem_1fr] sm:items-center">
                    {item.image ? (
                      <div className="relative aspect-[4/3] overflow-hidden rounded-[1rem] border border-white/10 bg-white/5">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="flex aspect-[4/3] items-center justify-center rounded-[1rem] border border-dashed border-white/10 bg-white/[0.03] text-[11px] uppercase tracking-[0.22em] text-slate-500">
                        Certificate
                      </div>
                    )}

                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-sky-200/80">{item.issuer}</p>
                      <p className="mt-2 text-sm text-slate-400">
                        {item.date}
                        {item.credentialId ? ` | ID: ${item.credentialId}` : ""}
                      </p>
                      <a href={item.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-sm text-sky-200 transition hover:text-white">
                        Verify certificate
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
      </section>
    </SiteShell>
  )
}
