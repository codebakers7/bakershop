"use client"
import { useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Use SSR browser client — this sets cookies correctly for middleware
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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setError("Invalid email or password.")
    } else {
      router.push("/admin")
      router.refresh()  // ← forces middleware to re-evaluate with new cookie
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
            <p className="text-stone-500 text-sm mt-1">Admin login</p>
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
        </CardContent>
      </Card>
    </main>
  )
}