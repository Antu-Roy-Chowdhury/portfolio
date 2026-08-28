"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import {
  clearAdminSession,
  createAdminSession,
  getAdminDashboardPath,
  getAdminLoginPath,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/admin-auth"
import { getSql } from "@/lib/neon"
import {
  assertDateOrder,
  assertYearOrder,
  checkboxValue,
  colorValue,
  dateValue,
  emailValue,
  friendlyMutationError,
  integerValue,
  optionalText,
  slugValue,
  tokenValue,
  uniqueCsv,
  uniqueLines,
  urlValue,
  yearValue,
  numberValue,
} from "@/lib/admin-validation"

function normalizeCheckbox(value) {
  return checkboxValue(value)
}

function normalizeOptional(value) {
  return optionalText(value)
}

function normalizeNumber(value, fallback = 0, label = "Sort order") {
  return integerValue(value, label, { fallback })
}

function normalizeToken(value) {
  const text = String(value || "").trim()
  return text ? tokenValue(text, "Value") : ""
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
  const techNames = uniqueCsv(techValue)

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
  const highlights = uniqueLines(highlightsValue)

  await sql`delete from experience_highlights where experience_id = ${experienceId}`

  for (const [index, highlight] of highlights.entries()) {
    await sql`
      insert into experience_highlights (experience_id, highlight, sort_order)
      values (${experienceId}, ${highlight}, ${index})
    `
  }
}

async function replaceTags(sql, tableName, recordId, tagsValue) {
  const tags = uniqueCsv(tagsValue)

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
  for (const path of [...basePaths, ...extraPaths].filter(Boolean)) {
    revalidatePath(path)
  }
}

function rethrowRedirect(error) {
  if (isRedirectError(error)) {
    throw error
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
  await requireAdmin()
  await clearAdminSession()
  redirect(getAdminLoginPath())
}

export async function saveSiteSettingsAction(formData) {
  await requireAdmin()
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
      primaryEmail: emailValue(formData.get("primary_email"), "Primary email"),
      phone: normalizeOptional(formData.get("phone")),
      location: normalizeOptional(formData.get("location")),
      resumeUrl: urlValue(formData.get("resume_url"), "Resume URL", { allowRelative: true }),
      portraitImageUrl: urlValue(formData.get("portrait_image_url"), "Portrait image URL", { allowRelative: true }),
      logoUrl: urlValue(formData.get("logo_url"), "Logo image URL", { allowRelative: true }),
      footerText: normalizeOptional(formData.get("footer_text")),
      dotBgEnabled: normalizeCheckbox(formData.get("dot_bg_enabled")),
      dotBgColor: colorValue(formData.get("dot_bg_color") || "#2a2a2a", "Dot background color"),
      dotHighlightColor: colorValue(formData.get("dot_highlight_color") || "#ffffff", "Dot highlight color"),
      dotHoverGlow: colorValue(formData.get("dot_hover_glow") || "#7dd3fc", "Dot hover glow"),
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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save site settings."))
  }
}

