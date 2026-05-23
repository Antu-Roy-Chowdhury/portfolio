"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { submitContactAction } from "@/app/contact/actions"

const initialState = { ok: false, error: "", message: "" }
const subjectPlaceholders = ["Collaboration", "Research Query", "Opportunity"]

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactAction, initialState)
  const formRef = useRef(null)
  const [placeholderIndex, setPlaceholderIndex] = useState(0)

  useEffect(() => {
    if (state?.ok) {
      formRef.current?.reset()
    }
  }, [state])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % subjectPlaceholders.length)
    }, 2200)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <form ref={formRef} action={formAction} className="mt-8 space-y-5">
      <div>
        <label className="mb-2 block text-sm text-slate-300" htmlFor="name">
          Name
        </label>
        <input id="name" name="name" type="text" className="form-input" placeholder="Your name" required />
      </div>
      <div>
        <label className="mb-2 block text-sm text-slate-300" htmlFor="email">
          Email
        </label>
        <input id="email" name="email" type="email" className="form-input" placeholder="your@email.com" required />
      </div>
      <div>
        <label className="mb-2 block text-sm text-slate-300" htmlFor="subject">
          Subject
        </label>
        <input id="subject" name="subject" type="text" className="form-input" placeholder={subjectPlaceholders[placeholderIndex]} />
      </div>
      <div>
        <label className="mb-2 block text-sm text-slate-300" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={7}
          className="form-input min-h-40"
          placeholder="Tell me a little about your idea or opportunity."
          required
        />
      </div>
      {state?.error ? <p className="text-sm text-rose-300">{state.error}</p> : null}
      {state?.message ? <p className="text-sm text-emerald-300">{state.message}</p> : null}
      <button type="submit" disabled={pending} className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:opacity-70">
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  )
}
