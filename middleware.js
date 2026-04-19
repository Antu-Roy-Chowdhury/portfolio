import { NextResponse } from "next/server"

function getAdminPath() {
  const raw = process.env.ADMIN_PATH || "control-room-antu"
  return raw.startsWith("/") ? raw : `/${raw}`
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  const adminPath = getAdminPath()

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (pathname === adminPath) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.rewrite(url)
  }

  if (pathname.startsWith(`${adminPath}/`)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(adminPath, "/admin")
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\.).*)"],
}
