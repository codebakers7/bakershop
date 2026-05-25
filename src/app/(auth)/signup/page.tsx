"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase"
import Link from "next/link"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
    } else {
      setMessage("Check your email for confirmation link")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-stone-200">
        <h1 className="text-2xl font-bold text-stone-900 mb-6">Create Account</h1>
        
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-stone-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2"
              required
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-stone-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-800 disabled:bg-stone-300"
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm text-center text-amber-600">{message}</p>
        )}

        <p className="mt-6 text-center text-sm text-stone-500">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-stone-900 font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </main>
  )
}