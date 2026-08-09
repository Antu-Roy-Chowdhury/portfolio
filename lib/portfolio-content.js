import "server-only"
import { unstable_noStore as noStore } from "next/cache"
import { getSql } from "@/lib/neon"
import {
  achievementItems as fallbackAchievements,
  certifications as fallbackCertifications,
  educationItems as fallbackEducation,
  experienceItems as fallbackExperience,
  navigationLinks as fallbackNavigationLinks,
  projects as fallbackProjects,
  researchItems as fallbackResearchItems,
  siteMeta as fallbackSiteMeta,
  skillGroups as fallbackSkillGroups,
  strengths as fallbackStrengths,
} from "@/lib/portfolio-data"
import { getSkillCategoryLabel, toTitleCase } from "@/lib/skill-config"

function normalizeSiteSettings(row) {
  if (!row) return fallbackSiteMeta

  return {
    ...fallbackSiteMeta,
    name: row.site_title || fallbackSiteMeta.name,
    shortName: row.site_title?.split(" ")[0] || fallbackSiteMeta.shortName,
    role: row.site_description || fallbackSiteMeta.role,
    location: row.location || fallbackSiteMeta.location,
    email: row.primary_email || fallbackSiteMeta.email,
    phone: row.phone || fallbackSiteMeta.phone,
    resumeUrl: row.resume_url || fallbackSiteMeta.resumeUrl,
    portrait: row.portrait_image_url || fallbackSiteMeta.portrait,
    logo: row.logo_url || fallbackSiteMeta.logo,
    footerText: row.footer_text || null,
    dotBackgroundEnabled: row.dot_bg_enabled ?? true,
    dotBackgroundColor: row.dot_bg_color || "#2a2a2a",
    dotHighlightColor: row.dot_highlight_color || "#ffffff",
    dotHoverGlow: row.dot_hover_glow || "#7dd3fc",
  }
}

async function getRows(queryBuilder) {
  const sql = getSql()
  if (!sql) return null

  try {
    return await queryBuilder(sql)
  } catch (error) {
    console.error("Database query failed:", error)
    return null
  }
}

function buildTimeline({ startDate, endDate, isCurrent, startYear, endYear }) {
  if (startDate) {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : null
    const startLabel = Number.isNaN(start.getTime()) ? "" : start.toLocaleString("en-US", { month: "short", year: "numeric" })
    const endLabel = isCurrent ? "Present" : end && !Number.isNaN(end.getTime()) ? end.toLocaleString("en-US", { month: "short", year: "numeric" }) : ""
    return [startLabel, endLabel].filter(Boolean).join(" - ")
  }

  return `${startYear || ""}${startYear || endYear ? " - " : ""}${isCurrent ? "Present" : endYear || ""}`.trim()
}

function normalizeApplicationRefs(values, lookup) {
  return (values || [])
    .map((token) => {
      const normalized = String(token || "").trim()
      if (!normalized) return null
      return lookup.get(normalized) || lookup.get(normalized.toLowerCase()) || null
    })
    .filter(Boolean)
}

export async function getSiteChrome() {
  noStore()

  const [settingsRows, navRows, socialRows] = await Promise.all([
    getRows((sql) => sql`select * from site_settings order by updated_at desc limit 1`),
    getRows((sql) => sql`select * from navigation_links where is_visible = true order by position asc, sort_order asc, created_at asc`),
    getRows((sql) => sql`select * from social_links where is_visible = true order by sort_order asc, platform asc`),
  ])

  const siteMeta = normalizeSiteSettings(settingsRows?.[0])

  if (socialRows?.length) {
    siteMeta.socialLinks = socialRows.map((item) => ({
      label: item.label || toTitleCase(item.platform) || "Link",
      href: item.url,
      platform: item.platform,
      iconName: item.icon_name,
    }))
  }

  const navigationLinks = navRows?.length
    ? navRows
        .filter((item) => item.position === "navbar")
        .map((item) => ({ label: item.label, href: item.url }))
    : fallbackNavigationLinks

  const footerLinks = navRows?.length
    ? navRows
        .filter((item) => item.position === "footer")
        .map((item) => ({ label: item.label, href: item.url }))
    : fallbackNavigationLinks

  return { siteMeta, navigationLinks, footerLinks }
}

