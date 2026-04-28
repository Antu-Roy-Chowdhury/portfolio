"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  clearAdminSession,
  createAdminSession,
  getAdminDashboardPath,
  getAdminLoginPath,
  verifyAdminCredentials,
} from "@/lib/admin-auth"
import { getSql } from "@/lib/neon"

function normalizeCheckbox(value) {
  return value === "on"
}

function normalizeOptional(value) {
  const normalized = value ? String(value).trim() : ""
  return normalized || null
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function normalizeYear(value) {
  const number = Number(value)
  return Number.isFinite(number) && number > 0 ? number : null
}

function buildDashboardUrl(tab, status, message) {
  const params = new URLSearchParams()
  if (tab) params.set("tab", tab)
  if (status) params.set("status", status)
  if (message) params.set("message", message)
  return `${getAdminDashboardPath()}?${params.toString()}`
}

function redirectToDashboard(tab, status, message) {
  redirect(buildDashboardUrl(tab, status, message))
}

function getReturnTab(formData, fallback = "overview") {
  return String(formData.get("return_tab") || fallback)
}

async function replaceProjectTechnologies(sql, projectId, techValue) {
  const techNames = [
    ...new Set(
      String(techValue || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ]

  await sql`delete from project_technologies where project_id = ${projectId}`

  for (const techName of techNames) {
    const existing = await sql`select id from technologies where lower(name) = lower(${techName}) limit 1`
    const technologyId = existing[0]?.id || (await sql`insert into technologies (name) values (${techName}) returning id`)[0].id
    await sql`
      insert into project_technologies (project_id, technology_id)
      values (${projectId}, ${technologyId})
      on conflict do nothing
    `
  }
}

async function replaceHighlights(sql, experienceId, highlightsValue) {
  const highlights = String(highlightsValue || "")
    .split(/\r?\n/g)
    .map((item) => item.trim())
    .filter(Boolean)

  await sql`delete from experience_highlights where experience_id = ${experienceId}`

  for (const [index, highlight] of highlights.entries()) {
    await sql`
      insert into experience_highlights (experience_id, highlight, sort_order)
      values (${experienceId}, ${highlight}, ${index})
    `
  }
}

async function replaceTags(sql, tableName, recordId, tagsValue) {
  const tags = [
    ...new Set(
      String(tagsValue || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ]

  if (tableName === "research_tags") {
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

function revalidatePortfolioPaths(...extraPaths) {
  const basePaths = ["/", "/about", "/projects", "/skills", "/research", "/contact", getAdminDashboardPath()]
  for (const path of [...basePaths, ...extraPaths]) {
    revalidatePath(path)
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
  const tab = getReturnTab(formData, "site-settings")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
    const id = normalizeOptional(formData.get("id"))
    const payload = {
      siteTitle: String(formData.get("site_title") || "").trim(),
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

    if (!payload.siteTitle) {
      redirectToDashboard(tab, "error", "Site title is required.")
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

    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Site settings saved.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save site settings.")
  }
}

export async function saveProjectAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "projects")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
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

    if (!payload.slug || !payload.title) {
      redirectToDashboard(tab, "error", "Project title and slug are required.")
    }

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
    revalidatePortfolioPaths(`/projects/${payload.slug}`)
    redirectToDashboard(tab, "success", id ? "Project updated." : "Project added.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save project.")
  }
}

export async function deleteProjectAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "projects")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Project deletion failed.")
  }

  try {
    await sql`delete from projects where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Project deleted.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete project.")
  }
}

export async function saveCertificationAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "certifications")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
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

    if (!payload.title || !payload.issuer) {
      redirectToDashboard(tab, "error", "Certification title and issuer are required.")
    }

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

    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Certification updated." : "Certification added.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save certification.")
  }
}

export async function deleteCertificationAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "certifications")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Certification deletion failed.")
  }

  try {
    await sql`delete from certifications where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Certification deleted.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete certification.")
  }
}

export async function saveEducationAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "education")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
    const id = normalizeOptional(formData.get("id"))
    const payload = {
      degree: String(formData.get("degree") || "").trim(),
      institution: String(formData.get("institution") || "").trim(),
      fieldOfStudy: normalizeOptional(formData.get("field_of_study")),
      startYear: normalizeYear(formData.get("start_year")),
      endYear: normalizeYear(formData.get("end_year")),
      isCurrent: normalizeCheckbox(formData.get("is_current")),
      result: normalizeOptional(formData.get("result")),
      description: normalizeOptional(formData.get("description")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.degree || !payload.institution) {
      redirectToDashboard(tab, "error", "Education degree and institution are required.")
    }

    if (id) {
      await sql`
        update education
        set
          degree = ${payload.degree},
          institution = ${payload.institution},
          field_of_study = ${payload.fieldOfStudy},
          start_year = ${payload.startYear},
          end_year = ${payload.endYear},
          is_current = ${payload.isCurrent},
          result = ${payload.result},
          description = ${payload.description},
          sort_order = ${payload.sortOrder}
        where id = ${id}
      `
    } else {
      await sql`
        insert into education (
          degree, institution, field_of_study, start_year, end_year, is_current, result, description, sort_order
        ) values (
          ${payload.degree}, ${payload.institution}, ${payload.fieldOfStudy}, ${payload.startYear}, ${payload.endYear},
          ${payload.isCurrent}, ${payload.result}, ${payload.description}, ${payload.sortOrder}
        )
      `
    }

    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Education updated." : "Education added.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save education.")
  }
}

export async function deleteEducationAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "education")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Education deletion failed.")
  }

  try {
    await sql`delete from education where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Education deleted.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete education.")
  }
}

export async function saveSkillAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "skills")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
    const id = normalizeOptional(formData.get("id"))
    const payload = {
      name: String(formData.get("name") || "").trim(),
      category: String(formData.get("category") || "").trim().toLowerCase().replace(/\s+/g, "_"),
      level: normalizeNumber(formData.get("level"), 75),
      iconName: normalizeOptional(formData.get("icon_name")),
      isFeatured: normalizeCheckbox(formData.get("is_featured")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.name || !payload.category) {
      redirectToDashboard(tab, "error", "Skill name and category are required.")
    }

    if (id) {
      await sql`
        update skills
        set
          name = ${payload.name},
          category = ${payload.category},
          level = ${payload.level},
          icon_name = ${payload.iconName},
          is_featured = ${payload.isFeatured},
          sort_order = ${payload.sortOrder}
        where id = ${id}
      `
    } else {
      await sql`
        insert into skills (name, category, level, icon_name, is_featured, sort_order)
        values (${payload.name}, ${payload.category}, ${payload.level}, ${payload.iconName}, ${payload.isFeatured}, ${payload.sortOrder})
      `
    }

    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Skill updated." : "Skill added.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save skill.")
  }
}

export async function deleteSkillAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "skills")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Skill deletion failed.")
  }

  try {
    await sql`delete from skills where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Skill deleted.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete skill.")
  }
}

