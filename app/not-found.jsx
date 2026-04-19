import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#05080d] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl items-center justify-center">
        <div className="panel text-center">
          <p className="section-kicker">404</p>
          <h1 className="page-title mt-4">Page not found.</h1>
          <p className="page-copy mx-auto">
            The page you were looking for is not here, or the link may have changed while the portfolio was being rebuilt.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-sky-300 px-6 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-200"
          >
            Return home
          </Link>
        </div>
      </div>
    </main>
  )
}
