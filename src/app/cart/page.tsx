"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

type CartItem = {
  slug: string
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("cart")
    if (stored) {
      setCart(JSON.parse(stored))
    }
    setLoaded(true)
  }, [])

  function updateQuantity(slug: string, newQty: number) {
    if (newQty < 1) return
    
    const updated = cart.map(item => 
      item.slug === slug ? { ...item, quantity: newQty } : item
    )
    
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  function removeItem(slug: string) {
    const updated = cart.filter(item => item.slug !== slug)
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  if (!loaded) {
    return <div className="min-h-screen bg-stone-50 flex items-center justify-center">Loading...</div>
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-stone-50 py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-stone-900 mb-4">Your Cart is Empty</h1>
          <p className="text-stone-500 mb-8">Add some delicious baked goods!</p>
          <Link href="/" className="inline-block bg-stone-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-stone-800">
            Browse Products
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-stone-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-stone-900 mb-8">Shopping Cart</h1>

        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div key={item.slug} className="bg-white rounded-2xl p-6 border border-stone-200 flex items-center justify-between">
              
              <div className="flex-1">
                <Link href={`/products/${item.slug}`} className="text-lg font-semibold text-stone-900 hover:text-stone-600">
                  {item.name}
                </Link>
                <p className="text-stone-500 mt-1">₹{item.price} each</p>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center border border-stone-300 rounded-lg">
                  <button onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="px-3 py-2 hover:bg-stone-100">−</button>
                  <span className="px-4 py-2 font-medium w-12 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="px-3 py-2 hover:bg-stone-100">+</button>
                </div>

                <p className="font-bold text-stone-900 w-24 text-right">₹{item.price * item.quantity}</p>

                <button onClick={() => removeItem(item.slug)} className="text-red-500 hover:text-red-700 px-2">✕</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-stone-900 text-white rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-stone-400 text-sm">Total ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)</p>
            <p className="text-3xl font-bold">₹{total}</p>
          </div>
          <Link href="/checkout" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition">
            Proceed to Checkout →
          </Link>
        </div>
      </div>
    </main>
  )
}