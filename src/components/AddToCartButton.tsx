"use client"

import { useState } from "react"

type Product = {
  id: string
  name: string
  slug: string
  price: number
  stock: number
}

type CartItem = {
  slug: string
  name: string
  price: number
  quantity: number
}

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    const existingCart = localStorage.getItem("cart")
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : []

    const existingIndex = cart.findIndex(
      (item) => item.slug === product.slug
    )

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity
    } else {
      cart.push({
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: quantity,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (product.stock === 0) {
    return (
      <button disabled className="w-full py-4 rounded-xl bg-stone-300 text-stone-500 font-medium cursor-not-allowed">
        Out of Stock
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-stone-600 font-medium">Quantity:</span>
        <div className="flex items-center border border-stone-300 rounded-lg">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-stone-100">−</button>
          <span className="px-4 py-2 font-medium w-12 text-center">{quantity}</span>
          <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-4 py-2 hover:bg-stone-100">+</button>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className={`w-full py-4 rounded-xl font-medium transition
          ${added ? "bg-green-600 text-white" : "bg-stone-900 text-white hover:bg-stone-800"}`}
      >
        {added ? "Added to Cart ✓" : `Add ${quantity} to Cart — ₹${product.price * quantity}`}
      </button>
    </div>
  )
}