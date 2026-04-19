import { redirect } from "next/navigation"
import { getAdminDashboardPath, getAdminSession } from "@/lib/admin-auth"
import { loginAction } from "@/app/admin/actions"

export default async function AdminLoginPage({ searchParams }) {
  const session = await getAdminSession()
  if (session) {
    redirect(getAdminDashboardPath())
  }

  const params = await searchParams
  const error = params?.error

  return (
    <main className="min-h-screen bg-[#05080d] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center">
        <div className="grid w-full gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <p className="section-kicker">Private access</p>
            <h1 className="page-title">Hidden admin entrance for managing your portfolio content.</h1>
            <p className="page-copy">
              This route is not linked anywhere on the public site. After login, you can update global settings, add projects,
              manage research items, certifications, achievements, and paste or upload Cloudinary image URLs.
            </p>
          </div>

          <div className="panel">
            <h2 className="panel-title">Admin login</h2>
            <form action={loginAction} className="mt-8 space-y-5">
              <div>
                <label htmlFor="identifier" className="mb-2 block text-sm text-slate-300">
                  Email or username
                </label>
                <input id="identifier" name="identifier" className="form-input" placeholder="admin email or username" />
              </div>
              <div>
                <label htmlFor="password" className="mb-2 block text-sm text-slate-300">
                  Password
                </label>
                <input id="password" name="password" type="password" className="form-input" placeholder="Your password" />
              </div>
              {error ? <p className="text-sm text-rose-300">{error}</p> : null}
              <button type="submit" className="rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200">
                Enter dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
