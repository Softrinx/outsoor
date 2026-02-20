import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@/lib/supabase/middleware"

// List of admin emails - must match the one in admin-login-form.tsx and admin-auth.ts
const ADMIN_EMAILS = ["admin@outsoor.com"]

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const supabase = createMiddlewareClient(request, response)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const protectedRoutes = ["/dashboard"]
  const authRoutes = ["/login", "/signup"]
  const adminRoutes = ["/admin"]

  const isAuthenticated = !!user
  const isAdmin = isAuthenticated && ADMIN_EMAILS.includes(user?.email?.toLowerCase() || "")

  // Redirect authenticated users away from auth pages
  if (
    authRoutes.some((route) => pathname.startsWith(route)) &&
    isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  // Redirect unauthenticated users away from protected pages
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Protect admin routes - require both authentication and admin role
  if (adminRoutes.some((route) => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
    }
    if (!isAdmin) {
      // Redirect non-admin users to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|logos|images).*)",
  ],
}
