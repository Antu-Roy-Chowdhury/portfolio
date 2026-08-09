const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const TOKEN_PATTERN = /^[a-z0-9]+(?:_[a-z0-9]+)*$/
const HEX_COLOR_PATTERN = /^#[0-9a-f]{6}$/i

export function optionalText(value) {
  const text = value == null ? "" : String(value).trim()
  return text || null
}

export function checkboxValue(value) {
  return value === "on" || value === "true" || value === true
}

export function integerValue(value, label, { fallback = 0, min = -2147483648, max = 2147483647 } = {}) {
  if (value == null || String(value).trim() === "") return fallback
  const number = Number(value)
  if (!Number.isInteger(number) || number < min || number > max) {
    throw new Error(`${label} must be a whole number between ${min} and ${max}.`)
  }
  return number
}

export function yearValue(value, label) {
  if (value == null || String(value).trim() === "") return null
  return integerValue(value, label, { min: 1900, max: 2100 })
}

export function dateValue(value, label) {
  const text = optionalText(value)
  if (!text) return null
  if (!DATE_PATTERN.test(text)) throw new Error(`${label} must be a valid date.`)
  const date = new Date(`${text}T00:00:00Z`)
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== text) {
    throw new Error(`${label} must be a valid date.`)
  }
  return text
}

export function assertDateOrder(start, end, startLabel = "Start date", endLabel = "End date") {
  if (start && end && start > end) throw new Error(`${endLabel} cannot be before ${startLabel.toLowerCase()}.`)
}

export function assertYearOrder(start, end) {
  if (start && end && start > end) throw new Error("End year cannot be before start year.")
}

export function urlValue(value, label, { allowRelative = false } = {}) {
  const text = optionalText(value)
  if (!text) return null
  if (allowRelative && text.startsWith("/") && !text.startsWith("//")) return text

  try {
    const parsed = new URL(text)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") throw new Error()
  } catch {
    throw new Error(`${label} must be a valid http(s) URL${allowRelative ? " or an internal path beginning with /." : "."}`)
  }
  return text
}

export function emailValue(value, label = "Email") {
  const text = optionalText(value)
  if (!text) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text)) throw new Error(`${label} must be a valid email address.`)
  return text
}

export function slugValue(value) {
  const text = String(value || "").trim().toLowerCase()
  if (!text || !SLUG_PATTERN.test(text)) {
    throw new Error("Slug must contain lowercase letters, numbers, and single hyphens only.")
  }
  return text
}

export function tokenValue(value, label) {
  const text = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_")
  if (!text || !TOKEN_PATTERN.test(text)) throw new Error(`${label} must contain letters, numbers, and underscores only.`)
  return text
}

export function colorValue(value, label) {
  const text = optionalText(value)
  if (!text || !HEX_COLOR_PATTERN.test(text)) throw new Error(`${label} must use a six-digit hex color such as #7dd3fc.`)
  return text.toLowerCase()
}

export function uniqueCsv(value) {
  const seen = new Set()
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter((item) => {
      const key = item.toLowerCase()
      if (!item || seen.has(key)) return false
      seen.add(key)
      return true
    })
}

export function uniqueLines(value) {
  const seen = new Set()
  return String(value || "")
    .split(/\r?\n/g)
    .map((item) => item.trim())
    .filter((item) => {
      const key = item.toLowerCase()
      if (!item || seen.has(key)) return false
      seen.add(key)
      return true
    })
}

export function friendlyMutationError(error, fallback) {
  if (error?.code === "23505") return "That value already exists. Choose a unique slug, key, name, or platform."
  if (error?.code === "23503") return "This item is still linked to other content and cannot be changed safely."
  if (error?.code === "22P02" || error?.code === "22007" || error?.code === "22008") return "One of the submitted dates or identifiers is invalid."
  if (error instanceof Error && !error.code && error.message) return error.message
  return fallback
}