export async function saveHomeSectionAction(formData) {
  await requireAdmin()
  const sql = getSql()
  const tab = getReturnTab(formData, "home-sections")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
    const id = normalizeOptional(formData.get("id"))
    const payload = {
      sectionKey: normalizeToken(formData.get("section_key")),
      title: normalizeOptional(formData.get("title")),
      subtitle: normalizeOptional(formData.get("subtitle")),
      description: normalizeOptional(formData.get("description")),
      badge: normalizeOptional(formData.get("badge")),
      primaryButtonLabel: normalizeOptional(formData.get("primary_button_label")),
      primaryButtonUrl: urlValue(formData.get("primary_button_url"), "Primary button URL", { allowRelative: true }),
      secondaryButtonLabel: normalizeOptional(formData.get("secondary_button_label")),
      secondaryButtonUrl: urlValue(formData.get("secondary_button_url"), "Secondary button URL", { allowRelative: true }),
      imageUrl: urlValue(formData.get("image_url"), "Image URL", { allowRelative: true }),
      researchInterestScore: numberValue(formData.get("research_interest_score"), "Research Interest Score", {
        fallback: 0,
        min: 0,
        max: 100,
      }),
      isActive: normalizeCheckbox(formData.get("is_active")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.sectionKey) {
      redirectToDashboard(tab, "error", "Section key is required.")
    }

    if (id) {
      const existing = await sql`select section_key from home_sections where id = ${id} limit 1`
      if (!existing[0]) redirectToDashboard(tab, "error", "Home section no longer exists.")
      if (existing[0].section_key !== payload.sectionKey) {
        redirectToDashboard(tab, "error", "Section keys are stable after publishing and cannot be changed here.")
      }
      await sql`
        update home_sections
        set
          section_key = ${payload.sectionKey},
          title = ${payload.title},
          subtitle = ${payload.subtitle},
          description = ${payload.description},
          badge = ${payload.badge},
          primary_button_label = ${payload.primaryButtonLabel},
          primary_button_url = ${payload.primaryButtonUrl},
          secondary_button_label = ${payload.secondaryButtonLabel},
          secondary_button_url = ${payload.secondaryButtonUrl},
          image_url = ${payload.imageUrl},
          research_interest_score = ${payload.researchInterestScore},
          is_active = ${payload.isActive},
          sort_order = ${payload.sortOrder},
          updated_at = now()
        where id = ${id}
      `
    } else {
      await sql`
        insert into home_sections (
          section_key, title, subtitle, description, badge, primary_button_label,
          primary_button_url, secondary_button_label, secondary_button_url, image_url,
          research_interest_score, is_active, sort_order
        ) values (
          ${payload.sectionKey}, ${payload.title}, ${payload.subtitle}, ${payload.description},
          ${payload.badge}, ${payload.primaryButtonLabel}, ${payload.primaryButtonUrl},
          ${payload.secondaryButtonLabel}, ${payload.secondaryButtonUrl}, ${payload.imageUrl},
          ${payload.researchInterestScore}, ${payload.isActive}, ${payload.sortOrder}
        )
      `
    }

    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Home section updated." : "Home section added.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save home section."))
  }
}

export async function deleteHomeSectionAction(formData) {
  await requireAdmin()
  const sql = getSql()
  const tab = getReturnTab(formData, "home-sections")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Home section deletion failed.")
  }

  try {
    await sql`delete from home_sections where id = ${id}`
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Home section deleted.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete home section.")
  }
}

