import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@/lib/supabase/middleware"
import { hasSupabaseEnv } from "@/lib/supabase/env"
import { isAdmin as checkIsAdmin } from "@/lib/admin-utils"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next({
    request,
  })

  if (!hasSupabaseEnv()) {
    return response
  }

  const supabase = createMiddlewareClient(request, response)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  const protectedRoutes = ["/dashboard"]
  const authRoutes = ["/login", "/signup"]
  const adminRoutes = ["/admin"]
  const adminLoginRoute = "/admin/login"

  const isAuthenticated = !!user

  // Check if user is admin by querying the database
  let isAdmin = false
  if (isAuthenticated && user) {
    isAdmin = await checkIsAdmin(supabase, user.id)
  }

  // Redirect admin login page to normal login (admins use the same login form)
  if (pathname === adminLoginRoute) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect authenticated users away from auth pages
  if (
    authRoutes.some((route) => pathname.startsWith(route)) &&
    isAuthenticated
  ) {
    // Route based on admin status
    const redirectPath = isAdmin ? "/admin" : "/dashboard"
    return NextResponse.redirect(new URL(redirectPath, request.url))
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
      return NextResponse.redirect(new URL("/login", request.url))
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
