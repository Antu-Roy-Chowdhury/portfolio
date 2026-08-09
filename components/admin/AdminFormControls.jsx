"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton({ children, pendingLabel = "Saving...", className = "" }) {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} aria-disabled={pending} className={className}>
      {pending ? pendingLabel : children}
    </button>
  )
}

export function DeleteForm({ action, id, tab, title }) {
  return (
    <form
      action={action}
      className="mt-5"
      onSubmit={(event) => {
        if (!window.confirm(`Delete “${title}”? This action cannot be undone.`)) event.preventDefault()
      }}
    >
      <input type="hidden" name="return_tab" value={tab} />
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
    </form>
  )
}

function DeleteButton() {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending} className="text-sm text-rose-300 transition hover:text-rose-200 disabled:cursor-wait disabled:opacity-60">
      {pending ? "Deleting..." : "Delete item"}
    </button>
  )
}
