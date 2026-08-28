import { NextResponse } from "next/server"
import { getResearchMetrics } from "@/lib/research-metrics"

export async function GET() {
  return NextResponse.json(await getResearchMetrics(), {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  })
}
