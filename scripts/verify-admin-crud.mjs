import assert from "node:assert/strict"
import { randomUUID } from "node:crypto"
import nextEnv from "@next/env"
import postgres from "postgres"

const { loadEnvConfig } = nextEnv
loadEnvConfig(process.cwd())

const sql = postgres(process.env.DATABASE_URL, { ssl: "require", max: 1, prepare: false })
const marker = `codex-audit-${randomUUID().slice(0, 8)}`
const ROLLBACK = new Error("ROLLBACK_ADMIN_AUDIT")
const verified = []

async function expectOne(rows, resource) {
  assert.equal(rows.length, 1, `${resource}: expected one affected row`)
}

try {
  await sql.begin(async (tx) => {
    const settings = await tx`
      insert into site_settings (site_title, dot_bg_enabled, dot_bg_color, dot_highlight_color, dot_hover_glow)
      values (${marker}, true, '#112233', '#ffffff', '#7dd3fc') returning id
    `
    await expectOne(await tx`update site_settings set footer_text = 'audit footer' where id = ${settings[0].id} returning id`, "site settings update")
    await expectOne(await tx`delete from site_settings where id = ${settings[0].id} returning id`, "site settings delete")
    verified.push("site settings")

    const section = await tx`insert into home_sections (section_key, title) values (${marker.replaceAll("-", "_")}, 'Audit') returning id`
    await expectOne(await tx`update home_sections set is_active = false, sort_order = 9 where id = ${section[0].id} returning id`, "home section update")
    await expectOne(await tx`delete from home_sections where id = ${section[0].id} returning id`, "home section delete")
    verified.push("home sections")

    const project = await tx`insert into projects (slug, title, featured) values (${marker}, 'Audit project', true) returning id, slug`
    const technology = await tx`insert into technologies (name) values (${`Audit Tech ${marker}`}) returning id`
    await tx`insert into project_technologies (project_id, technology_id) values (${project[0].id}, ${technology[0].id})`
    await expectOne(await tx`update projects set title = 'Audit project updated', sort_order = 7 where id = ${project[0].id} returning id`, "project update")
    verified.push("projects + technologies")

    const certification = await tx`insert into certifications (title, issuer) values ('Audit certificate', ${marker}) returning id`
    await expectOne(await tx`update certifications set credential_id = 'AUDIT', is_featured = true where id = ${certification[0].id} returning id`, "certification update")
    await expectOne(await tx`delete from certifications where id = ${certification[0].id} returning id`, "certification delete")
    verified.push("certifications")

    const education = await tx`
      insert into education (degree, institution, start_year, is_current, image_url)
      values ('Audit degree', ${marker}, 2024, true, '/audit.png') returning id
    `
    await expectOne(await tx`update education set end_year = null, core_focus = 'Audit focus' where id = ${education[0].id} returning id`, "education update")
    await expectOne(await tx`delete from education where id = ${education[0].id} returning id`, "education delete")
    verified.push("education")

    const experience = await tx`insert into experiences (title, organization, is_current) values ('Audit role', ${marker}, true) returning id`
    await tx`insert into experience_highlights (experience_id, highlight, sort_order) values (${experience[0].id}, 'Audit highlight', 0)`
    await expectOne(await tx`update experiences set end_date = null, description = 'Updated' where id = ${experience[0].id} returning id`, "experience update")
    await expectOne(await tx`delete from experiences where id = ${experience[0].id} returning id`, "experience delete")
    assert.equal((await tx`select id from experience_highlights where experience_id = ${experience[0].id}`).length, 0, "experience highlights cascade")
    verified.push("experience + highlights")

    const research = await tx`
      insert into research_items (item_type, title, authors, code_url)
      values ('conference', 'Audit research', 'Audit Author', 'https://example.com/code') returning id
    `
    await tx`insert into research_tags (research_item_id, tag) values (${research[0].id}, 'Audit')`
    await expectOne(await tx`update research_items set status = 'published', featured = true where id = ${research[0].id} returning id`, "research update")

    const skill = await tx`
      insert into skills (name, category, proficiency_bucket, applied_in_projects)
      values ('Audit skill', 'fullstack', 'familiar', ${[`project:${project[0].slug}`, `research:${research[0].id}`]}) returning id
    `
    await expectOne(await tx`update skills set is_featured = true, proficiency_bucket = 'core' where id = ${skill[0].id} returning id`, "skill update")
    await tx`update skills set applied_in_projects = array_remove(applied_in_projects, ${`project:${project[0].slug}`}) where id = ${skill[0].id}`
    await expectOne(await tx`delete from projects where id = ${project[0].id} returning id`, "project delete")
    assert.equal((await tx`select id from project_technologies where project_id = ${project[0].id}`).length, 0, "project technologies cascade")
    await tx`update skills set applied_in_projects = array_remove(applied_in_projects, ${`research:${research[0].id}`}) where id = ${skill[0].id}`
    await expectOne(await tx`delete from research_items where id = ${research[0].id} returning id`, "research delete")
    assert.equal((await tx`select id from research_tags where research_item_id = ${research[0].id}`).length, 0, "research tags cascade")
    await expectOne(await tx`delete from skills where id = ${skill[0].id} returning id`, "skill delete")
    verified.push("skills + evidence cleanup", "research + tags")

    const social = await tx`insert into social_links (platform, label, url) values (${marker}, 'Audit', 'https://example.com') returning id`
    await expectOne(await tx`update social_links set is_visible = false, sort_order = 4 where id = ${social[0].id} returning id`, "social update")
    await expectOne(await tx`delete from social_links where id = ${social[0].id} returning id`, "social delete")
    verified.push("social links")

    const achievement = await tx`insert into achievements (title, issuer) values ('Audit achievement', ${marker}) returning id`
    await tx`insert into achievement_tags (achievement_id, tag) values (${achievement[0].id}, 'Audit')`
    await expectOne(await tx`update achievements set featured = true, description = 'Updated' where id = ${achievement[0].id} returning id`, "achievement update")
    await expectOne(await tx`delete from achievements where id = ${achievement[0].id} returning id`, "achievement delete")
    assert.equal((await tx`select id from achievement_tags where achievement_id = ${achievement[0].id}`).length, 0, "achievement tags cascade")
    verified.push("achievements + tags")

    throw ROLLBACK
  })
} catch (error) {
  if (error !== ROLLBACK && error?.message !== ROLLBACK.message) throw error
} finally {
  await sql.end()
}

console.log(`Rollback-only CRUD verification passed: ${verified.join(", ")}.`)
