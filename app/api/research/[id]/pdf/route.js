import { NextResponse } from "next/server"
import { getSql } from "@/lib/neon"

function isAllowedPdfUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === "https:" && url.hostname === "res.cloudinary.com"
  } catch {
    return false
  }
}

function safeFilename(value) {
  const normalized = String(value || "research-paper")
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase()
  return `${normalized || "research-paper"}.pdf`
}

export async function GET(_request, { params }) {
  const sql = getSql()
  if (!sql) return NextResponse.json({ error: "Database connection is unavailable." }, { status: 503 })

  const { id } = await params

  try {
    const rows = await sql`select title, pdf_url from research_items where id = ${id} limit 1`
    const item = rows[0]
    if (!item?.pdf_url) return NextResponse.json({ error: "PDF not found." }, { status: 404 })
    if (!isAllowedPdfUrl(item.pdf_url)) return NextResponse.json({ error: "PDF source is not allowed." }, { status: 400 })

    const response = await fetch(item.pdf_url, { cache: "no-store" })
    if (!response.ok || !response.body) return NextResponse.json({ error: "PDF could not be downloaded." }, { status: 502 })

    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${safeFilename(item.title)}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch (error) {
    console.error("Research PDF download failed:", error)
    return NextResponse.json({ error: "PDF could not be downloaded." }, { status: 500 })
  }
}
