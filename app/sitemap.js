const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anturoychowdhury.vercel.app"

const staticRoutes = ["", "/about", "/projects", "/skills", "/research", "/contact"]

export default function sitemap() {
  const now = new Date()

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }))
}
