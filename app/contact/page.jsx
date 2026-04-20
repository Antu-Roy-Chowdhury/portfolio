import SiteShell from "@/components/SiteShell"
import ContactForm from "@/components/contact/ContactForm"
import { getContactContent } from "@/lib/portfolio-content"

export default async function ContactPage() {
  const { description, heading, siteMeta } = await getContactContent()

  return (
    <SiteShell>
      <section className="page-section">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="page-intro max-w-none">
            <p className="section-kicker">Contact</p>
            <h1 className="page-title">{heading}</h1>
            <p className="page-copy">{description}</p>

            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <p>Email: {siteMeta.email}</p>
              <p>Phone: {siteMeta.phone}</p>
              <p>Location: {siteMeta.location}</p>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Social tree</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {siteMeta.socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <h2 className="panel-title">Send a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
