"use client"

import {
  BookOpen,
  Code2,
  Facebook,
  Github,
  Globe,
  GraduationCap,
  Instagram,
  Linkedin,
  MessageCircle,
  Radio,
  Twitter,
} from "lucide-react"

const SOCIAL_OPTIONS = [
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "google scholar", label: "Google Scholar", icon: GraduationCap },
  { value: "researchgate", label: "ResearchGate", icon: BookOpen },
  { value: "x", label: "X", icon: Twitter },
  { value: "codeforces", label: "Codeforces", icon: Code2 },
  { value: "reddit", label: "Reddit", icon: MessageCircle },
  { value: "github", label: "GitHub", icon: Github },
]

export default function SocialPlatformField({ defaultValue = "linkedin", name = "platform" }) {
  const normalizedValue = String(defaultValue || "linkedin").toLowerCase()

  return (
    <div className="space-y-3">
      <label className="block text-sm text-slate-300">Platform</label>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {SOCIAL_OPTIONS.map((option) => {
          const Icon = option.icon

          return (
            <label
              key={option.value}
              className="group flex cursor-pointer items-center gap-3 rounded-[1.15rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-300/30 hover:bg-white/8"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                defaultChecked={normalizedValue === option.value}
                className="sr-only"
              />
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-[#7dd3fc]">
                <Icon size={18} strokeWidth={1.9} />
              </span>
              <span>{option.label}</span>
            </label>
          )
        })}

        {!SOCIAL_OPTIONS.some((option) => option.value === normalizedValue) ? (
          <label className="flex cursor-pointer items-center gap-3 rounded-[1.15rem] border border-sky-300/25 bg-sky-300/10 px-4 py-3 text-sm text-slate-100">
            <input type="radio" name={name} value={normalizedValue} defaultChecked className="sr-only" />
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-300/20 bg-sky-300/10 text-[#7dd3fc]">
              <Globe size={18} strokeWidth={1.9} />
            </span>
            <span>{defaultValue}</span>
          </label>
        ) : null}
      </div>
      <p className="text-xs text-slate-500">The matching icon will be used across the site automatically.</p>
    </div>
  )
}
