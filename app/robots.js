const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.anturoychowdhury.me"

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/", "/dashboard/", "/login/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
