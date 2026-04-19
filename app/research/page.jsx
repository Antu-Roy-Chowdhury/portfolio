import SiteShell from "@/components/SiteShell"
import { getAchievementItems, getResearchItems } from "@/lib/portfolio-content"

export default async function ResearchPage() {
  const [achievementItems, researchItems] = await Promise.all([getAchievementItems(), getResearchItems()])

  return (
    <SiteShell>
      <section className="page-section">
        <div className="page-intro">
          <p className="section-kicker">Research</p>
          <h1 className="page-title">Research interests rooted in machine learning, accessibility, and engineering systems.</h1>
          <p className="page-copy">
            My research work aims to connect technical depth with practical usefulness, especially where intelligent systems can improve human outcomes.
          </p>
        </div>

        <div className="mt-14 space-y-6">
          {researchItems.map((item) => (
            <article key={item.title} className="panel">
              <p className="text-xs uppercase tracking-[0.24em] text-sky-200/70">{item.venue}</p>
              <h2 className="mt-3 text-2xl font-semibold text-white">{item.title}</h2>
              <p className="mt-4 panel-copy">{item.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section pt-0">
        <div className="panel">
          <p className="section-kicker">Recognition</p>
          <h2 className="section-title mt-4">A few milestones beyond project delivery.</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {achievementItems.map((item) => (
              <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-6">
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-sky-200/80">{item.meta}</p>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
