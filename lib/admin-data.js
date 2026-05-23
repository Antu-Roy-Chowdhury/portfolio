import "server-only"
import { getSql } from "@/lib/neon"

async function safeQuery(callback) {
  const sql = getSql()
  if (!sql) return null

  try {
    return await callback(sql)
  } catch (error) {
    console.error("Admin query failed:", error)
    return null
  }
}

export async function getAdminDashboardData() {
  const [siteSettings, homeSections, projects, certifications, researchItems, achievements, educationItems, socialLinks, skills, experienceItems] = await Promise.all([
    safeQuery((sql) => sql`select * from site_settings order by updated_at desc limit 1`),
    safeQuery((sql) => sql`select * from home_sections order by sort_order asc, updated_at desc`),
    safeQuery((sql) => sql`
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
    `),
    safeQuery((sql) => sql`select * from certifications order by is_featured desc, sort_order asc, issue_date desc nulls last`),
    safeQuery((sql) => sql`
      select
        r.*,
        coalesce(json_agg(t.tag order by t.tag asc) filter (where t.tag is not null), '[]'::json) as tags
      from research_items r
      left join research_tags t on t.research_item_id = r.id
      group by r.id
      order by r.featured desc, r.sort_order asc, r.publication_date desc nulls last
    `),
    safeQuery((sql) => sql`
      select
        a.*,
        coalesce(json_agg(t.tag order by t.tag asc) filter (where t.tag is not null), '[]'::json) as tags
      from achievements a
      left join achievement_tags t on t.achievement_id = a.id
      group by a.id
      order by a.featured desc, a.sort_order asc, a.achievement_date desc nulls last
    `),
    safeQuery((sql) => sql`select * from education order by sort_order asc, start_year desc nulls last`),
    safeQuery((sql) => sql`select * from social_links order by sort_order asc, platform asc`),
    safeQuery((sql) => sql`select * from skills order by category asc, proficiency_bucket asc, sort_order asc, name asc`),
    safeQuery((sql) => sql`
      select
        e.*,
        coalesce(
          json_agg(h.highlight order by h.sort_order asc) filter (where h.highlight is not null),
          '[]'::json
        ) as highlights
      from experiences e
      left join experience_highlights h on h.experience_id = e.id
      group by e.id
      order by e.sort_order asc, e.start_date desc nulls last
    `),
  ])

  return {
    siteSettings: siteSettings?.[0] || null,
    homeSections: homeSections || [],
    projects: projects || [],
    certifications: certifications || [],
    researchItems: researchItems || [],
    achievements: achievements || [],
    educationItems: educationItems || [],
    socialLinks: socialLinks || [],
    skills: skills || [],
    experienceItems: experienceItems || [],
  }
}
