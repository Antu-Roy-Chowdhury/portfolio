import "server-only"
import postgres from "postgres"

let sql

export function getSql() {
  if (!process.env.DATABASE_URL) {
    return null
  }

  if (!sql) {
    sql = postgres(process.env.DATABASE_URL, {
      ssl: "require",
      max: 1,
      prepare: false,
    })
  }

  return sql
}
