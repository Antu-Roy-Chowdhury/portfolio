import "server-only"
import crypto from "crypto"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getSql } from "@/lib/neon"

const SESSION_COOKIE = "portfolio_admin_session"

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === "production") throw new Error("ADMIN_SESSION_SECRET must be configured in production.")
  return "development-only-admin-session-secret"
}

export function getAdminPath() {
  const raw = process.env.ADMIN_PATH || "control-room-antu"
  return raw.startsWith("/") ? raw : `/${raw}`
}

export function getAdminLoginPath() {
  return getAdminPath()
}

export function getAdminDashboardPath() {
  return `${getAdminPath()}/dashboard`
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "")
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/")
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4)
  return Buffer.from(padded, "base64").toString("utf8")
}

function signValue(value) {
  return crypto.createHmac("sha256", getSessionSecret()).update(value).digest("hex")
}

function createSessionToken(payload) {
  const encodedPayload = base64UrlEncode(JSON.stringify(payload))
  const signature = signValue(encodedPayload)
  return `${encodedPayload}.${signature}`
}

function readSessionToken(token) {
  if (!token || !token.includes(".")) return null
  const parts = token.split(".")
  if (parts.length !== 2) return null
  const [encodedPayload, signature] = parts
  const expectedSignature = signValue(encodedPayload)

  const signatureBuffer = Buffer.from(signature)
  const expectedBuffer = Buffer.from(expectedSignature)
  if (signatureBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(signatureBuffer, expectedBuffer)) {
    return null
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload))
    if (!payload.expiresAt || payload.expiresAt < Date.now()) return null
    return payload
  } catch {
    return null
  }
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex")
  return `scrypt$${salt}$${hash}`
}

function verifyHashedPassword(password, storedHash) {
  const [, salt, hash] = storedHash.split("$")
  const derived = crypto.scryptSync(password, salt, 64).toString("hex")
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(derived, "hex"))
}

export async function verifyAdminCredentials(identifier, password) {
  const sql = getSql()
  if (!sql) {
    return { ok: false, error: "DATABASE_URL is missing." }
  }

  const rows = await sql`
    select id, email, username, password_hash, is_active
    from admin_users
    where email = ${identifier} or username = ${identifier}
    limit 1
  `

  const user = rows[0]
  if (!user || !user.is_active) {
    return { ok: false, error: "Invalid credentials." }
  }

  let isValid = false

  if (user.password_hash?.startsWith("scrypt$")) {
    isValid = verifyHashedPassword(password, user.password_hash)
  } else if (user.password_hash === password) {
    isValid = true
    const upgradedHash = hashPassword(password)
    await sql`update admin_users set password_hash = ${upgradedHash}, updated_at = now() where id = ${user.id}`
  }

  if (!isValid) {
    return { ok: false, error: "Invalid credentials." }
  }

  return {
    ok: true,
    user: {
      id: user.id,
      email: user.email,
      username: user.username,
    },
  }
}

export async function createAdminSession(user) {
  const cookieStore = await cookies()
  const token = createSessionToken({
    sub: user.id,
    email: user.email,
    username: user.username,
    expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
  })

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function clearAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  const payload = readSessionToken(token)
  if (!payload) return null
  return payload
}

export async function requireAdmin() {
  const session = await getAdminSession()
  if (!session) {
    redirect(getAdminLoginPath())
  }
  return session
}

export function hashAdminPassword(password) {
  return hashPassword(password)
}
