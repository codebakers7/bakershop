import { NextRequest, NextResponse } from "next/server"
import { createSupabaseMiddleware } from "@/lib/supabase-middleware"

export async function middleware(request: NextRequest) {

  console.log("Middleware running for:", request.nextUrl.pathname)
  
  const { supabase, response } = createSupabaseMiddleware(request)
  const { data: { user } } = await supabase.auth.getUser()


  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
  const isAuthRoute = request.nextUrl.pathname === "/login" || 
                      request.nextUrl.pathname === "/signup"

if (!user && isAdminRoute) {
  const redirectUrl = new URL("/login", request.url)
  redirectUrl.searchParams.set("redirect", request.nextUrl.pathname)
  return NextResponse.redirect(redirectUrl)
}

  // If user exists, check their role
  if (user) {
    // Fetch role from profiles table
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    const isAdmin = profile?.role === "admin"

    // Admin trying to access admin routes → allow
    // Non-admin trying to access admin routes → redirect to homepage
    if (isAdminRoute && !isAdmin) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    // Already logged in, trying to access login/signup → redirect
    if (isAuthRoute) {
      return NextResponse.redirect(new URL(isAdmin ? "/admin" : "/", request.url))
    }
  }

  return response
}

export const config = {
  matcher: ["/admin/:path*", "/:path*", "/checkout"],
}


















// old admin page with order items display and order success page with cart clearing logic. Also includes middleware for auth redirection (commented out).
// import { NextRequest, NextResponse } from "next/server"
// import { createSupabaseMiddleware } from "@/lib/supabase-middleware"

// export async function middleware(request: NextRequest) {
//   const { supabase, response } = createSupabaseMiddleware(request)

//   // Verify the session from the cookie
//   const { data: { user } } = await supabase.auth.getUser()

//   const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
//   const isLoginPage = request.nextUrl.pathname === "/login"

//   // Not logged in + trying to access admin → redirect to login
//   if (isAdminRoute && !user) {
//     return NextResponse.redirect(new URL("/login", request.url))
//   }

//   // Already logged in + trying to access login page → redirect to admin
//   if (isLoginPage && user) {
//     return NextResponse.redirect(new URL("/admin", request.url))
//   }

//   return response
// }

// export const config = {
//   matcher: ["/admin/:path*", "/login"],
// }