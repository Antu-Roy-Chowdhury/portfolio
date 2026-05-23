import Image from "next/image"
import SiteShell from "@/components/SiteShell"
import PageHeroGraphic from "@/components/PageHeroGraphic"
import SkillsBentoGrid from "@/components/skills/SkillsBentoGrid"
import { getCertifications, getSkillGroups } from "@/lib/portfolio-content"

export default async function SkillsPage() {
  const [certifications, skillGroups] = await Promise.all([getCertifications(), getSkillGroups()])

  return (
    <SiteShell>
      <section className="page-section">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="page-intro">
            <p className="section-kicker">Skills</p>
            <h1 className="page-title">A structured technical profile built from research, prototyping, and deployed work.</h1>
            <p className="page-copy">
              Instead of ranking tools with artificial percentages, this section highlights where my core toolset is strongest and where supporting familiarity helps me move across disciplines.
            </p>
          </div>
          <PageHeroGraphic
            eyebrow="Capability map"
            title="Grouped by engineering domain, then separated into core and supporting layers."
            points={["Research-backed tool choices", "Hover chips to see project evidence", "Built to show range without losing clarity"]}
            variant="stack"
          />
        </div>

        <div className="mt-14">
          <SkillsBentoGrid groups={skillGroups} />
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="panel">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Credentials</p>
              <h2 className="section-title mt-4">Coursework and certifications that support the practical work.</h2>
            </div>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">{certifications.length} credentials</p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-2">
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
