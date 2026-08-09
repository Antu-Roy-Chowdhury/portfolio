import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { createHmac } from "node:crypto"
import nextEnv from "@next/env"

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const port = 3187
const origin = `http://127.0.0.1:${port}`
const nextCli = new URL("../node_modules/next/dist/bin/next", import.meta.url)
const child = spawn(process.execPath, [nextCli.pathname.slice(1), "start", "-p", String(port)], {
  cwd: process.cwd(),
  stdio: ["ignore", "pipe", "pipe"],
})

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (child.exitCode != null) throw new Error(`Next server exited with code ${child.exitCode}.`)
    try {
      const response = await fetch(`${origin}/robots.txt`)
      if (response.ok) return
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 250))
  }
  throw new Error("Timed out waiting for the Next server.")
}

try {
  await waitForServer()

  for (const endpoint of ["/api/cloudinary/sign", "/api/cloudinary/upload"]) {
    const response = await fetch(`${origin}${endpoint}`, { method: "POST", redirect: "manual" })
    assert.equal(response.status, 401, `${endpoint} must reject unauthenticated uploads`)
  }

  const hiddenAdminResponse = await fetch(`${origin}/admin/dashboard`, { redirect: "manual" })
  assert.ok([307, 308].includes(hiddenAdminResponse.status), "The public /admin path must redirect")

  const rawAdminPath = process.env.ADMIN_PATH || "control-room-antu"
  const adminPath = rawAdminPath.startsWith("/") ? rawAdminPath : `/${rawAdminPath}`
  const dashboardResponse = await fetch(`${origin}${adminPath}/dashboard`, { redirect: "manual" })
  assert.ok([303, 307, 308].includes(dashboardResponse.status), "The hidden dashboard must require login")
  assert.match(dashboardResponse.headers.get("location") || "", new RegExp(`${adminPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:$|\\?)`))

  const sessionSecret = process.env.ADMIN_SESSION_SECRET
  assert.ok(sessionSecret, "ADMIN_SESSION_SECRET is required for authenticated verification")
  const encodedPayload = Buffer.from(JSON.stringify({ sub: "http-audit", expiresAt: Date.now() + 60_000 }))
    .toString("base64url")
  const signature = createHmac("sha256", sessionSecret).update(encodedPayload).digest("hex")
  const authenticatedResponse = await fetch(`${origin}${adminPath}/dashboard`, {
    headers: { Cookie: `portfolio_admin_session=${encodedPayload}.${signature}` },
  })
  assert.equal(authenticatedResponse.status, 200, "A valid session must render the dashboard")
  const dashboardHtml = await authenticatedResponse.text()
  assert.match(dashboardHtml, /Portfolio control room/i)
  assert.doesNotMatch(dashboardHtml, /Could not load (skills|education|projects|research)/i)

  console.log("HTTP verification passed for admin authorization, authenticated dashboard data loading, and both Cloudinary routes.")
} finally {
  child.kill()
}
