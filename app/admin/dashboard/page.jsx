import AdminTabs from "@/components/admin/AdminTabs"
import CloudinaryImageField from "@/components/admin/CloudinaryImageField"
import SocialPlatformField from "@/components/admin/SocialPlatformField"
import CurrentPeriodFields from "@/components/admin/CurrentPeriodFields"
import { DeleteForm, SubmitButton } from "@/components/admin/AdminFormControls"
import {
  deleteAchievementAction,
  deleteCertificationAction,
  deleteEducationAction,
  deleteExperienceAction,
  deleteHomeSectionAction,
  deleteProjectAction,
  deleteResearchAction,
  deleteSkillAction,
  deleteSocialLinkAction,
  logoutAction,
  saveAchievementAction,
  saveCertificationAction,
  saveEducationAction,
  saveExperienceAction,
  saveHomeSectionAction,
  saveProjectAction,
  saveResearchAction,
  saveSiteSettingsAction,
  saveSkillAction,
  saveSocialLinkAction,
} from "@/app/admin/actions"
import { requireAdmin } from "@/lib/admin-auth"
import { getAdminDashboardData } from "@/lib/admin-data"
import { getSkillCategoryLabel, SKILL_CATEGORY_OPTIONS, SKILL_PROFICIENCY_OPTIONS } from "@/lib/skill-config"

function AdminSection({ title, description, children }) {
  return (
    <section className="panel">
      <div className="mb-8">
        <h2 className="panel-title">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-400">{description}</p>
      </div>
      {children}
    </section>
  )
}

function TextField({ label, name, defaultValue = "", placeholder = "", required = false, type = "text", ...inputProps }) {
  return (
    <label className="space-y-2">
      <span className="block text-sm text-slate-300">{label}</span>
      <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} className="form-input" {...inputProps} />
    </label>
  )
}

function TextAreaField({ label, name, defaultValue = "", rows = 5, placeholder = "" }) {
  return (
    <label className="space-y-2">
      <span className="block text-sm text-slate-300">{label}</span>
      <textarea name={name} defaultValue={defaultValue} rows={rows} placeholder={placeholder} className="form-input min-h-28" />
    </label>
  )
}

function SelectField({ label, name, defaultValue = "", options = [] }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-300">{label}</label>
      <select name={name} defaultValue={defaultValue} className="form-input">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function MultiSelectField({ label, name, defaultValue = [], options = [], helperText = "" }) {
  const selected = new Set(defaultValue)
  return (
    <div className="space-y-2">
      <p className="block text-sm text-slate-300">{label}</p>
      <div className="grid max-h-64 gap-2 overflow-y-auto rounded-[1.25rem] border border-white/10 bg-black/10 p-3 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
            <input type="checkbox" name={name} value={option.value} defaultChecked={selected.has(option.value)} />
            <span>{option.label}</span>
          </label>
        ))}
        {!options.length ? <p className="text-xs text-slate-500">Add a project or research item before linking evidence.</p> : null}
      </div>
      {helperText ? <p className="text-xs text-slate-500">{helperText}</p> : null}
    </div>
  )
}

function SkillCategoryFields({ defaultCategory = "" }) {
  const categoryIsPreset = SKILL_CATEGORY_OPTIONS.some((item) => item.value === defaultCategory)

  return (
    <>
      <SelectField
        label="Category preset"
        name="category_preset"
        defaultValue={categoryIsPreset ? defaultCategory : ""}
        options={[{ value: "", label: "Select a structured category" }, ...SKILL_CATEGORY_OPTIONS]}
      />
      <TextField
        label="Or create new category"
        name="category_custom"
        defaultValue={categoryIsPreset ? "" : defaultCategory}
        placeholder="robotics_research"
      />
    </>
  )
}

function SkillProficiencyField({ defaultValue = "core" }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-300">Proficiency bucket</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {SKILL_PROFICIENCY_OPTIONS.map((option) => (
          <label key={option.value} className="flex cursor-pointer items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <input type="radio" name="proficiency_bucket" value={option.value} defaultChecked={defaultValue === option.value} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function ActionMetaFields({ tab, id }) {
  return (
    <>
      <input type="hidden" name="return_tab" value={tab} />
      {id ? <input type="hidden" name="id" value={id} /> : null}
    </>
  )
}

function toDateInputValue(value) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

function getTimeline(item) {
  const start = item.start_date ? new Date(item.start_date).getFullYear() : "Start?"
  const end = item.is_current ? "Present" : item.end_date ? new Date(item.end_date).getFullYear() : "Now"
  return `${start} - ${end}`
}

function ManagementCard({ badge, meta, title, children, deleteAction, deleteId, tab }) {
  return (
    <details className="rounded-[1.7rem] border border-white/10 bg-black/10 p-5 open:bg-white/[0.04]">
      <summary className="flex cursor-pointer list-none flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {badge ? <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-sky-100">{badge}</span> : null}
            {meta ? <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-400">{meta}</span> : null}
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">Open editor</span>
      </summary>

      <div className="mt-6 border-t border-white/10 pt-6">
        {children}
        {deleteAction && deleteId ? (
          <DeleteForm action={deleteAction} id={deleteId} tab={tab} title={title} />
        ) : null}
      </div>
    </details>
  )
}

