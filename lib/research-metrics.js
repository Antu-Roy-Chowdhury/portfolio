import "server-only"
import { unstable_noStore as noStore } from "next/cache"
import { getSql } from "@/lib/neon"
import { calculateHIndex } from "@/lib/research-metrics-utils"

export async function getResearchMetrics() {
  noStore()
  const sql = getSql()

  if (!sql) {
    return { totalCitations: 0, hIndex: 0, researchInterestScore: 0 }
  }

  try {
    const [researchRows, scoreRows] = await Promise.all([
      sql`select citation_count from research_items`,
      sql`
        select research_interest_score
        from home_sections
        where section_key = 'hero'
        order by updated_at desc
        limit 1
      `,
    ])
    const citationCounts = researchRows.map((row) => Number(row.citation_count) || 0)

    return {
      totalPublications: researchRows.length,
      totalCitations: citationCounts.reduce((total, count) => total + count, 0),
      hIndex: calculateHIndex(citationCounts),
      researchInterestScore: Number(scoreRows[0]?.research_interest_score) || 0,
    }
  } catch (error) {
    console.error("Research metrics query failed:", error)
    return { totalCitations: 0, hIndex: 0, researchInterestScore: 0 }
  }
}
