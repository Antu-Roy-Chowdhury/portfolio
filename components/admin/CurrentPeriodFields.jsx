"use client"

import { useState } from "react"

export default function CurrentPeriodFields({
  kind = "date",
  defaultCurrent = false,
  defaultEnd = "",
  checkboxId,
  checkboxLabel,
}) {
  const [isCurrent, setIsCurrent] = useState(Boolean(defaultCurrent))
  const fieldLabel = kind === "year" ? "End year" : "End date"

  return (
    <>
      <label className="space-y-2">
        <span className="block text-sm text-slate-300">{fieldLabel}</span>
        <input
          name={kind === "year" ? "end_year" : "end_date"}
          type={kind === "year" ? "number" : "date"}
          min={kind === "year" ? 1900 : undefined}
          max={kind === "year" ? 2100 : undefined}
          defaultValue={isCurrent ? "" : defaultEnd}
          disabled={isCurrent}
          className="form-input disabled:cursor-not-allowed disabled:opacity-50"
        />
      </label>
      <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
        <input
          id={checkboxId}
          name="is_current"
          type="checkbox"
          checked={isCurrent}
          onChange={(event) => setIsCurrent(event.target.checked)}
        />
        <label htmlFor={checkboxId} className="text-sm text-slate-300">{checkboxLabel}</label>
      </div>
    </>
  )
}