export async function getProjects() {
  noStore()

  const rows = await getRows((sql) => sql`
    select
      p.*,
      coalesce(
        json_agg(t.name order by t.name) filter (where t.name is not null),
        '[]'::json
      ) as tech_stack
    from projects p
    left join project_technologies pt on pt.project_id = p.id
    left join technologies t on t.id = pt.technology_id
    group by p.id
    order by p.featured desc, p.sort_order asc, p.created_at desc
  `)

  if (!rows?.length) return fallbackProjects

  return rows.map((row) => ({
    id: row.slug,
    title: row.title,
    category: row.category || "Project",
    summary: row.short_description || row.full_description || "Project summary coming soon.",
    description: row.full_description || row.short_description || "Project details coming soon.",
    image: row.cover_image_url || "/placeholder.jpg",
    tech: row.tech_stack || [],
    github: row.github_url || "#",
    live: row.live_url || "#",
    caseStudy: row.case_study_url || "#",
    status: row.status || "completed",
    timeline:
      row.start_date && row.end_date
        ? `${new Date(row.start_date).getFullYear()} - ${new Date(row.end_date).getFullYear()}`
        : row.start_date
          ? `${new Date(row.start_date).toLocaleString("en-US", { month: "short", year: "numeric" })} - Present`
          : row.status === "ongoing"
            ? "Ongoing"
            : "Completed",
    featured: row.featured,
  }))
}

export async function getSkillGroups() {
  noStore()

  const [skillRows, projectRows, researchRows] = await Promise.all([
    getRows((sql) => sql`
      select *
      from skills
      order by category asc, proficiency_bucket asc, sort_order asc, name asc
    `),
    getRows((sql) => sql`select slug, title from projects order by title asc`),
    getRows((sql) => sql`select id, title from research_items order by title asc`),
  ])

  if (!skillRows?.length) return fallbackSkillGroups

  const applicationLookup = new Map()
  for (const row of projectRows || []) {
    applicationLookup.set(`project:${row.slug}`, row.title)
    applicationLookup.set(String(row.slug), row.title)
    applicationLookup.set(String(row.slug).toLowerCase(), row.title)
  }
  for (const row of researchRows || []) {
    applicationLookup.set(`research:${row.id}`, row.title)
    applicationLookup.set(String(row.id), row.title)
    applicationLookup.set(String(row.id).toLowerCase(), row.title)
  }

  const groups = new Map()

  for (const row of skillRows) {
    const key = row.category || "skills"
    if (!groups.has(key)) {
      groups.set(key, {
        key,
        title: getSkillCategoryLabel(key),
        description: `Selected capability areas within ${getSkillCategoryLabel(key).toLowerCase()}.`,
        core: [],
        familiar: [],
      })
    }

    const item = {
      id: row.id,
      name: row.name,
      appliedIn: normalizeApplicationRefs(row.applied_in_projects, applicationLookup),
    }

    if (row.proficiency_bucket === "familiar") {
      groups.get(key).familiar.push(item)
    } else {
      groups.get(key).core.push(item)
    }
  }

  return [...groups.values()]
}

export async function getExperienceItems() {
  noStore()

  const rows = await getRows((sql) => sql`
    select e.*, coalesce(
      json_agg(h.highlight order by h.sort_order asc) filter (where h.highlight is not null),
      '[]'::json
    ) as highlights
    from experiences e
    left join experience_highlights h on h.experience_id = e.id
    group by e.id
    order by e.sort_order asc, e.start_date desc nulls last
  `)

  if (!rows?.length) {
    return fallbackExperience.map((item) => ({
      ...item,
      timeline: item.year,
    }))
  }

  return rows.map((row) => ({
    year: row.start_date ? new Date(row.start_date).getFullYear().toString() : "Recent",
    timeline: buildTimeline({ startDate: row.start_date, endDate: row.end_date, isCurrent: row.is_current }),
    title: row.title,
    org: row.organization,
    isCurrent: Boolean(row.is_current),
    text: row.description || row.highlights?.[0] || "Details coming soon.",
  }))
}

export async function getEducationItems() {
  noStore()

  const rows = await getRows((sql) => sql`
    select *
    from education
    order by sort_order asc, start_year desc nulls last
  `)

  if (!rows?.length) return fallbackEducation

  return rows.map((row) => ({
    degree: row.degree,
    institution: row.institution,
    duration: buildTimeline({ startYear: row.start_year, endYear: row.end_year, isCurrent: row.is_current }),
    result: row.result || "In progress",
    coreFocus: row.core_focus || null,
    image: row.image_url || null,
    text: row.description || "Education details coming soon.",
  }))
}

export async function getCertifications() {
  noStore()

  const rows = await getRows((sql) => sql`
    select *
    from certifications
    order by is_featured desc, sort_order asc, issue_date desc nulls last
  `)

  if (!rows?.length) return fallbackCertifications

  return rows.map((row) => ({
    title: row.title,
    issuer: row.issuer,
    date: row.issue_date
      ? new Date(row.issue_date).toLocaleString("en-US", { month: "short", year: "numeric" })
      : "Date not set",
    credentialId: row.credential_id || "N/A",
    url: row.credential_url || "#",
    image: row.image_url || null,
  }))
}

