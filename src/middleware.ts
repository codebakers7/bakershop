import { NextRequest, NextResponse } from "next/server"
import { createSupabaseMiddleware } from "@/lib/supabase-middleware"

export async function middleware(request: NextRequest) {
  const { supabase, response } = createSupabaseMiddleware(request)

  // Verify the session from the cookie
  const { data: { user } } = await supabase.auth.getUser()

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isLoginPage = request.nextUrl.pathname === "/auth/login"

  // Not logged in + trying to access admin → redirect to login
  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  // Already logged in + trying to access login page → redirect to admin
  if (isLoginPage && user) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/auth/login"],
}