export async function saveProjectAction(formData) {
  await requireAdmin()
  const sql = getSql()
  const tab = getReturnTab(formData, "projects")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
    const id = normalizeOptional(formData.get("id"))
    const payload = {
      slug: slugValue(formData.get("slug")),
      title: String(formData.get("title") || "").trim(),
      shortDescription: normalizeOptional(formData.get("short_description")),
      fullDescription: normalizeOptional(formData.get("full_description")),
      coverImageUrl: urlValue(formData.get("cover_image_url"), "Cover image URL", { allowRelative: true }),
      category: normalizeOptional(formData.get("category")),
      githubUrl: urlValue(formData.get("github_url"), "GitHub URL"),
      liveUrl: urlValue(formData.get("live_url"), "Live URL", { allowRelative: true }),
      caseStudyUrl: urlValue(formData.get("case_study_url"), "Case study URL", { allowRelative: true }),
      status: normalizeOptional(formData.get("status")) || "completed",
      featured: normalizeCheckbox(formData.get("featured")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.slug || !payload.title) {
      redirectToDashboard(tab, "error", "Project title and slug are required.")
    }

    let previousSlug = null
    await sql.begin(async (transaction) => {
      let projectId = id
      if (id) {
        const existing = await transaction`select slug from projects where id = ${id} limit 1`
        if (!existing[0]) throw new Error("Project no longer exists.")
        previousSlug = existing[0].slug
        await transaction`
          update projects
          set
            slug = ${payload.slug}, title = ${payload.title}, short_description = ${payload.shortDescription},
            full_description = ${payload.fullDescription}, cover_image_url = ${payload.coverImageUrl},
            category = ${payload.category}, github_url = ${payload.githubUrl}, live_url = ${payload.liveUrl},
            case_study_url = ${payload.caseStudyUrl}, status = ${payload.status}, featured = ${payload.featured},
            sort_order = ${payload.sortOrder}, updated_at = now()
          where id = ${id}
        `
        if (previousSlug !== payload.slug) {
          await transaction`
            update skills
            set applied_in_projects = array_replace(applied_in_projects, ${`project:${previousSlug}`}, ${`project:${payload.slug}`})
          `
        }
      } else {
        const inserted = await transaction`
          insert into projects (
            slug, title, short_description, full_description, cover_image_url, category,
            github_url, live_url, case_study_url, status, featured, sort_order
          ) values (
            ${payload.slug}, ${payload.title}, ${payload.shortDescription}, ${payload.fullDescription},
            ${payload.coverImageUrl}, ${payload.category}, ${payload.githubUrl}, ${payload.liveUrl},
            ${payload.caseStudyUrl}, ${payload.status}, ${payload.featured}, ${payload.sortOrder}
          ) returning id
        `
        projectId = inserted[0].id
      }
      await replaceProjectTechnologies(transaction, projectId, formData.get("tech_stack"))
    })
    revalidatePortfolioPaths(`/projects/${payload.slug}`, previousSlug ? `/projects/${previousSlug}` : null)
    redirectToDashboard(tab, "success", id ? "Project updated." : "Project added.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save project."))
  }
}

export async function deleteProjectAction(formData) {
  await requireAdmin()
  const sql = getSql()
  const tab = getReturnTab(formData, "projects")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Project deletion failed.")
  }

  try {
    await sql.begin(async (transaction) => {
      const rows = await transaction`select slug from projects where id = ${id} limit 1`
      const slug = rows[0]?.slug
      if (!slug) throw new Error("Project no longer exists.")
      await transaction`
        update skills
        set applied_in_projects = array_remove(array_remove(applied_in_projects, ${`project:${slug}`}), ${slug})
      `
      await transaction`delete from projects where id = ${id}`
    })
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Project deleted.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete project.")
  }
}

export async function saveCertificationAction(formData) {
  await requireAdmin()
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
      issueDate: dateValue(formData.get("issue_date"), "Issue date"),
      credentialId: normalizeOptional(formData.get("credential_id")),
      credentialUrl: urlValue(formData.get("credential_url"), "Credential URL"),
      imageUrl: urlValue(formData.get("image_url"), "Certificate image URL", { allowRelative: true }),
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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save certification."))
  }
}

export async function deleteCertificationAction(formData) {
  await requireAdmin()
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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete certification.")
  }
}

