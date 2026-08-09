"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export default function AdminTabs({ initialTab, sections }) {
  const firstEnabledId = useMemo(() => sections.find((section) => !section.hidden)?.id || sections[0]?.id, [sections])
  const [activeTab, setActiveTab] = useState(initialTab || firstEnabledId)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const dirtyRef = useRef(false)

  useEffect(() => {
    const markDirty = (event) => {
      if (event.target.closest("form")?.dataset.adminEditor === "true") dirtyRef.current = true
    }
    const clearDirty = (event) => {
      if (event.target.dataset.adminEditor === "true") dirtyRef.current = false
    }
    const warn = (event) => {
      if (!dirtyRef.current) return
      event.preventDefault()
      event.returnValue = ""
    }
    document.addEventListener("input", markDirty)
    document.addEventListener("change", markDirty)
    document.addEventListener("submit", clearDirty)
    window.addEventListener("beforeunload", warn)
    return () => {
      document.removeEventListener("input", markDirty)
      document.removeEventListener("change", markDirty)
      document.removeEventListener("submit", clearDirty)
      window.removeEventListener("beforeunload", warn)
    }
  }, [])

  function handleTabChange(nextTab) {
    if (dirtyRef.current && !window.confirm("You have unsaved changes. Leave this editor tab?")) return
    dirtyRef.current = false
    setActiveTab(nextTab)
    const params = new URLSearchParams(searchParams.toString())
    params.set("tab", nextTab)
    params.delete("status")
    params.delete("message")
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="xl:sticky xl:top-8 xl:h-fit">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 backdrop-blur">
          <p className="section-kicker">Admin dashboard</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">Portfolio control room</h1>
          <p className="mt-2 text-sm text-slate-400">Choose a section from the left, like vertical browser tabs.</p>

          <nav className="mt-8 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleTabChange(section.id)}
                className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                  activeTab === section.id
                    ? "border-sky-300/25 bg-sky-300/10 text-white"
                    : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.id} hidden={section.id !== activeTab}>
            {section.content}
          </section>
        ))}
      </div>
    </div>
  )
}