export default async function AdminDashboardPage({ searchParams }) {
  const session = await requireAdmin()
  const params = await searchParams
  const status = params?.status || ""
  const message = params?.message || ""
  const activeTab = params?.tab || "overview"
  const {
    achievements,
    certifications,
    educationItems,
    experienceItems,
    homeSections,
    loadErrors,
    projects,
    researchItems,
    siteSettings,
    skills,
    socialLinks,
  } = await getAdminDashboardData()

  const skillApplicationOptions = [
    ...projects.map((project) => ({ value: `project:${project.slug}`, label: `Project: ${project.title}` })),
    ...researchItems.map((item) => ({ value: `research:${item.id}`, label: `Research: ${item.title}` })),
  ]

  const noticeTone =
    status === "success"
      ? "border-emerald-300/20 bg-emerald-300/10 text-emerald-100"
      : status === "error"
        ? "border-rose-300/20 bg-rose-300/10 text-rose-100"
        : ""

  const adminSections = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <section className="space-y-6">
          <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
            {[
              ["Projects", projects.length],
              ["Research", researchItems.length],
              ["Skills", skills.length],
              ["Experience", experienceItems.length],
              ["Home sections", homeSections.length],
              ["Social links", socialLinks.length],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <p className="text-sm text-slate-400">{label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
              </div>
            ))}
          </section>
        </section>
      ),
    },
    {
      id: "site-settings",
      label: "Global Site Settings",
      content: (
        <AdminSection
          title="Global site settings"
          description="These values control the public identity of the portfolio. Update your name, portrait, resume link, and dotted background colors here."
        >
          <form action={saveSiteSettingsAction} data-admin-editor="true" className="grid gap-5 lg:grid-cols-2">
            <ActionMetaFields tab="site-settings" id={siteSettings?.id || ""} />
            <TextField label="Site title" name="site_title" defaultValue={siteSettings?.site_title || ""} required />
            <TextField label="Primary email" name="primary_email" defaultValue={siteSettings?.primary_email || ""} />
            <TextField label="Phone" name="phone" defaultValue={siteSettings?.phone || ""} />
            <TextField label="Location" name="location" defaultValue={siteSettings?.location || ""} />
            <CloudinaryImageField
              name="resume_url"
              label="Resume PDF URL"
              defaultValue={siteSettings?.resume_url || ""}
              folder="portfolio/resume"
              mediaType="document"
              placeholder="https://res.cloudinary.com/.../raw/upload/.../resume.pdf"
            />
            <CloudinaryImageField name="portrait_image_url" label="Portrait image URL" defaultValue={siteSettings?.portrait_image_url || ""} folder="portfolio/portrait" />
            <CloudinaryImageField name="logo_url" label="Logo image URL" defaultValue={siteSettings?.logo_url || ""} folder="portfolio/brand" />
            <TextField label="Dot background color" name="dot_bg_color" defaultValue={siteSettings?.dot_bg_color || "#2a2a2a"} />
            <TextField label="Dot highlight color" name="dot_highlight_color" defaultValue={siteSettings?.dot_highlight_color || "#ffffff"} />
            <TextField label="Dot hover glow" name="dot_hover_glow" defaultValue={siteSettings?.dot_hover_glow || "#7dd3fc"} />
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="dot_bg_enabled" name="dot_bg_enabled" type="checkbox" defaultChecked={siteSettings?.dot_bg_enabled ?? true} />
              <label htmlFor="dot_bg_enabled" className="text-sm text-slate-300">
                Enable dotted animated background
              </label>
            </div>
            <div className="lg:col-span-2">
              <TextAreaField label="Site description" name="site_description" defaultValue={siteSettings?.site_description || ""} rows={4} />
            </div>
            <div className="lg:col-span-2">
              <TextAreaField label="Footer text" name="footer_text" defaultValue={siteSettings?.footer_text || ""} rows={3} />
            </div>
            <div className="lg:col-span-2">
              <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                Save site settings
              </SubmitButton>
            </div>
          </form>
        </AdminSection>
      ),
    },
    {
      id: "projects",
      label: "Projects",
      content: (
        <AdminSection
          title="Projects"
          description="Create and edit projects here. Tech stack should be comma-separated. Existing items are grouped in editor cards so the list stays manageable."
        >
          <form action={saveProjectAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <ActionMetaFields tab="projects" />
            <TextField label="Title" name="title" required placeholder="Project title" />
            <TextField label="Slug" name="slug" required placeholder="project-slug" />
            <TextField label="Category" name="category" placeholder="Web Platform" />
            <TextField label="Status" name="status" placeholder="completed or ongoing" />
            <TextField label="GitHub URL" name="github_url" placeholder="https://github.com/..." />
            <TextField label="Live URL" name="live_url" placeholder="https://..." />
            <TextField label="Case study URL" name="case_study_url" placeholder="Optional" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <div className="lg:col-span-2">
              <CloudinaryImageField
                name="cover_image_url"
                label="Cover image URL"
                folder="portfolio/projects"
                maxMegabytes={5}
                recommendedAspectRatio={3 / 2}
                helperText={"Recommended image size: 1200 × 800 px\nAspect ratio: 3:2\nMaximum size: 5 MB\nUse high-quality landscape images."}
              />
            </div>
            <div className="lg:col-span-2">
              <TextField label="Tech stack" name="tech_stack" placeholder="React, Next.js, PostgreSQL" />
            </div>
            <div className="lg:col-span-2">
              <TextAreaField label="Short description" name="short_description" rows={3} />
            </div>
            <div className="lg:col-span-2">
              <TextAreaField label="Full description" name="full_description" rows={5} />
            </div>
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="featured_project_new" name="featured" type="checkbox" />
              <label htmlFor="featured_project_new" className="text-sm text-slate-300">
                Feature this project on the homepage
              </label>
            </div>
            <div className="lg:col-span-2">
              <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                Add project
              </SubmitButton>
            </div>
          </form>

          <div className="mt-8 space-y-5">
            {projects.map((project) => (
              <ManagementCard
                key={project.id}
                badge={project.category || "Project"}
                meta={(project.tech_stack || []).slice(0, 3).join(" • ")}
                title={project.title}
                deleteAction={deleteProjectAction}
                deleteId={project.id}
                tab="projects"
              >
                <form action={saveProjectAction} data-admin-editor="true" className="grid gap-5 lg:grid-cols-2">
                  <ActionMetaFields tab="projects" id={project.id} />
                  <TextField label="Title" name="title" defaultValue={project.title} required />
                  <TextField label="Slug" name="slug" defaultValue={project.slug} required />
                  <TextField label="Category" name="category" defaultValue={project.category || ""} />
                  <TextField label="Status" name="status" defaultValue={project.status || "completed"} />
                  <TextField label="GitHub URL" name="github_url" defaultValue={project.github_url || ""} />
                  <TextField label="Live URL" name="live_url" defaultValue={project.live_url || ""} />
                  <TextField label="Case study URL" name="case_study_url" defaultValue={project.case_study_url || ""} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={project.sort_order ?? 0} />
                  <div className="lg:col-span-2">
                    <CloudinaryImageField
                      name="cover_image_url"
                      label="Cover image URL"
                      defaultValue={project.cover_image_url || ""}
                      folder="portfolio/projects"
                      maxMegabytes={5}
                      recommendedAspectRatio={3 / 2}
                      helperText={"Recommended image size: 1200 × 800 px\nAspect ratio: 3:2\nMaximum size: 5 MB\nUse high-quality landscape images."}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <TextField label="Tech stack" name="tech_stack" defaultValue={(project.tech_stack || []).join(", ")} />
                  </div>
                  <div className="lg:col-span-2">
                    <TextAreaField label="Short description" name="short_description" defaultValue={project.short_description || ""} rows={3} />
                  </div>
                  <div className="lg:col-span-2">
                    <TextAreaField label="Full description" name="full_description" defaultValue={project.full_description || ""} rows={5} />
                  </div>
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`featured-${project.id}`} name="featured" type="checkbox" defaultChecked={project.featured} />
                    <label htmlFor={`featured-${project.id}`} className="text-sm text-slate-300">
                      Featured project
                    </label>
                  </div>
                  <div className="lg:col-span-2">
                    <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                      Save project
                    </SubmitButton>
                  </div>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "home-sections",
      label: "Home Sections",
      content: (
        <AdminSection
          title="Home sections"
          description="Control hero copy, intro notes, and homepage strength cards here. Keep the section key stable once the section is live."
        >
          <form action={saveHomeSectionAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <ActionMetaFields tab="home-sections" />
            <TextField label="Section key" name="section_key" required placeholder="hero or strength_cv_healthcare_ai" />
            <TextField label="Title" name="title" placeholder="Section title" />
            <TextField label="Subtitle" name="subtitle" placeholder="Optional subtitle" />
            <TextField label="Badge" name="badge" placeholder="Optional hero badge" />
            <TextField label="Primary button label" name="primary_button_label" placeholder="Contact me" />
            <TextField label="Primary button URL" name="primary_button_url" placeholder="/contact" />
            <TextField label="Secondary button label" name="secondary_button_label" placeholder="Download CV" />
            <CloudinaryImageField
              name="secondary_button_url"
              label="Secondary button URL / CV PDF"
              folder="portfolio/resume"
              mediaType="document"
              maxMegabytes={15}
              placeholder="Paste a URL or upload a PDF"
              helperText="Upload a CV in PDF format (maximum 15 MB), or paste an existing URL."
            />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
           <TextField label="Research Interest Score (hero section, 0–100)" name="research_interest_score" type="number" min="0" max="100" step="any" defaultValue="0" /> 
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="home_section_active_new" name="is_active" type="checkbox" defaultChecked />
              <label htmlFor="home_section_active_new" className="text-sm text-slate-300">Visible on homepage</label>
            </div>
            <div className="lg:col-span-2">
              <CloudinaryImageField name="image_url" label="Image URL" folder="portfolio/home-sections" />
            </div>
            <div className="lg:col-span-2">
              <TextAreaField label="Description" name="description" rows={4} />
            </div>
            <div className="lg:col-span-2">
              <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                Add home section
              </SubmitButton>
            </div>
          </form>

          <div className="mt-8 space-y-5">
            {homeSections.map((item) => (
              <ManagementCard
                key={item.id}
                badge={item.section_key}
                meta={item.is_active ? "Active" : "Hidden"}
                title={item.title || item.subtitle || item.section_key}
                deleteAction={deleteHomeSectionAction}
                deleteId={item.id}
                tab="home-sections"
              >
                <form action={saveHomeSectionAction} data-admin-editor="true" className="grid gap-5 lg:grid-cols-2">
                  <ActionMetaFields tab="home-sections" id={item.id} />
                  <TextField label="Section key" name="section_key" defaultValue={item.section_key} required readOnly aria-readonly="true" />
                  <TextField label="Title" name="title" defaultValue={item.title || ""} />
                  <TextField label="Subtitle" name="subtitle" defaultValue={item.subtitle || ""} />
                  <TextField label="Badge" name="badge" defaultValue={item.badge || ""} />
                  <TextField label="Primary button label" name="primary_button_label" defaultValue={item.primary_button_label || ""} />
                  <TextField label="Primary button URL" name="primary_button_url" defaultValue={item.primary_button_url || ""} />
                  <TextField label="Secondary button label" name="secondary_button_label" defaultValue={item.secondary_button_label || ""} />
                  <CloudinaryImageField
                    name="secondary_button_url"
                    label="Secondary button URL / CV PDF"
                    defaultValue={item.secondary_button_url || ""}
                    folder="portfolio/resume"
                    mediaType="document"
                    maxMegabytes={15}
                    placeholder="Paste a URL or upload a PDF"
                    helperText="Upload a CV in PDF format (maximum 15 MB), or paste an existing URL."
                  />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <TextField
                    label="Research Interest Score (hero section, 0–100)"
                    name="research_interest_score"
                    type="number"
                    min="0"
                    max="100"
                    step="any"
                    defaultValue={item.research_interest_score ?? 0}
                  />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`home-section-active-${item.id}`} name="is_active" type="checkbox" defaultChecked={item.is_active} />
                    <label htmlFor={`home-section-active-${item.id}`} className="text-sm text-slate-300">Visible on homepage</label>
                  </div>
                  <div className="lg:col-span-2">
                    <CloudinaryImageField name="image_url" label="Image URL" defaultValue={item.image_url || ""} folder="portfolio/home-sections" />
                  </div>
                  <div className="lg:col-span-2">
                    <TextAreaField label="Description" name="description" defaultValue={item.description || ""} rows={4} />
                  </div>
                  <div className="lg:col-span-2">
                    <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                      Save home section
                    </SubmitButton>
                  </div>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "skills",
      label: "Skills",
      content: (
        <AdminSection
          title="Skills"
          description="Build a structured capability map here. Group skills by engineering domain, separate them into core or familiar buckets, and connect them to projects or research items for evidence."
        >
          <form action={saveSkillAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <ActionMetaFields tab="skills" />
            <TextField label="Skill name" name="name" required placeholder="Next.js" />
            <SkillCategoryFields />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <SkillProficiencyField />
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="skill_featured_new" name="is_featured" type="checkbox" />
              <label htmlFor="skill_featured_new" className="text-sm text-slate-300">Feature this skill</label>
            </div>
            <div className="lg:col-span-2">
              <MultiSelectField
                label="Applied in projects or research"
                name="applied_in_projects"
                options={skillApplicationOptions}
                helperText="Choose any number of linked projects or research items."
              />
            </div>
            <div className="lg:col-span-2">
              <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                Add skill
              </SubmitButton>
            </div>
          </form>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {skills.map((item) => (
              <ManagementCard
                key={item.id}
                badge={getSkillCategoryLabel(item.category)}
                meta={item.proficiency_bucket === "familiar" ? "Familiar / Secondary" : "Core Toolset"}
                title={item.name}
                deleteAction={deleteSkillAction}
                deleteId={item.id}
                tab="skills"
              >
                <form action={saveSkillAction} data-admin-editor="true" className="grid gap-5 lg:grid-cols-2">
                  <ActionMetaFields tab="skills" id={item.id} />
                  <TextField label="Skill name" name="name" defaultValue={item.name} required />
                  <SkillCategoryFields defaultCategory={item.category} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <SkillProficiencyField defaultValue={item.proficiency_bucket || "core"} />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`skill-featured-${item.id}`} name="is_featured" type="checkbox" defaultChecked={item.is_featured} />
                    <label htmlFor={`skill-featured-${item.id}`} className="text-sm text-slate-300">Feature this skill</label>
                  </div>
                  <div className="lg:col-span-2">
                    <MultiSelectField
                      label="Applied in projects or research"
                      name="applied_in_projects"
                      defaultValue={item.applied_in_projects || []}
                      options={skillApplicationOptions}
                      helperText="Linked items will appear in front-end hover proof tooltips."
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <p className="text-xs text-slate-500">
                      Current category: {getSkillCategoryLabel(item.category)} ({item.category})
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                      Save skill
                    </SubmitButton>
                  </div>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "experience",
      label: "Experience Timeline",
      content: (
        <AdminSection title="Experience timeline" description="This section powers the About page timeline. Use one highlight per line to keep the public summary clean.">
          <form action={saveExperienceAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <ActionMetaFields tab="experience" />
            <TextField label="Title" name="title" required placeholder="Co-Founder" />
            <TextField label="Organization" name="organization" required placeholder="Ukil Chamber" />
            <TextField label="Employment type" name="employment_type" placeholder="Full-time, Internship" />
            <TextField label="Location" name="location" placeholder="Rajshahi, Bangladesh" />
            <TextField label="Start date" name="start_date" type="date" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <CurrentPeriodFields checkboxId="experience_current_new" checkboxLabel="Current role" />
            <div className="lg:col-span-2">
              <TextAreaField label="Description" name="description" rows={4} />
            </div>
            <div className="lg:col-span-2">
              <TextAreaField label="Highlights" name="highlights" rows={4} placeholder={"One achievement per line"} />
            </div>
            <div className="lg:col-span-2">
              <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                Add experience
              </SubmitButton>
            </div>
          </form>

          <div className="mt-8 space-y-5">
            {experienceItems.map((item) => (
              <ManagementCard
                key={item.id}
                badge={item.employment_type || "Experience"}
                meta={getTimeline(item)}
                title={`${item.title} · ${item.organization}`}
                deleteAction={deleteExperienceAction}
                deleteId={item.id}
                tab="experience"
              >
                <form action={saveExperienceAction} data-admin-editor="true" className="grid gap-5 lg:grid-cols-2">
                  <ActionMetaFields tab="experience" id={item.id} />
                  <TextField label="Title" name="title" defaultValue={item.title} required />
                  <TextField label="Organization" name="organization" defaultValue={item.organization} required />
                  <TextField label="Employment type" name="employment_type" defaultValue={item.employment_type || ""} />
                  <TextField label="Location" name="location" defaultValue={item.location || ""} />
                  <TextField label="Start date" name="start_date" type="date" defaultValue={toDateInputValue(item.start_date)} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <CurrentPeriodFields
                    defaultCurrent={item.is_current}
                    defaultEnd={toDateInputValue(item.end_date)}
                    checkboxId={`experience-current-${item.id}`}
                    checkboxLabel="Current role"
                  />
                  <div className="lg:col-span-2">
                    <TextAreaField label="Description" name="description" defaultValue={item.description || ""} rows={4} />
                  </div>
                  <div className="lg:col-span-2">
                    <TextAreaField label="Highlights" name="highlights" defaultValue={(item.highlights || []).join("\n")} rows={4} />
                  </div>
                  <div className="lg:col-span-2">
                    <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                      Save experience
                    </SubmitButton>
                  </div>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "certifications",
      label: "Certifications",
      content: (
        <AdminSection title="Certifications" description="Store certificate details and optional image URLs for visual presentation on the public site.">
          <form action={saveCertificationAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5">
            <ActionMetaFields tab="certifications" />
            <TextField label="Title" name="title" required />
            <TextField label="Issuer" name="issuer" required />
            <TextField label="Issue date" name="issue_date" type="date" />
            <TextField label="Credential ID" name="credential_id" />
            <TextField label="Credential URL" name="credential_url" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <CloudinaryImageField name="image_url" label="Certificate image URL" folder="portfolio/certifications" />
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="cert_featured_new" name="is_featured" type="checkbox" />
              <label htmlFor="cert_featured_new" className="text-sm text-slate-300">Featured certificate</label>
            </div>
            <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
              Add certification
            </SubmitButton>
          </form>

          <div className="mt-8 space-y-5">
            {certifications.map((item) => (
              <ManagementCard
                key={item.id}
                badge={item.issuer}
                meta={item.issue_date ? new Date(item.issue_date).getFullYear() : ""}
                title={item.title}
                deleteAction={deleteCertificationAction}
                deleteId={item.id}
                tab="certifications"
              >
                <form action={saveCertificationAction} data-admin-editor="true" className="grid gap-5">
                  <ActionMetaFields tab="certifications" id={item.id} />
                  <TextField label="Title" name="title" defaultValue={item.title} required />
                  <TextField label="Issuer" name="issuer" defaultValue={item.issuer} required />
                  <TextField label="Issue date" name="issue_date" type="date" defaultValue={toDateInputValue(item.issue_date)} />
                  <TextField label="Credential ID" name="credential_id" defaultValue={item.credential_id || ""} />
                  <TextField label="Credential URL" name="credential_url" defaultValue={item.credential_url || ""} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <CloudinaryImageField name="image_url" label="Certificate image URL" defaultValue={item.image_url || ""} folder="portfolio/certifications" />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`cert-featured-${item.id}`} name="is_featured" type="checkbox" defaultChecked={item.is_featured} />
                    <label htmlFor={`cert-featured-${item.id}`} className="text-sm text-slate-300">Featured certificate</label>
                  </div>
                  <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                    Save certification
                  </SubmitButton>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "education",
      label: "Education",
      content: (
        <AdminSection title="Education" description="Keep academic details editable here, including degree updates, CGPA, and descriptions.">
          <form action={saveEducationAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <ActionMetaFields tab="education" />
            <TextField label="Degree" name="degree" required />
            <TextField label="Institution" name="institution" required />
            <TextField label="Field of study" name="field_of_study" />
            <TextField label="Start year" name="start_year" type="number" min="1900" max="2100" />
            <TextField label="Result" name="result" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <CurrentPeriodFields kind="year" checkboxId="education_current_new" checkboxLabel="Currently ongoing" />
            <div className="lg:col-span-2">
              <TextAreaField label="Core focus" name="core_focus" rows={3} placeholder="Core Focus: Digital Signal Processing, Embedded Systems, Machine Learning..." />
            </div>
            <div className="lg:col-span-2">
              <CloudinaryImageField name="image_url" label="Education / certificate preview image" folder="portfolio/education" />
            </div>
            <div className="lg:col-span-2">
              <TextAreaField label="Description" name="description" rows={4} />
            </div>
            <div className="lg:col-span-2">
              <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                Add education
              </SubmitButton>
            </div>
          </form>

          <div className="mt-8 space-y-5">
            {educationItems.map((item) => (
              <ManagementCard
                key={item.id}
                badge={item.field_of_study || "Education"}
                meta={`${item.start_year || ""}${item.start_year || item.end_year ? " - " : ""}${item.is_current ? "Present" : item.end_year || ""}`}
                title={`${item.degree} · ${item.institution}`}
                deleteAction={deleteEducationAction}
                deleteId={item.id}
                tab="education"
              >
                <form action={saveEducationAction} data-admin-editor="true" className="grid gap-5 lg:grid-cols-2">
                  <ActionMetaFields tab="education" id={item.id} />
                  <TextField label="Degree" name="degree" defaultValue={item.degree} required />
                  <TextField label="Institution" name="institution" defaultValue={item.institution} required />
                  <TextField label="Field of study" name="field_of_study" defaultValue={item.field_of_study || ""} />
                  <TextField label="Start year" name="start_year" type="number" min="1900" max="2100" defaultValue={item.start_year || ""} />
                  <TextField label="Result" name="result" defaultValue={item.result || ""} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <CurrentPeriodFields
                    kind="year"
                    defaultCurrent={item.is_current}
                    defaultEnd={item.end_year || ""}
                    checkboxId={`education-current-${item.id}`}
                    checkboxLabel="Currently ongoing"
                  />
                  <div className="lg:col-span-2">
                    <TextAreaField label="Core focus" name="core_focus" defaultValue={item.core_focus || ""} rows={3} />
                  </div>
                  <div className="lg:col-span-2">
                    <CloudinaryImageField
                      name="image_url"
                      label="Education / certificate preview image"
                      defaultValue={item.image_url || ""}
                      folder="portfolio/education"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <TextAreaField label="Description" name="description" defaultValue={item.description || ""} rows={4} />
                  </div>
                  <div className="lg:col-span-2">
                    <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                      Save education
                    </SubmitButton>
                  </div>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "research",
      label: "Research Items",
      content: (
        <AdminSection title="Research items" description="Manage published papers and ongoing research. Tags should be comma-separated.">
          <form action={saveResearchAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5">
            <ActionMetaFields tab="research" />
            <TextField label="Item type" name="item_type" defaultValue="conference" />
            <TextField label="Title" name="title" required />
            <TextField label="Venue or journal" name="event_or_journal" />
            <TextField label="Authors" name="authors" placeholder="Author 1, Author 2, Author 3" />
            <TextField label="Publication date" name="publication_date" type="date" />
            <TextField label="Status" name="status" defaultValue="in_progress" />
            <TextField label="Paper URL" name="paper_url" />
            <TextField label="Code / GitHub URL" name="code_url" />
            <TextField label="Citation count" name="citation_count" type="number" min="0" defaultValue="0" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <TextField label="Tags" name="tags" placeholder="Machine Learning, Accessibility" />
            <CloudinaryImageField name="image_url" label="Research image URL" folder="portfolio/research" />
            <CloudinaryImageField
              name="pdf_url"
              label="Research PDF URL"
              folder="portfolio/research-pdfs"
              mediaType="document"
              placeholder="https://res.cloudinary.com/.../raw/upload/.../paper.pdf"
            />
            <TextAreaField label="Short description" name="short_description" rows={3} />
            <TextAreaField label="Abstract" name="abstract" rows={5} />
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="research_featured_new" name="featured" type="checkbox" />
              <label htmlFor="research_featured_new" className="text-sm text-slate-300">Featured research item</label>
            </div>
            <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
              Add research item
            </SubmitButton>
          </form>

          <div className="mt-8 space-y-5">
            {researchItems.map((item) => (
              <ManagementCard
                key={item.id}
                badge={item.item_type || "Research"}
                meta={item.publication_date ? new Date(item.publication_date).getFullYear() : item.status}
                title={item.title}
                deleteAction={deleteResearchAction}
                deleteId={item.id}
                tab="research"
              >
                <form action={saveResearchAction} data-admin-editor="true" className="grid gap-5">
                  <ActionMetaFields tab="research" id={item.id} />
                  <TextField label="Item type" name="item_type" defaultValue={item.item_type || "research"} />
                  <TextField label="Title" name="title" defaultValue={item.title} required />
                  <TextField label="Venue or journal" name="event_or_journal" defaultValue={item.event_or_journal || ""} />
                  <TextField label="Authors" name="authors" defaultValue={item.authors || ""} />
                  <TextField label="Publication date" name="publication_date" type="date" defaultValue={toDateInputValue(item.publication_date)} />
                  <TextField label="Status" name="status" defaultValue={item.status || "in_progress"} />
                  <TextField label="Paper URL" name="paper_url" defaultValue={item.paper_url || ""} />
                  <TextField label="Code / GitHub URL" name="code_url" defaultValue={item.code_url || ""} />
                  <TextField label="Citation count" name="citation_count" type="number" min="0" defaultValue={item.citation_count ?? 0} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <TextField label="Tags" name="tags" defaultValue={(item.tags || []).join(", ")} />
                  <CloudinaryImageField name="image_url" label="Research image URL" defaultValue={item.image_url || ""} folder="portfolio/research" />
                  <CloudinaryImageField
                    name="pdf_url"
                    label="Research PDF URL"
                    defaultValue={item.pdf_url || ""}
                    folder="portfolio/research-pdfs"
                    mediaType="document"
                    placeholder="https://res.cloudinary.com/.../raw/upload/.../paper.pdf"
                  />
                  <TextAreaField label="Short description" name="short_description" defaultValue={item.short_description || ""} rows={3} />
                  <TextAreaField label="Abstract" name="abstract" defaultValue={item.abstract || ""} rows={5} />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`research-featured-${item.id}`} name="featured" type="checkbox" defaultChecked={item.featured} />
                    <label htmlFor={`research-featured-${item.id}`} className="text-sm text-slate-300">Featured research item</label>
                  </div>
                  <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                    Save research item
                  </SubmitButton>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "socials",
      label: "Social Links",
      content: (
        <AdminSection title="Social links" description="Manage the social tree here. Choose a platform button so the matching icon stays consistent across the site.">
          <form action={saveSocialLinkAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <ActionMetaFields tab="socials" />
            <div className="lg:col-span-2">
              <SocialPlatformField />
            </div>
            <TextField label="Label" name="label" placeholder="Facebook" />
            <TextField label="URL" name="url" required placeholder="https://..." />
            <TextField label="Icon name" name="icon_name" placeholder="Optional override" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="social_visible_new" name="is_visible" type="checkbox" defaultChecked />
              <label htmlFor="social_visible_new" className="text-sm text-slate-300">Visible on portfolio</label>
            </div>
            <div className="lg:col-span-2">
              <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                Add social link
              </SubmitButton>
            </div>
          </form>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {socialLinks.map((item) => (
              <ManagementCard
                key={item.id}
                badge={item.platform}
                meta={item.is_visible ? "Visible" : "Hidden"}
                title={item.label || item.platform}
                deleteAction={deleteSocialLinkAction}
                deleteId={item.id}
                tab="socials"
              >
                <form action={saveSocialLinkAction} data-admin-editor="true" className="grid gap-5">
                  <ActionMetaFields tab="socials" id={item.id} />
                  <SocialPlatformField defaultValue={item.platform} />
                  <TextField label="Label" name="label" defaultValue={item.label || ""} />
                  <TextField label="URL" name="url" defaultValue={item.url} required />
                  <TextField label="Icon name" name="icon_name" defaultValue={item.icon_name || ""} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`social-visible-${item.id}`} name="is_visible" type="checkbox" defaultChecked={item.is_visible} />
                    <label htmlFor={`social-visible-${item.id}`} className="text-sm text-slate-300">Visible on portfolio</label>
                  </div>
                  <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                    Save social link
                  </SubmitButton>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "achievements",
      label: "Recognitions",
      content: (
        <AdminSection title="Recognitions" description="Manage awards, contests, leadership milestones, and choose exactly where each recognition appears.">
          <form action={saveAchievementAction} data-admin-editor="true" className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <ActionMetaFields tab="achievements" />
            <TextField label="Title" name="title" required />
            <TextField label="Issuer or context" name="issuer" />
            <TextField label="Achievement date" name="achievement_date" type="date" />
            <TextField label="Tags" name="tags" placeholder="Leadership, Contest, Award" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <CloudinaryImageField name="image_url" label="Achievement image URL" folder="portfolio/achievements" />
            <div className="lg:col-span-2">
              <TextAreaField label="Description" name="description" rows={4} />
            </div>
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="achievement_featured_new" name="featured" type="checkbox" />
              <label htmlFor="achievement_featured_new" className="text-sm text-slate-300">Featured achievement</label>
            </div>
            <div className="grid gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4 lg:col-span-2 sm:grid-cols-3">
              <label className="flex items-center gap-3 text-sm text-slate-300"><input name="show_on_home" type="checkbox" /> Show on Home</label>
              <label className="flex items-center gap-3 text-sm text-slate-300"><input name="show_on_projects" type="checkbox" /> Show on Projects</label>
              <label className="flex items-center gap-3 text-sm text-slate-300"><input name="show_on_research" type="checkbox" /> Show on Research</label>
            </div>
            <div className="lg:col-span-2">
              <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                Add recognition
              </SubmitButton>
            </div>
          </form>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {achievements.map((item) => (
              <ManagementCard
                key={item.id}
                badge={(item.tags || []).slice(0, 2).join(" • ")}
                meta={item.achievement_date ? new Date(item.achievement_date).getFullYear() : item.issuer}
                title={item.title}
                deleteAction={deleteAchievementAction}
                deleteId={item.id}
                tab="achievements"
              >
                <form action={saveAchievementAction} data-admin-editor="true" className="grid gap-5">
                  <ActionMetaFields tab="achievements" id={item.id} />
                  <TextField label="Title" name="title" defaultValue={item.title} required />
                  <TextField label="Issuer or context" name="issuer" defaultValue={item.issuer || ""} />
                  <TextField label="Achievement date" name="achievement_date" type="date" defaultValue={toDateInputValue(item.achievement_date)} />
                  <TextField label="Tags" name="tags" defaultValue={(item.tags || []).join(", ")} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <CloudinaryImageField name="image_url" label="Achievement image URL" defaultValue={item.image_url || ""} folder="portfolio/achievements" />
                  <TextAreaField label="Description" name="description" defaultValue={item.description || ""} rows={4} />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`achievement-featured-${item.id}`} name="featured" type="checkbox" defaultChecked={item.featured} />
                    <label htmlFor={`achievement-featured-${item.id}`} className="text-sm text-slate-300">Featured achievement</label>
                  </div>
                  <div className="grid gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
                    <label className="flex items-center gap-3 text-sm text-slate-300"><input name="show_on_home" type="checkbox" defaultChecked={item.show_on_home} /> Show on Home</label>
                    <label className="flex items-center gap-3 text-sm text-slate-300"><input name="show_on_projects" type="checkbox" defaultChecked={item.show_on_projects} /> Show on Projects</label>
                    <label className="flex items-center gap-3 text-sm text-slate-300"><input name="show_on_research" type="checkbox" defaultChecked={item.show_on_research} /> Show on Research</label>
                  </div>
                  <SubmitButton className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200 disabled:cursor-wait disabled:opacity-60">
                    Save recognition
                  </SubmitButton>
                </form>
              </ManagementCard>
            ))}
          </div>
        </AdminSection>
      ),
    },
  ]

  return (
    <main className="min-h-screen bg-[#05080d] px-5 py-10 text-white">
      <div className="mx-auto max-w-[96rem] space-y-8">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="section-kicker">Admin dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-white">Portfolio control room</h1>
            <p className="mt-2 text-sm text-slate-400">Logged in as {session.email || session.username}</p>
          </div>
          <form action={logoutAction}>
            <button type="submit" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white transition hover:bg-white/10">
              Log out
            </button>
          </form>
        </div>
        {message ? <div className={`rounded-[1.5rem] border px-5 py-4 text-sm ${noticeTone}`}>{message}</div> : null}
        {loadErrors.length ? (
          <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 px-5 py-4 text-sm text-amber-100">
            {loadErrors.join(" ")} Saving affected sections is disabled by the database and will show an error.
          </div>
        ) : null}
        <AdminTabs initialTab={activeTab} sections={adminSections} />
      </div>
    </main>
  )
}
