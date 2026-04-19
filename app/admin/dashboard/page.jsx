import AdminTabs from "@/components/admin/AdminTabs"
import CloudinaryImageField from "@/components/admin/CloudinaryImageField"
import {
  deleteAchievementAction,
  deleteCertificationAction,
  deleteProjectAction,
  deleteResearchAction,
  logoutAction,
  saveAchievementAction,
  saveCertificationAction,
  saveProjectAction,
  saveResearchAction,
  saveSiteSettingsAction,
} from "@/app/admin/actions"
import { requireAdmin } from "@/lib/admin-auth"
import { getAdminDashboardData } from "@/lib/admin-data"

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

function TextField({ label, name, defaultValue = "", placeholder = "", required = false, type = "text" }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-300">{label}</label>
      <input name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} required={required} className="form-input" />
    </div>
  )
}

function TextAreaField({ label, name, defaultValue = "", rows = 5, placeholder = "" }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm text-slate-300">{label}</label>
      <textarea name={name} defaultValue={defaultValue} rows={rows} placeholder={placeholder} className="form-input min-h-28" />
    </div>
  )
}

function toDateInputValue(value) {
  if (!value) return ""
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ""
  return date.toISOString().slice(0, 10)
}

export default async function AdminDashboardPage() {
  const session = await requireAdmin()
  const { achievements, certifications, projects, researchItems, siteSettings } = await getAdminDashboardData()

  const adminSections = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <section className="grid gap-4 md:grid-cols-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Projects</p>
            <p className="mt-2 text-3xl font-semibold text-white">{projects.length}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Certificates</p>
            <p className="mt-2 text-3xl font-semibold text-white">{certifications.length}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Research items</p>
            <p className="mt-2 text-3xl font-semibold text-white">{researchItems.length}</p>
          </div>
          <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-400">Achievements</p>
            <p className="mt-2 text-3xl font-semibold text-white">{achievements.length}</p>
          </div>
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
          <form action={saveSiteSettingsAction} className="grid gap-5 lg:grid-cols-2">
            <input type="hidden" name="id" defaultValue={siteSettings?.id || ""} />
            <TextField label="Site title" name="site_title" defaultValue={siteSettings?.site_title || ""} required />
            <TextField label="Primary email" name="primary_email" defaultValue={siteSettings?.primary_email || ""} />
            <TextField label="Phone" name="phone" defaultValue={siteSettings?.phone || ""} />
            <TextField label="Location" name="location" defaultValue={siteSettings?.location || ""} />
            <TextField label="Resume URL" name="resume_url" defaultValue={siteSettings?.resume_url || ""} />
            <CloudinaryImageField name="portrait_image_url" label="Portrait image URL" defaultValue={siteSettings?.portrait_image_url || ""} />
            <CloudinaryImageField name="logo_url" label="Logo image URL" defaultValue={siteSettings?.logo_url || ""} />
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
              <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                Save site settings
              </button>
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
          description="Create projects one by one here. Tech stack should be comma-separated. You can paste a Cloudinary image URL or upload directly if the Cloudinary env vars are set."
        >
          <form action={saveProjectAction} className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <TextField label="Title" name="title" required placeholder="Project title" />
            <TextField label="Slug" name="slug" required placeholder="project-slug" />
            <TextField label="Category" name="category" placeholder="Web Platform" />
            <TextField label="Status" name="status" placeholder="completed or ongoing" />
            <TextField label="GitHub URL" name="github_url" placeholder="https://github.com/..." />
            <TextField label="Live URL" name="live_url" placeholder="https://..." />
            <TextField label="Case study URL" name="case_study_url" placeholder="Optional" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <div className="lg:col-span-2">
              <CloudinaryImageField name="cover_image_url" label="Cover image URL" />
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
              <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                Add project
              </button>
            </div>
          </form>

          <div className="mt-8 space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                <form action={saveProjectAction} className="grid gap-5 lg:grid-cols-2">
                  <input type="hidden" name="id" defaultValue={project.id} />
                  <TextField label="Title" name="title" defaultValue={project.title} required />
                  <TextField label="Slug" name="slug" defaultValue={project.slug} required />
                  <TextField label="Category" name="category" defaultValue={project.category || ""} />
                  <TextField label="Status" name="status" defaultValue={project.status || "completed"} />
                  <TextField label="GitHub URL" name="github_url" defaultValue={project.github_url || ""} />
                  <TextField label="Live URL" name="live_url" defaultValue={project.live_url || ""} />
                  <TextField label="Case study URL" name="case_study_url" defaultValue={project.case_study_url || ""} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={project.sort_order ?? 0} />
                  <div className="lg:col-span-2">
                    <CloudinaryImageField name="cover_image_url" label="Cover image URL" defaultValue={project.cover_image_url || ""} />
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
                  <div className="flex flex-wrap gap-3 lg:col-span-2">
                    <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                      Save project
                    </button>
                  </div>
                </form>
                <form action={deleteProjectAction} className="mt-4">
                  <input type="hidden" name="id" defaultValue={project.id} />
                  <button type="submit" className="text-sm text-rose-300 transition hover:text-rose-200">
                    Delete project
                  </button>
                </form>
              </div>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "certifications",
      label: "Certifications",
      content: (
        <AdminSection title="Certifications" description="Store certificate details and optional image URLs for later gallery-style presentation.">
          <form action={saveCertificationAction} className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5">
            <TextField label="Title" name="title" required />
            <TextField label="Issuer" name="issuer" required />
            <TextField label="Issue date" name="issue_date" type="date" />
            <TextField label="Credential ID" name="credential_id" />
            <TextField label="Credential URL" name="credential_url" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <CloudinaryImageField name="image_url" label="Certificate image URL" />
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="cert_featured_new" name="is_featured" type="checkbox" />
              <label htmlFor="cert_featured_new" className="text-sm text-slate-300">Featured certificate</label>
            </div>
            <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
              Add certification
            </button>
          </form>

          <div className="mt-8 space-y-5">
            {certifications.map((item) => (
              <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                <form action={saveCertificationAction} className="grid gap-5">
                  <input type="hidden" name="id" defaultValue={item.id} />
                  <TextField label="Title" name="title" defaultValue={item.title} required />
                  <TextField label="Issuer" name="issuer" defaultValue={item.issuer} required />
                  <TextField label="Issue date" name="issue_date" type="date" defaultValue={toDateInputValue(item.issue_date)} />
                  <TextField label="Credential ID" name="credential_id" defaultValue={item.credential_id || ""} />
                  <TextField label="Credential URL" name="credential_url" defaultValue={item.credential_url || ""} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <CloudinaryImageField name="image_url" label="Certificate image URL" defaultValue={item.image_url || ""} />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`cert-featured-${item.id}`} name="is_featured" type="checkbox" defaultChecked={item.is_featured} />
                    <label htmlFor={`cert-featured-${item.id}`} className="text-sm text-slate-300">Featured certificate</label>
                  </div>
                  <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                    Save certification
                  </button>
                </form>
                <form action={deleteCertificationAction} className="mt-4">
                  <input type="hidden" name="id" defaultValue={item.id} />
                  <button type="submit" className="text-sm text-rose-300 transition hover:text-rose-200">
                    Delete certification
                  </button>
                </form>
              </div>
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
          <form action={saveResearchAction} className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5">
            <TextField label="Item type" name="item_type" defaultValue="research" />
            <TextField label="Title" name="title" required />
            <TextField label="Venue or journal" name="event_or_journal" />
            <TextField label="Publication date" name="publication_date" type="date" />
            <TextField label="Status" name="status" defaultValue="in_progress" />
            <TextField label="Paper URL" name="paper_url" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <TextField label="Tags" name="tags" placeholder="Machine Learning, Accessibility" />
            <CloudinaryImageField name="image_url" label="Research image URL" />
            <TextAreaField label="Short description" name="short_description" rows={3} />
            <TextAreaField label="Abstract" name="abstract" rows={5} />
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="research_featured_new" name="featured" type="checkbox" />
              <label htmlFor="research_featured_new" className="text-sm text-slate-300">Featured research item</label>
            </div>
            <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
              Add research item
            </button>
          </form>

          <div className="mt-8 space-y-5">
            {researchItems.map((item) => (
              <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                <form action={saveResearchAction} className="grid gap-5">
                  <input type="hidden" name="id" defaultValue={item.id} />
                  <TextField label="Item type" name="item_type" defaultValue={item.item_type || "research"} />
                  <TextField label="Title" name="title" defaultValue={item.title} required />
                  <TextField label="Venue or journal" name="event_or_journal" defaultValue={item.event_or_journal || ""} />
                  <TextField label="Publication date" name="publication_date" type="date" defaultValue={toDateInputValue(item.publication_date)} />
                  <TextField label="Status" name="status" defaultValue={item.status || "in_progress"} />
                  <TextField label="Paper URL" name="paper_url" defaultValue={item.paper_url || ""} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <TextField label="Tags" name="tags" defaultValue={(item.tags || []).join(", ")} />
                  <CloudinaryImageField name="image_url" label="Research image URL" defaultValue={item.image_url || ""} />
                  <TextAreaField label="Short description" name="short_description" defaultValue={item.short_description || ""} rows={3} />
                  <TextAreaField label="Abstract" name="abstract" defaultValue={item.abstract || ""} rows={5} />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`research-featured-${item.id}`} name="featured" type="checkbox" defaultChecked={item.featured} />
                    <label htmlFor={`research-featured-${item.id}`} className="text-sm text-slate-300">Featured research item</label>
                  </div>
                  <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                    Save research item
                  </button>
                </form>
                <form action={deleteResearchAction} className="mt-4">
                  <input type="hidden" name="id" defaultValue={item.id} />
                  <button type="submit" className="text-sm text-rose-300 transition hover:text-rose-200">
                    Delete research item
                  </button>
                </form>
              </div>
            ))}
          </div>
        </AdminSection>
      ),
    },
    {
      id: "achievements",
      label: "Achievements",
      content: (
        <AdminSection title="Achievements" description="Use this for contests, awards, leadership milestones, and recognitions.">
          <form action={saveAchievementAction} className="grid gap-5 rounded-[1.5rem] border border-dashed border-white/15 bg-black/10 p-5 lg:grid-cols-2">
            <TextField label="Title" name="title" required />
            <TextField label="Issuer or context" name="issuer" />
            <TextField label="Achievement date" name="achievement_date" type="date" />
            <TextField label="Tags" name="tags" placeholder="Leadership, Contest, Award" />
            <TextField label="Sort order" name="sort_order" type="number" defaultValue="0" />
            <CloudinaryImageField name="image_url" label="Achievement image URL" />
            <div className="lg:col-span-2">
              <TextAreaField label="Description" name="description" rows={4} />
            </div>
            <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
              <input id="achievement_featured_new" name="featured" type="checkbox" />
              <label htmlFor="achievement_featured_new" className="text-sm text-slate-300">Featured achievement</label>
            </div>
            <div className="lg:col-span-2">
              <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                Add achievement
              </button>
            </div>
          </form>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {achievements.map((item) => (
              <div key={item.id} className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5">
                <form action={saveAchievementAction} className="grid gap-5">
                  <input type="hidden" name="id" defaultValue={item.id} />
                  <TextField label="Title" name="title" defaultValue={item.title} required />
                  <TextField label="Issuer or context" name="issuer" defaultValue={item.issuer || ""} />
                  <TextField label="Achievement date" name="achievement_date" type="date" defaultValue={toDateInputValue(item.achievement_date)} />
                  <TextField label="Tags" name="tags" defaultValue={(item.tags || []).join(", ")} />
                  <TextField label="Sort order" name="sort_order" type="number" defaultValue={item.sort_order ?? 0} />
                  <CloudinaryImageField name="image_url" label="Achievement image URL" defaultValue={item.image_url || ""} />
                  <TextAreaField label="Description" name="description" defaultValue={item.description || ""} rows={4} />
                  <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/10 bg-white/5 px-4 py-3">
                    <input id={`achievement-featured-${item.id}`} name="featured" type="checkbox" defaultChecked={item.featured} />
                    <label htmlFor={`achievement-featured-${item.id}`} className="text-sm text-slate-300">Featured achievement</label>
                  </div>
                  <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                    Save achievement
                  </button>
                </form>
                <form action={deleteAchievementAction} className="mt-4">
                  <input type="hidden" name="id" defaultValue={item.id} />
                  <button type="submit" className="text-sm text-rose-300 transition hover:text-rose-200">
                    Delete achievement
                  </button>
                </form>
              </div>
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
        <AdminTabs sections={adminSections} />
      </div>
    </main>
  )
}