export async function getResearchItems() {
  noStore()

  const rows = await getRows((sql) => sql`
    select
      r.*,
      coalesce(
        json_agg(t.tag order by t.tag asc) filter (where t.tag is not null),
        '[]'::json
      ) as tags
    from research_items r
    left join research_tags t on t.research_item_id = r.id
    group by r.id
    order by r.featured desc, r.sort_order asc, r.publication_date desc nulls last
  `)

  if (!rows?.length) return fallbackResearchItems

  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    venue: row.event_or_journal || toTitleCase(row.item_type) || "Research",
    kind: row.item_type ? toTitleCase(row.item_type) : "Research",
    year: row.publication_date ? new Date(row.publication_date).getFullYear().toString() : null,
    summary: row.short_description || row.abstract || "Research summary coming soon.",
    abstract: row.abstract || row.short_description || "Research summary coming soon.",
    authors: row.authors || null,
    image: row.image_url || null,
    url: row.paper_url || "#",
    codeUrl: row.code_url || "#",
    status: row.status || "in_progress",
    tags: row.tags || [],
  }))
}

export async function getAchievementItems() {
  noStore()

  const rows = await getRows((sql) => sql`
    select
      a.*,
      coalesce(
        json_agg(t.tag order by t.tag asc) filter (where t.tag is not null),
        '[]'::json
      ) as tags
    from achievements a
    left join achievement_tags t on t.achievement_id = a.id
    group by a.id
    order by a.featured desc, a.sort_order asc, a.achievement_date desc nulls last
  `)

  if (!rows?.length) return fallbackAchievements

  return rows.map((row) => ({
    title: row.title,
    meta: row.issuer || "Achievement",
    text: row.description || "Achievement details coming soon.",
    image: row.image_url || null,
    date: row.achievement_date ? new Date(row.achievement_date).getFullYear().toString() : null,
    tags: row.tags || [],
  }))
}

export async function getContactContent() {
  noStore()

  const [siteChrome, contactRows] = await Promise.all([
    getSiteChrome(),
    getRows((sql) => sql`select * from contact_settings order by updated_at desc limit 1`),
  ])

  const row = contactRows?.[0]

  return {
    siteMeta: {
      ...siteChrome.siteMeta,
      email: row?.email_to || siteChrome.siteMeta.email,
      phone: row?.phone || siteChrome.siteMeta.phone,
      location: row?.location || siteChrome.siteMeta.location,
    },
    heading: row?.heading || "If you have a project, collaboration, or research-related idea, feel free to reach out.",
    description:
      row?.description ||
      "Messages submitted here are stored in the portfolio database and can also trigger an email notification.",
  }
}

export async function getHomeContent() {
  noStore()

  const [siteChrome, projects, experiences, skills, sections] = await Promise.all([
    getSiteChrome(),
    getProjects(),
    getExperienceItems(),
    getSkillGroups(),
    getRows((sql) => sql`
      select *
      from home_sections
      where is_active = true
      order by sort_order asc, updated_at desc
    `),
  ])

  const hero = sections?.find((item) => item.section_key === "hero")
  const intro = sections?.find((item) => item.section_key === "intro")
  const strengths =
    sections?.filter((item) => item.section_key !== "hero" && item.section_key !== "intro").map((item) => ({
      title: item.title,
      description: item.description || item.subtitle || "Section details coming soon.",
      image: item.image_url || null,
    })) || fallbackStrengths

  return {
    siteMeta: siteChrome.siteMeta,
    hero: {
      badge: hero?.badge || "Research, engineering, and product work",
      title: hero?.title || "Bridging the gap between engineering research and intelligent software",
      description:
        hero?.description ||
        intro?.description ||
        "Electronics & Telecommunication Engineering student at RUET specializing in practical machine learning, image processing, and full-stack prototyping. I build systems that bridge theoretical research with real-world utility.",
      primaryButtonLabel: hero?.primary_button_label || "Contact me",
      primaryButtonUrl: hero?.primary_button_url || "/contact",
      secondaryButtonLabel: hero?.secondary_button_label || "Download CV",
      secondaryButtonUrl: hero?.secondary_button_url || siteChrome.siteMeta.resumeUrl,
      image: hero?.image_url || siteChrome.siteMeta.portrait,
    },
    highlightStats: [
      { value: `${projects.length}+`, label: "Projects listed" },
      { value: `${experiences.length}`, label: "Experience entries" },
      { value: `${skills.length}`, label: "Skill groups" },
      { value: siteChrome.siteMeta.shortName, label: "Personal brand" },
    ],
    strengths: strengths.length ? strengths.slice(0, 3) : fallbackStrengths,
    featuredProjects: projects.filter((item) => item.featured).slice(0, 3),
    experiences: experiences.slice(0, 3),
    skillGroups: skills,
  }
}
