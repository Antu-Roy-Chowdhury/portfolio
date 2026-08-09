import { readFile } from "node:fs/promises"
import nextEnv from "@next/env"
import postgres from "postgres"

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is missing.")

const sql = postgres(process.env.DATABASE_URL, {
  ssl: "require",
  max: 1,
  prepare: false,
})

try {
  const migration = await readFile(new URL("../migrations/20260809_admin_form_columns.sql", import.meta.url), "utf8")
  await sql.unsafe(migration)
  console.log("Admin form column migration applied successfully.")
} finally {
  await sql.end()
}
