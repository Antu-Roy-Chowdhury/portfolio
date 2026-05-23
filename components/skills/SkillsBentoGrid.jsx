"use client"

import { useState } from "react"

function SkillChip({ item, premium = false }) {
  const [open, setOpen] = useState(false)
  const hasProof = item.appliedIn?.length

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <button
        type="button"
        className={
          premium
            ? "rounded-full border border-white/12 bg-white/[0.08] px-4 py-2 text-sm text-slate-100 transition hover:border-sky-300/30 hover:bg-white/[0.12]"
            : "text-left text-sm text-slate-400 transition hover:text-slate-200"
        }
      >
        {item.name}
      </button>

      {hasProof && open ? (
        <div className="pointer-events-none absolute left-[100%+calc(0.7rem)] top-[calc(0.7rem)+100%] z-20 min-w-[15rem] rounded-[1.1rem] border border-[#141C23] bg-[#0f171c] px-4 py-3 text-xs leading-6 text-slate-200 shadow-[0_18px_50px_rgba(0,0,0,0.35)]">
          <p className="text-[11px] uppercase tracking-[0.22em] text-sky-200/80">Applied in</p>
          <p className="mt-1">{item.appliedIn.join(", ")}</p>
        </div>
      ) : null}
    </div>
  )
}

export default function SkillsBentoGrid({ groups = [] }) {
  return (
    <div className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-4">
      {groups.map((group) => (
        <article key={group.key || group.title} className="panel overflow-visible">
          <p className="section-kicker">{group.title}</p>
          <p className="mt-4 text-sm leading-7 text-slate-400">{group.description}</p>

          <div className="mt-7 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Core toolset</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {group.core?.map((item) => (
                  <SkillChip key={item.id || item.name} item={item} premium />
                ))}
              </div>
            </div>

            {group.familiar?.length ? (
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Familiar / secondary</p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-3">
                  {group.familiar.map((item) => (
                    <SkillChip key={item.id || item.name} item={item} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}
