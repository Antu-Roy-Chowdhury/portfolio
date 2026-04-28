import Link from "next/link"
import {
  BookOpen,
  Code2,
  Facebook,
  FileText,
  Github,
  Globe,
  Instagram,
  Linkedin,
  MessageCircle,
  Twitter,
} from "lucide-react"
import Image from "next/image"
const socialIconMap = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  "google scholar": BookOpen,
  researchgate: FileText,
  x: Twitter,
  twitter: Twitter,
  codeforces: Code2,
  reddit: MessageCircle,
  github: Github,
}

function getSocialIcon(value) {
  return socialIconMap[value?.toLowerCase()] || Globe
}

export default function Footer({ footerLinks = [], siteMeta }) {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-[#060a0f]/80">
      <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-12 md:grid-cols-[1.3fr_0.8fr_1fr]">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-3">
            <Image src={siteMeta.logo} alt={siteMeta.shortName} width={179} height={45} className="w-auto h-8" /></Link>
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
          <div className="mt-5 flex flex-wrap gap-3">
            {siteMeta.socialLinks.map((item) => {
              const Icon = getSocialIcon(item.platform || item.iconName || item.label)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  title={item.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/20 bg-transparent text-[#7dd3fc] transition hover:-translate-y-0.5 hover:border-sky-300/35 hover:text-[#a5e6ff]"
                >
                  <Icon size={18} strokeWidth={1.9} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
