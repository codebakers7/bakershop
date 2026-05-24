"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  useEffect(() => {
    async function createCheckout() {
      try {
        const cart = localStorage.getItem("cart")
        if (!cart) {
          router.push("/cart")
          return
        }

        const items = JSON.parse(cart)

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
        }
      } catch (_err) {
        setError("Something went wrong")
      }
    }

    createCheckout()
  }, [router])

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

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-900 mx-auto mb-4"></div>
        <p className="text-stone-600">Redirecting to Stripe...</p>
      </div>
    </div>
  )
}