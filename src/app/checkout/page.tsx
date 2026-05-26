"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createBrowserClient } from "@supabase/ssr"

export default function CheckoutPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [showOptions, setShowOptions] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const cart = localStorage.getItem("cart")
    if (!cart || JSON.parse(cart).length === 0) {
      router.push("/cart")
      return
    }
    
    // Check if user is actually logged in
    checkUser()
  }, [router])

  async function checkUser() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session?.user) {
      // User is logged in — auto-redirect to Stripe
      setIsLoggedIn(true)
      await createStripeSession()
    } else {
      // User is guest — show options
      setShowOptions(true)
    }
  }

  async function guestCheckout() {
    await createStripeSession()
  }

  async function createStripeSession() {
    try {
      const cart = localStorage.getItem("cart")
      const items = JSON.parse(cart!)

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError("Failed to create checkout")
        setShowOptions(true) // Show options again if failed
      }
    } catch (_err) {
      setError("Something went wrong")
      setShowOptions(true)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={() => router.push("/cart")} className="bg-stone-900 text-white px-6 py-3 rounded-xl">
            Back to Cart
          </button>
        </div>
      </div>
    )
  }

  if (showOptions) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 border border-stone-200 text-center">
          <h1 className="text-2xl font-bold text-stone-900 mb-2">Checkout</h1>
          <p className="text-stone-500 mb-8">Choose how you want to proceed</p>
          
          <div className="flex flex-col gap-4">
            <button
              onClick={guestCheckout}
              className="w-full bg-stone-900 text-white py-3 rounded-xl font-medium hover:bg-stone-800"
            >
              Continue as Guest
            </button>
            
            {/* FIX: /login not /auth/login */}
            <Link 
              href="/login?redirect=/checkout"
              className="w-full border border-stone-300 text-stone-700 py-3 rounded-xl font-medium hover:bg-stone-50 block"
            >
              Login for Faster Checkout
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Logged-in users see loading spinner while Stripe session creates
  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
          <p className="text-stone-600">Preparing your checkout...</p>
        </div>
      </div>
    )
  }

  // Default loading state
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900"></div>
    </div>
  )
}