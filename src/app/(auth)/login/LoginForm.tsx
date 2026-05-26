"use client"

import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") || "/"  // ← GET REDIRECT PARAM
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )

  async function handleLogin() {
    if (!email || !password) {
      setError("Please enter email and password.")
      return
    }

    setLoading(true)
    setError("")

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

    // CRITICAL: Wait for session to be fully established
    // Get session explicitly to ensure cookie is set
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      setError("Session not established. Try again.")
      setLoading(false)
      return
    }

    // Now check role and redirect
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single()

    setLoading(false)

    if (profile?.role === "admin") {
      window.location.replace("/admin")
    } else {
      window.location.replace(redirect)
    }
  }

  return (
    <main className="min-h-screen bg-amber-50 flex items-center justify-center px-6">
      <Card className="w-full max-w-md border-stone-100 shadow-sm">
        <CardContent className="p-8 flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-stone-800">
              Crumb <span className="text-amber-500">&</span> Co.
            </h1>
            <p className="text-stone-500 text-sm mt-1">
              {redirect === "/checkout" ? "Login to continue checkout" : "Login"}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="bg-amber-500 hover:bg-amber-600 text-white w-full py-6"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <p className="text-center text-sm text-stone-500">
            Don't have an account?{" "}
            <Link href={`/signup${redirect !== "/" ? `?redirect=${redirect}` : ""}`} className="text-amber-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  )
}
