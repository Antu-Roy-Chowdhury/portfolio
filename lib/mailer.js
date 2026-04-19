import "server-only"
import nodemailer from "nodemailer"

function getMailerConfig() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) {
    return null
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  }
}

export async function sendPortfolioContactEmail({ fromEmail, message, name, subject, toEmail }) {
  const config = getMailerConfig()
  if (!config) {
    return { ok: false, reason: "missing_smtp_config" }
  }

  const transporter = nodemailer.createTransport(config)
  const replyTo = fromEmail || undefined

  await transporter.sendMail({
    from: process.env.CONTACT_FROM_EMAIL || config.auth.user,
    to: toEmail,
    replyTo,
    subject: subject || `Portfolio contact from ${name || "visitor"}`,
    text: [
      `Name: ${name || "-"}`,
      `Email: ${fromEmail || "-"}`,
      "",
      "Message:",
      message || "-",
    ].join("\n"),
  })

  return { ok: true }
}
