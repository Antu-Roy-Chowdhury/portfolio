import SiteShell from "@/components/SiteShell"
import { getCertifications, getEducationItems, getExperienceItems, getSiteChrome } from "@/lib/portfolio-content"

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
        <div className="page-intro">
          <p className="section-kicker">About</p>
          <h1 className="page-title">A broader picture of who I am and how I work.</h1>
          <p className="page-copy">{siteMeta.about}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="panel space-y-5">
            <h2 className="panel-title">My approach</h2>
            <p className="panel-copy">
              I enjoy working where engineering, product thinking, and design meet. My best work usually starts with a clear problem,
              becomes sharper through iteration, and ends with a solution that feels calm and intentional for the user.
            </p>
            <p className="panel-copy">
              I am especially interested in projects that combine useful systems, meaningful interfaces, and real-world impact across
              web platforms, automation, and accessibility-focused technology.
            </p>
          </div>

          <div className="panel">
            <h2 className="panel-title">Quick facts</h2>
            <div className="mt-6 space-y-4 text-sm text-slate-300">
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-slate-500">Location</span>
                <span>{siteMeta.location}</span>
              </div>
              <div className="flex justify-between gap-4 border-b border-white/10 pb-3">
                <span className="text-slate-500">Focus</span>
                <span>Web, AI, design, engineering</span>
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
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel">
            <h2 className="panel-title">Experience timeline</h2>
            <div className="mt-8 space-y-6">
              {experienceItems.map((item) => (
                <div key={`${item.year}-${item.title}`} className="border-l border-white/10 pl-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">{item.year}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{item.org}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {educationItems.map((item) => (
              <div key={item.degree} className="panel">
                <h2 className="panel-title">Education</h2>
                <h3 className="mt-6 text-xl font-semibold text-white">{item.degree}</h3>
                <p className="mt-1 text-sm text-sky-200/80">{item.institution}</p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">{item.duration}</span>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">{item.result}</span>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}

            <div className="panel">
              <h2 className="panel-title">Certifications</h2>
              <div className="mt-6 space-y-5">
                {certifications.map((item) => (
                  <div key={item.credentialId} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                    <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-sky-200/80">{item.issuer}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.date} | Credential ID: {item.credentialId}</p>
                    <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm text-sky-200 transition hover:text-white">
                      Verify certificate
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
