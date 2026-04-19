import Link from "next/link"

export default function Footer({ footerLinks = [], siteMeta }) {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-[#060a0f]/80">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-12 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-200/80">{siteMeta.shortName}</p>
          <h3 className="max-w-md text-2xl font-semibold text-white">{siteMeta.role}</h3>
          <p className="max-w-lg text-sm leading-7 text-slate-400">{siteMeta.about}</p>
          <p className="text-sm text-slate-500">&copy; {new Date().getFullYear()} {siteMeta.name}. All rights reserved.</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Navigate</h4>
          <div className="space-y-3">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="block text-sm text-slate-400 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-slate-300">Contact</h4>
          <div className="space-y-3 text-sm text-slate-400">
            <p>{siteMeta.email}</p>
            <p>{siteMeta.phone}</p>
            <p>{siteMeta.location}</p>
          </div>
          <div className="mt-5 flex gap-4">
            {siteMeta.socialLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-300 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
