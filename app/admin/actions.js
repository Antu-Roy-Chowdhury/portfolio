"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { clearAdminSession, createAdminSession, getAdminDashboardPath, getAdminLoginPath, verifyAdminCredentials } from "@/lib/admin-auth"
import { getSql } from "@/lib/neon"

function normalizeCheckbox(value) {
  return value === "on"
}

function normalizeOptional(value) {
  return value ? String(value).trim() : null
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

async function replaceProjectTechnologies(sql, projectId, techValue) {
  const techNames = [...new Set(String(techValue || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean))]

  await sql`delete from project_technologies where project_id = ${projectId}`

  for (const techName of techNames) {
    const existing = await sql`select id from technologies where lower(name) = lower(${techName}) limit 1`
    const technologyId = existing[0]?.id || (await sql`insert into technologies (name) values (${techName}) returning id`)[0].id
    await sql`insert into project_technologies (project_id, technology_id) values (${projectId}, ${technologyId}) on conflict do nothing`
  }
}

async function replaceTags(sql, tableName, foreignKey, recordId, tagsValue) {
  const tags = [...new Set(String(tagsValue || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean))]

  const foreignColumn = foreignKey === "research" ? "research_item_id" : "achievement_id"
  const safeTable = tableName === "research_tags" ? "research_tags" : "achievement_tags"

  if (safeTable === "research_tags") {
    await sql`delete from research_tags where research_item_id = ${recordId}`
    for (const tag of tags) {
      await sql`insert into research_tags (research_item_id, tag) values (${recordId}, ${tag})`
    }
    return
  }

  await sql`delete from achievement_tags where achievement_id = ${recordId}`
  for (const tag of tags) {
    await sql`insert into achievement_tags (achievement_id, tag) values (${recordId}, ${tag})`
  }
}

export async function loginAction(_, formData) {
  if (!(formData instanceof FormData)) {
    formData = _
  }

  const identifier = String(formData.get("identifier") || "").trim()
  const password = String(formData.get("password") || "")

  if (!identifier || !password) {
    redirect(`${getAdminLoginPath()}?error=${encodeURIComponent("Username/email and password are required.")}`)
  }

  const result = await verifyAdminCredentials(identifier, password)

  if (!result.ok) {
    redirect(`${getAdminLoginPath()}?error=${encodeURIComponent(result.error)}`)
  }

  await createAdminSession(result.user)
  redirect(getAdminDashboardPath())
}
 
export async function logoutAction() {
  await clearAdminSession()
  redirect(getAdminLoginPath())
}

export async function saveSiteSettingsAction(formData) {
  const sql = getSql()
  if (!sql) return

  const id = normalizeOptional(formData.get("id"))
  const payload = {
    siteTitle: String(formData.get("site_title") || ""),
    siteDescription: normalizeOptional(formData.get("site_description")),
    primaryEmail: normalizeOptional(formData.get("primary_email")),
    phone: normalizeOptional(formData.get("phone")),
    location: normalizeOptional(formData.get("location")),
    resumeUrl: normalizeOptional(formData.get("resume_url")),
    portraitImageUrl: normalizeOptional(formData.get("portrait_image_url")),
    logoUrl: normalizeOptional(formData.get("logo_url")),
    footerText: normalizeOptional(formData.get("footer_text")),
    dotBgEnabled: normalizeCheckbox(formData.get("dot_bg_enabled")),
    dotBgColor: normalizeOptional(formData.get("dot_bg_color")),
    dotHighlightColor: normalizeOptional(formData.get("dot_highlight_color")),
    dotHoverGlow: normalizeOptional(formData.get("dot_hover_glow")),
  }

  if (id) {
    await sql`
      update site_settings
      set
        site_title = ${payload.siteTitle},
        site_description = ${payload.siteDescription},
        primary_email = ${payload.primaryEmail},
        phone = ${payload.phone},
        location = ${payload.location},
        resume_url = ${payload.resumeUrl},
        portrait_image_url = ${payload.portraitImageUrl},
        logo_url = ${payload.logoUrl},
        footer_text = ${payload.footerText},
        dot_bg_enabled = ${payload.dotBgEnabled},
        dot_bg_color = ${payload.dotBgColor},
        dot_highlight_color = ${payload.dotHighlightColor},
        dot_hover_glow = ${payload.dotHoverGlow},
        updated_at = now()
      where id = ${id}
    `
  } else {
    await sql`
      insert into site_settings (
        site_title, site_description, primary_email, phone, location, resume_url,
        portrait_image_url, logo_url, footer_text, dot_bg_enabled, dot_bg_color,
        dot_highlight_color, dot_hover_glow
      ) values (
        ${payload.siteTitle}, ${payload.siteDescription}, ${payload.primaryEmail},
        ${payload.phone}, ${payload.location}, ${payload.resumeUrl}, ${payload.portraitImageUrl},
        ${payload.logoUrl}, ${payload.footerText}, ${payload.dotBgEnabled}, ${payload.dotBgColor},
        ${payload.dotHighlightColor}, ${payload.dotHoverGlow}
      )
    `
  }

  revalidatePath("/")
  revalidatePath("/about")
  revalidatePath("/contact")
  revalidatePath("/skills")
  revalidatePath("/projects")
  revalidatePath("/research")
  revalidatePath("/admin/dashboard")
}

export async function saveProjectAction(formData) {
  const sql = getSql()
  if (!sql) return

  const id = normalizeOptional(formData.get("id"))
  const payload = {
    slug: String(formData.get("slug") || "").trim(),
    title: String(formData.get("title") || "").trim(),
    shortDescription: normalizeOptional(formData.get("short_description")),
    fullDescription: normalizeOptional(formData.get("full_description")),
    coverImageUrl: normalizeOptional(formData.get("cover_image_url")),
    category: normalizeOptional(formData.get("category")),
    githubUrl: normalizeOptional(formData.get("github_url")),
    liveUrl: normalizeOptional(formData.get("live_url")),
    caseStudyUrl: normalizeOptional(formData.get("case_study_url")),
    status: normalizeOptional(formData.get("status")) || "completed",
    featured: normalizeCheckbox(formData.get("featured")),
    sortOrder: normalizeNumber(formData.get("sort_order")),
  }

  if (!payload.slug || !payload.title) return

  let projectId = id

  if (id) {
    await sql`
      update projects
      set
        slug = ${payload.slug},
        title = ${payload.title},
        short_description = ${payload.shortDescription},
        full_description = ${payload.fullDescription},
        cover_image_url = ${payload.coverImageUrl},
        category = ${payload.category},
        github_url = ${payload.githubUrl},
        live_url = ${payload.liveUrl},
        case_study_url = ${payload.caseStudyUrl},
        status = ${payload.status},
        featured = ${payload.featured},
        sort_order = ${payload.sortOrder},
        updated_at = now()
      where id = ${id}
    `
  } else {
    const inserted = await sql`
      insert into projects (
        slug, title, short_description, full_description, cover_image_url, category,
        github_url, live_url, case_study_url, status, featured, sort_order
      ) values (
        ${payload.slug}, ${payload.title}, ${payload.shortDescription}, ${payload.fullDescription},
        ${payload.coverImageUrl}, ${payload.category}, ${payload.githubUrl}, ${payload.liveUrl},
        ${payload.caseStudyUrl}, ${payload.status}, ${payload.featured}, ${payload.sortOrder}
      )
      returning id
    `
    projectId = inserted[0].id
  }

  await replaceProjectTechnologies(sql, projectId, formData.get("tech_stack"))
  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath(`/projects/${payload.slug}`)
  revalidatePath("/admin/dashboard")
}

export async function deleteProjectAction(formData) {
  const sql = getSql()
  const id = normalizeOptional(formData.get("id"))
  if (!sql || !id) return
  await sql`delete from projects where id = ${id}`
  revalidatePath("/")
  revalidatePath("/projects")
  revalidatePath("/admin/dashboard")
}

export async function saveCertificationAction(formData) {
  const sql = getSql()
  if (!sql) return

  const id = normalizeOptional(formData.get("id"))
  const payload = {
    title: String(formData.get("title") || "").trim(),
    issuer: String(formData.get("issuer") || "").trim(),
    issueDate: normalizeOptional(formData.get("issue_date")),
    credentialId: normalizeOptional(formData.get("credential_id")),
    credentialUrl: normalizeOptional(formData.get("credential_url")),
    imageUrl: normalizeOptional(formData.get("image_url")),
    isFeatured: normalizeCheckbox(formData.get("is_featured")),
    sortOrder: normalizeNumber(formData.get("sort_order")),
  }

  if (!payload.title || !payload.issuer) return

  if (id) {
    await sql`
      update certifications
      set
        title = ${payload.title},
        issuer = ${payload.issuer},
        issue_date = ${payload.issueDate},
        credential_id = ${payload.credentialId},
        credential_url = ${payload.credentialUrl},
        image_url = ${payload.imageUrl},
        is_featured = ${payload.isFeatured},
        sort_order = ${payload.sortOrder}
      where id = ${id}
    `
  } else {
    await sql`
      insert into certifications (
        title, issuer, issue_date, credential_id, credential_url, image_url, is_featured, sort_order
      ) values (
        ${payload.title}, ${payload.issuer}, ${payload.issueDate}, ${payload.credentialId},
        ${payload.credentialUrl}, ${payload.imageUrl}, ${payload.isFeatured}, ${payload.sortOrder}
      )
    `
  }

  revalidatePath("/about")
  revalidatePath("/skills")
  revalidatePath("/admin/dashboard")
}

export async function deleteCertificationAction(formData) {
  const sql = getSql()
  const id = normalizeOptional(formData.get("id"))
  if (!sql || !id) return
  await sql`delete from certifications where id = ${id}`
  revalidatePath("/about")
  revalidatePath("/skills")
  revalidatePath("/admin/dashboard")
}

export async function saveResearchAction(formData) {
  const sql = getSql()
  if (!sql) return

  const id = normalizeOptional(formData.get("id"))
  const payload = {
    itemType: normalizeOptional(formData.get("item_type")) || "research",
    title: String(formData.get("title") || "").trim(),
    shortDescription: normalizeOptional(formData.get("short_description")),
    abstract: normalizeOptional(formData.get("abstract")),
    eventOrJournal: normalizeOptional(formData.get("event_or_journal")),
    publicationDate: normalizeOptional(formData.get("publication_date")),
    status: normalizeOptional(formData.get("status")) || "in_progress",
    paperUrl: normalizeOptional(formData.get("paper_url")),
    imageUrl: normalizeOptional(formData.get("image_url")),
    featured: normalizeCheckbox(formData.get("featured")),
    sortOrder: normalizeNumber(formData.get("sort_order")),
  }

  if (!payload.title) return

  let recordId = id

  if (id) {
    await sql`
      update research_items
      set
        item_type = ${payload.itemType},
        title = ${payload.title},
        short_description = ${payload.shortDescription},
        abstract = ${payload.abstract},
        event_or_journal = ${payload.eventOrJournal},
        publication_date = ${payload.publicationDate},
        status = ${payload.status},
        paper_url = ${payload.paperUrl},
        image_url = ${payload.imageUrl},
        featured = ${payload.featured},
        sort_order = ${payload.sortOrder},
        updated_at = now()
      where id = ${id}
    `
  } else {
    const inserted = await sql`
      insert into research_items (
        item_type, title, short_description, abstract, event_or_journal, publication_date,
        status, paper_url, image_url, featured, sort_order
      ) values (
        ${payload.itemType}, ${payload.title}, ${payload.shortDescription}, ${payload.abstract},
        ${payload.eventOrJournal}, ${payload.publicationDate}, ${payload.status},
        ${payload.paperUrl}, ${payload.imageUrl}, ${payload.featured}, ${payload.sortOrder}
      )
      returning id
    `
    recordId = inserted[0].id
  }

  await replaceTags(sql, "research_tags", "research", recordId, formData.get("tags"))
  revalidatePath("/research")
  revalidatePath("/admin/dashboard")
}

export async function deleteResearchAction(formData) {
  const sql = getSql()
  const id = normalizeOptional(formData.get("id"))
  if (!sql || !id) return
  await sql`delete from research_items where id = ${id}`
  revalidatePath("/research")
  revalidatePath("/admin/dashboard")
}

export async function saveAchievementAction(formData) {
  const sql = getSql()
  if (!sql) return

  const id = normalizeOptional(formData.get("id"))
  const payload = {
    title: String(formData.get("title") || "").trim(),
    issuer: normalizeOptional(formData.get("issuer")),
    achievementDate: normalizeOptional(formData.get("achievement_date")),
    description: normalizeOptional(formData.get("description")),
    imageUrl: normalizeOptional(formData.get("image_url")),
    featured: normalizeCheckbox(formData.get("featured")),
    sortOrder: normalizeNumber(formData.get("sort_order")),
  }

  if (!payload.title) return

  let recordId = id

  if (id) {
    await sql`
      update achievements
      set
        title = ${payload.title},
        issuer = ${payload.issuer},
        achievement_date = ${payload.achievementDate},
        description = ${payload.description},
        image_url = ${payload.imageUrl},
        featured = ${payload.featured},
        sort_order = ${payload.sortOrder}
      where id = ${id}
    `
  } else {
    const inserted = await sql`
      insert into achievements (
        title, issuer, achievement_date, description, image_url, featured, sort_order
      ) values (
        ${payload.title}, ${payload.issuer}, ${payload.achievementDate}, ${payload.description},
        ${payload.imageUrl}, ${payload.featured}, ${payload.sortOrder}
      )
      returning id
    `
    recordId = inserted[0].id
  }

  await replaceTags(sql, "achievement_tags", "achievement", recordId, formData.get("tags"))
  revalidatePath("/research")
  revalidatePath("/admin/dashboard")
}

export async function deleteAchievementAction(formData) {
  const sql = getSql()
  const id = normalizeOptional(formData.get("id"))
  if (!sql || !id) return
  await sql`delete from achievements where id = ${id}`
  revalidatePath("/research")
  revalidatePath("/admin/dashboard")
}