export async function saveExperienceAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "experience")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
    const id = normalizeOptional(formData.get("id"))
    const payload = {
      title: String(formData.get("title") || "").trim(),
      organization: String(formData.get("organization") || "").trim(),
      employmentType: normalizeOptional(formData.get("employment_type")),
      location: normalizeOptional(formData.get("location")),
      startDate: normalizeOptional(formData.get("start_date")),
      endDate: normalizeOptional(formData.get("end_date")),
      isCurrent: normalizeCheckbox(formData.get("is_current")),
      description: normalizeOptional(formData.get("description")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.title || !payload.organization) {
      redirectToDashboard(tab, "error", "Experience title and organization are required.")
    }

    let experienceId = id

    if (id) {
      await sql`
        update experiences
        set
          title = ${payload.title},
          organization = ${payload.organization},
          employment_type = ${payload.employmentType},
          location = ${payload.location},
          start_date = ${payload.startDate},
          end_date = ${payload.endDate},
          is_current = ${payload.isCurrent},
          description = ${payload.description},
          sort_order = ${payload.sortOrder},
          updated_at = now()
        where id = ${id}
      `
    } else {
      const inserted = await sql`
        insert into experiences (
          title, organization, employment_type, location, start_date, end_date, is_current, description, sort_order
        ) values (
          ${payload.title}, ${payload.organization}, ${payload.employmentType}, ${payload.location}, ${payload.startDate},
          ${payload.endDate}, ${payload.isCurrent}, ${payload.description}, ${payload.sortOrder}
        )
        returning id
      `
      experienceId = inserted[0].id
    }

    await replaceHighlights(sql, experienceId, formData.get("highlights"))
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Experience updated." : "Experience added.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save experience.")
  }
}

export async function deleteExperienceAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "experience")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Experience deletion failed.")
  }

  try {
    await sql`delete from experiences where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Experience deleted.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete experience.")
  }
}

export async function saveResearchAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "research")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
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

    if (!payload.title) {
      redirectToDashboard(tab, "error", "Research title is required.")
    }

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

    await replaceTags(sql, "research_tags", recordId, formData.get("tags"))
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Research item updated." : "Research item added.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save research item.")
  }
}

export async function deleteResearchAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "research")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Research deletion failed.")
  }

  try {
    await sql`delete from research_items where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Research item deleted.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete research item.")
  }
}

export async function saveSocialLinkAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "socials")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
    const id = normalizeOptional(formData.get("id"))
    const platform = String(formData.get("platform") || "").trim().toLowerCase()
    const payload = {
      platform,
      label: normalizeOptional(formData.get("label")) || platform.replace(/[_-]/g, " ").replace(/\b\w/g, (match) => match.toUpperCase()),
      url: String(formData.get("url") || "").trim(),
      iconName: normalizeOptional(formData.get("icon_name")) || platform,
      sortOrder: normalizeNumber(formData.get("sort_order")),
      isVisible: normalizeCheckbox(formData.get("is_visible")),
    }

    if (!payload.platform || !payload.url) {
      redirectToDashboard(tab, "error", "Social platform and URL are required.")
    }

    if (id) {
      await sql`
        update social_links
        set
          platform = ${payload.platform},
          label = ${payload.label},
          url = ${payload.url},
          icon_name = ${payload.iconName},
          sort_order = ${payload.sortOrder},
          is_visible = ${payload.isVisible}
        where id = ${id}
      `
    } else {
      await sql`
        insert into social_links (platform, label, url, icon_name, sort_order, is_visible)
        values (${payload.platform}, ${payload.label}, ${payload.url}, ${payload.iconName}, ${payload.sortOrder}, ${payload.isVisible})
      `
    }

    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Social link updated." : "Social link added.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save social link.")
  }
}

export async function deleteSocialLinkAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "socials")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Social link deletion failed.")
  }

  try {
    await sql`delete from social_links where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Social link deleted.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete social link.")
  }
}

export async function saveAchievementAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "achievements")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
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

    if (!payload.title) {
      redirectToDashboard(tab, "error", "Achievement title is required.")
    }

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

    await replaceTags(sql, "achievement_tags", recordId, formData.get("tags"))
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Achievement updated." : "Achievement added.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to save achievement.")
  }
}

export async function deleteAchievementAction(formData) {
  const sql = getSql()
  const tab = getReturnTab(formData, "achievements")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Achievement deletion failed.")
  }

  try {
    await sql`delete from achievements where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Achievement deleted.")
  } catch (error) {
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete achievement.")
  }
}
