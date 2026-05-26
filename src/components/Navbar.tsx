"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )

    // Check current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for login/logout events
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
    )
    await supabase.auth.signOut()
    // Page will auto-refresh via onAuthStateChange listener
  }

  if (loading) return null // Don't flash wrong state

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-stone-800">
          Crumb <span className="text-amber-500">&</span> Co.
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-amber-500 transition-colors">About</Link>
          <Link href="/cart" className="hover:text-amber-500 transition-colors">My Cart</Link>
        </div>

        {/* Auth buttons — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-stone-600">Welcome, {user.email}</span>
              <Button
                onClick={handleLogout}
                className="bg-stone-700 hover:bg-stone-800 text-white px-4 lg:px-6"
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button
                asChild
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 lg:px-6"
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button
                asChild
                className="bg-amber-500 hover:bg-amber-600 text-white px-4 lg:px-6"
              >
                <Link href="/login">Log In</Link>
              </Button>
            </>
          )}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden text-stone-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4 text-sm text-stone-600">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)}>My Cart</Link>
          
          <div className="flex gap-2 w-full">
            {user ? (
              <>
                <span className="text-sm text-stone-600 py-2">Welcome, {user.email}</span>
                <button 
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="flex-1 bg-stone-700 text-white py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 bg-amber-500 text-white py-2 rounded-lg">
                  <Link href="/signup" onClick={() => setIsOpen(false)}>Sign Up</Link>
                </button>
                <button className="flex-1 bg-amber-500 text-white py-2 rounded-lg">
                  <Link href="/login" onClick={() => setIsOpen(false)}>Log In</Link>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}