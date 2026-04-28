import SiteShell from "@/components/SiteShell"
import PageHeroGraphic from "@/components/PageHeroGraphic"
import { getCertifications, getSkillGroups } from "@/lib/portfolio-content"

export default async function SkillsPage() {
  const [certifications, skillGroups] = await Promise.all([getCertifications(), getSkillGroups()])

  return (
    <SiteShell>
      <section className="page-section">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="page-intro">
            <p className="section-kicker">Skills</p>
            <h1 className="page-title">A technical stack shaped by product work, engineering curiosity, and design care.</h1>
            <p className="page-copy">
              I work across frontend, backend, machine learning, and design, choosing tools based on the problem rather than chasing trends.
            </p>
          </div>
          <PageHeroGraphic
            eyebrow="Stack snapshot"
            title="Versatility matters most when the tools stay grounded in the problem."
            points={["Frontend and interface craft", "Backend and data systems", "Research and machine learning"]}
            variant="stack"
          />
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="panel">
              <h2 className="panel-title">{group.title}</h2>
              <p className="mt-4 panel-copy">{group.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="panel">
          <p className="section-kicker">Credentials</p>
          <h2 className="section-title mt-4">Learning that supports the work.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {certifications.map((item) => (
              <div key={item.credentialId} className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/10">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-5 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-sky-200/80">{item.issuer}</p>
                  <p className="mt-3 text-sm text-slate-400">{item.date} | Credential ID: {item.credentialId}</p>
                  <a href={item.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm text-sky-200 transition hover:text-white">
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
