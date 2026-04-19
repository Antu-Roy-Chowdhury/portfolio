"use server"

import { getSql } from "@/lib/neon"
import { sendPortfolioContactEmail } from "@/lib/mailer"

export async function submitContactAction(_, formData) {
  if (!(formData instanceof FormData)) {
    formData = _
  }

  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const subject = String(formData.get("subject") || "").trim()
  const message = String(formData.get("message") || "").trim()

  if (!name || !email || !message) {
    return { ok: false, error: "Name, email, and message are required." }
  }

  const sql = getSql()
  let emailTo = process.env.CONTACT_NOTIFY_EMAIL || "anturoychowdhury3@gmail.com"
  let insertId = null

  if (sql) {
    const settings = await sql`select * from contact_settings order by updated_at desc limit 1`
    if (settings[0]?.email_to) {
      emailTo = settings[0].email_to
    }

    const inserted = await sql`
      insert into contact_messages (name, email, subject, message, mail_status)
      values (${name}, ${email}, ${subject || "Portfolio inquiry"}, ${message}, ${"pending"})
      returning id
    `
    insertId = inserted[0]?.id || null
  }

  try {
    const result = await sendPortfolioContactEmail({
      toEmail: emailTo,
      name,
      fromEmail: email,
      subject: subject || `Portfolio contact from ${name}`,
      message,
    })

    if (sql && insertId) {
      await sql`update contact_messages set mail_status = ${result.ok ? "sent" : "failed"} where id = ${insertId}`
    }

    if (!result.ok && result.reason === "missing_smtp_config") {
      return {
        ok: true,
        message: "Your message was saved successfully. Email notification is not configured yet, so please add SMTP settings next.",
      }
    }

    return { ok: true, message: "Your message was sent successfully. I will get back to you soon." }
  } catch (error) {
    console.error("Contact submission failed:", error)

    if (sql && insertId) {
      await sql`update contact_messages set mail_status = ${"failed"} where id = ${insertId}`
    }

    return { ok: false, error: "Your message was saved, but the email notification failed. Please check SMTP settings." }
  }
}