export async function saveEducationAction(formData) {
  await requireAdmin()
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
      startYear: yearValue(formData.get("start_year"), "Start year"),
      endYear: yearValue(formData.get("end_year"), "End year"),
      isCurrent: normalizeCheckbox(formData.get("is_current")),
      result: normalizeOptional(formData.get("result")),
      coreFocus: normalizeOptional(formData.get("core_focus")),
      imageUrl: urlValue(formData.get("image_url"), "Education image URL", { allowRelative: true }),
      description: normalizeOptional(formData.get("description")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.degree || !payload.institution) {
      redirectToDashboard(tab, "error", "Education degree and institution are required.")
    }
    if (payload.isCurrent) payload.endYear = null
    assertYearOrder(payload.startYear, payload.endYear)

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
          core_focus = ${payload.coreFocus},
          image_url = ${payload.imageUrl},
          description = ${payload.description},
          sort_order = ${payload.sortOrder}
        where id = ${id}
      `
    } else {
      await sql`
        insert into education (
          degree, institution, field_of_study, start_year, end_year, is_current, result, core_focus, image_url, description, sort_order
        ) values (
          ${payload.degree}, ${payload.institution}, ${payload.fieldOfStudy}, ${payload.startYear}, ${payload.endYear},
          ${payload.isCurrent}, ${payload.result}, ${payload.coreFocus}, ${payload.imageUrl}, ${payload.description}, ${payload.sortOrder}
        )
      `
    }

    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Education updated." : "Education added.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save education."))
  }
}

export async function deleteEducationAction(formData) {
  await requireAdmin()
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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete education.")
  }
}

export async function saveSkillAction(formData) {
  await requireAdmin()
  const sql = getSql()
  const tab = getReturnTab(formData, "skills")

  if (!sql) {
    redirectToDashboard(tab, "error", "Database connection is missing.")
  }

  try {
    const id = normalizeOptional(formData.get("id"))
    const categoryCustom = normalizeToken(formData.get("category_custom"))
    const categoryPreset = normalizeToken(formData.get("category_preset"))
    const payload = {
      name: String(formData.get("name") || "").trim(),
      category: categoryCustom || categoryPreset || normalizeToken(formData.get("category")),
      proficiencyBucket: normalizeOptional(formData.get("proficiency_bucket")) || "core",
      isFeatured: normalizeCheckbox(formData.get("is_featured")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
      appliedInProjects: formData
        .getAll("applied_in_projects")
        .map((item) => String(item || "").trim())
        .filter(Boolean),
    }

    if (!payload.name || !payload.category) {
      redirectToDashboard(tab, "error", "Skill name and category are required.")
    }
    if (!['core', 'familiar'].includes(payload.proficiencyBucket)) {
      redirectToDashboard(tab, "error", "Choose a valid proficiency bucket.")
    }
    const validReferences = new Set([
      ...(await sql`select slug from projects`).map((item) => `project:${item.slug}`),
      ...(await sql`select id from research_items`).map((item) => `research:${item.id}`),
    ])
    if (payload.appliedInProjects.some((reference) => !validReferences.has(reference))) {
      redirectToDashboard(tab, "error", "One or more linked projects or research items no longer exist.")
    }

    if (id) {
      await sql`
        update skills
        set
          name = ${payload.name},
          category = ${payload.category},
          proficiency_bucket = ${payload.proficiencyBucket},
          is_featured = ${payload.isFeatured},
          sort_order = ${payload.sortOrder},
          applied_in_projects = ${payload.appliedInProjects}
        where id = ${id}
      `
    } else {
      await sql`
        insert into skills (name, category, proficiency_bucket, is_featured, sort_order, applied_in_projects)
        values (${payload.name}, ${payload.category}, ${payload.proficiencyBucket}, ${payload.isFeatured}, ${payload.sortOrder}, ${payload.appliedInProjects})
      `
    }

    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Skill updated." : "Skill added.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save skill."))
  }
}

export async function deleteSkillAction(formData) {
  await requireAdmin()
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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete skill.")
  }
}

export async function saveExperienceAction(formData) {
  await requireAdmin()
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
      startDate: dateValue(formData.get("start_date"), "Start date"),
      endDate: dateValue(formData.get("end_date"), "End date"),
      isCurrent: normalizeCheckbox(formData.get("is_current")),
      description: normalizeOptional(formData.get("description")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.title || !payload.organization) {
      redirectToDashboard(tab, "error", "Experience title and organization are required.")
    }
    if (payload.isCurrent) payload.endDate = null
    assertDateOrder(payload.startDate, payload.endDate)

    await sql.begin(async (transaction) => {
      let experienceId = id
      if (id) {
        const updated = await transaction`
          update experiences
          set title = ${payload.title}, organization = ${payload.organization}, employment_type = ${payload.employmentType},
              location = ${payload.location}, start_date = ${payload.startDate}, end_date = ${payload.endDate},
              is_current = ${payload.isCurrent}, description = ${payload.description}, sort_order = ${payload.sortOrder}, updated_at = now()
          where id = ${id} returning id
        `
        if (!updated[0]) throw new Error("Experience no longer exists.")
      } else {
        const inserted = await transaction`
          insert into experiences (title, organization, employment_type, location, start_date, end_date, is_current, description, sort_order)
          values (${payload.title}, ${payload.organization}, ${payload.employmentType}, ${payload.location}, ${payload.startDate},
                  ${payload.endDate}, ${payload.isCurrent}, ${payload.description}, ${payload.sortOrder}) returning id
        `
        experienceId = inserted[0].id
      }
      await replaceHighlights(transaction, experienceId, formData.get("highlights"))
    })
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Experience updated." : "Experience added.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save experience."))
  }
}

export async function deleteExperienceAction(formData) {
  await requireAdmin()
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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete experience.")
  }
}

export async function saveResearchAction(formData) {
  await requireAdmin()
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
      authors: normalizeOptional(formData.get("authors")),
      publicationDate: dateValue(formData.get("publication_date"), "Publication date"),
      status: normalizeOptional(formData.get("status")) || "in_progress",
      paperUrl: urlValue(formData.get("paper_url"), "Paper URL", { allowRelative: true }),
      pdfUrl: urlValue(formData.get("pdf_url"), "PDF URL"),
      codeUrl: urlValue(formData.get("code_url"), "Code URL"),
      imageUrl: urlValue(formData.get("image_url"), "Research image URL", { allowRelative: true }),
      citationCount: integerValue(formData.get("citation_count"), "Citation count", { fallback: 0, min: 0 }),
      featured: normalizeCheckbox(formData.get("featured")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.title) {
      redirectToDashboard(tab, "error", "Research title is required.")
    }

    await sql.begin(async (transaction) => {
      let recordId = id
      if (id) {
        const updated = await transaction`
          update research_items
          set item_type = ${payload.itemType}, title = ${payload.title}, short_description = ${payload.shortDescription},
              abstract = ${payload.abstract}, event_or_journal = ${payload.eventOrJournal}, authors = ${payload.authors},
              publication_date = ${payload.publicationDate}, status = ${payload.status}, paper_url = ${payload.paperUrl},
              pdf_url = ${payload.pdfUrl}, code_url = ${payload.codeUrl}, image_url = ${payload.imageUrl},
              citation_count = ${payload.citationCount}, featured = ${payload.featured},
              sort_order = ${payload.sortOrder}, updated_at = now()
          where id = ${id} returning id
        `
        if (!updated[0]) throw new Error("Research item no longer exists.")
      } else {
        const inserted = await transaction`
          insert into research_items (item_type, title, short_description, abstract, event_or_journal, authors, publication_date,
            status, paper_url, pdf_url, code_url, image_url, citation_count, featured, sort_order)
          values (${payload.itemType}, ${payload.title}, ${payload.shortDescription}, ${payload.abstract}, ${payload.eventOrJournal},
            ${payload.authors}, ${payload.publicationDate}, ${payload.status}, ${payload.paperUrl}, ${payload.pdfUrl},
            ${payload.codeUrl}, ${payload.imageUrl}, ${payload.citationCount}, ${payload.featured}, ${payload.sortOrder}) returning id
        `
        recordId = inserted[0].id
      }
      await replaceTags(transaction, "research_tags", recordId, formData.get("tags"))
    })
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Research item updated." : "Research item added.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save research item."))
  }
}

export async function deleteResearchAction(formData) {
  await requireAdmin()
  const sql = getSql()
  const tab = getReturnTab(formData, "research")
  const id = normalizeOptional(formData.get("id"))

  if (!sql || !id) {
    redirectToDashboard(tab, "error", "Research deletion failed.")
  }

  try {
    await sql.begin(async (transaction) => {
      await transaction`
        update skills
        set applied_in_projects = array_remove(array_remove(applied_in_projects, ${`research:${id}`}), ${id})
      `
      await transaction`delete from research_items where id = ${id}`
    })
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", "Research item deleted.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete research item.")
  }
}

export async function saveSocialLinkAction(formData) {
  await requireAdmin()
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
      url: urlValue(formData.get("url"), "Social URL"),
      iconName: normalizeOptional(formData.get("icon_name")) || platform,
      sortOrder: normalizeNumber(formData.get("sort_order")),
      isVisible: normalizeCheckbox(formData.get("is_visible")),
    }

    if (!payload.platform || !payload.url) {
      redirectToDashboard(tab, "error", "Social platform and URL are required.")
    }
    const duplicate = id
      ? await sql`select id from social_links where lower(platform) = ${payload.platform} and id <> ${id} limit 1`
      : await sql`select id from social_links where lower(platform) = ${payload.platform} limit 1`
    if (duplicate[0]) redirectToDashboard(tab, "error", "A link for this platform already exists. Edit the existing item instead.")

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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save social link."))
  }
}

export async function deleteSocialLinkAction(formData) {
  await requireAdmin()
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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete social link.")
  }
}

export async function saveAchievementAction(formData) {
  await requireAdmin()
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
      achievementDate: dateValue(formData.get("achievement_date"), "Achievement date"),
      description: normalizeOptional(formData.get("description")),
      imageUrl: urlValue(formData.get("image_url"), "Achievement image URL", { allowRelative: true }),
      featured: normalizeCheckbox(formData.get("featured")),
      showOnHome: normalizeCheckbox(formData.get("show_on_home")),
      showOnProjects: normalizeCheckbox(formData.get("show_on_projects")),
      showOnResearch: normalizeCheckbox(formData.get("show_on_research")),
      sortOrder: normalizeNumber(formData.get("sort_order")),
    }

    if (!payload.title) {
      redirectToDashboard(tab, "error", "Achievement title is required.")
    }

    await sql.begin(async (transaction) => {
      let recordId = id
      if (id) {
        const updated = await transaction`
          update achievements
          set title = ${payload.title}, issuer = ${payload.issuer}, achievement_date = ${payload.achievementDate},
              description = ${payload.description}, image_url = ${payload.imageUrl}, featured = ${payload.featured},
              show_on_home = ${payload.showOnHome}, show_on_projects = ${payload.showOnProjects},
              show_on_research = ${payload.showOnResearch}, sort_order = ${payload.sortOrder}
          where id = ${id} returning id
        `
        if (!updated[0]) throw new Error("Achievement no longer exists.")
      } else {
        const inserted = await transaction`
          insert into achievements (title, issuer, achievement_date, description, image_url, featured,
            show_on_home, show_on_projects, show_on_research, sort_order)
          values (${payload.title}, ${payload.issuer}, ${payload.achievementDate}, ${payload.description},
                  ${payload.imageUrl}, ${payload.featured}, ${payload.showOnHome}, ${payload.showOnProjects},
                  ${payload.showOnResearch}, ${payload.sortOrder}) returning id
        `
        recordId = inserted[0].id
      }
      await replaceTags(transaction, "achievement_tags", recordId, formData.get("tags"))
    })
    revalidatePortfolioPaths()
    redirectToDashboard(tab, "success", id ? "Achievement updated." : "Achievement added.")
  } catch (error) {
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", friendlyMutationError(error, "Failed to save achievement."))
  }
}

export async function deleteAchievementAction(formData) {
  await requireAdmin()
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
    rethrowRedirect(error)
    console.error(error)
    redirectToDashboard(tab, "error", "Failed to delete achievement.")
  }
}
