export function calculateHIndex(citationCounts = []) {
  const sortedCounts = citationCounts
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value >= 0)
    .sort((a, b) => b - a)

  let hIndex = 0
  for (const [index, citationCount] of sortedCounts.entries()) {
    const papers = index + 1
    if (citationCount < papers) break
    hIndex = papers
  }

  return hIndex
}
