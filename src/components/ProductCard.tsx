"use client"

import Link from "next/link"

export type Product = {
  id?: string
  name: string
  slug: string
  description?: string
  price: number
  compare_price?: number | null
  category: string
  stock: number
}

type CartItem = {
  slug: string
  name: string
  price: number
  quantity: number
}

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    
    const existingCart = localStorage.getItem("cart")
    const cart: CartItem[] = existingCart ? JSON.parse(existingCart) : []

    const existingItemIndex = cart.findIndex(
      (item) => item.slug === product.slug
    )

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1
    } else {
      cart.push({
        slug: product.slug,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    alert(`${product.name} added to cart`)
  }

  const hasDiscount =
    product.compare_price && product.compare_price > product.price

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <span className="mb-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-600">
        {product.category}
      </span>

      <Link href={`/products/${product.slug}`}>
        <h3 className="text-xl font-semibold text-gray-900 hover:text-gray-600">
          {product.name}
        </h3>
      </Link>

      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {product.description}
      </p>

      <div className="mt-4 flex items-center gap-3">
        <span className="text-2xl font-bold text-gray-900">
          ₹{product.price}
        </span>
        {hasDiscount && (
          <span className="text-sm text-gray-400 line-through">
            ₹{product.compare_price}
          </span>
        )}
      </div>

      {product.stock < 5 && product.stock > 0 && (
        <p className="mt-3 text-sm font-medium text-red-500">
          Only {product.stock} left
        </p>
      )}

      {product.stock === 0 && (
        <p className="mt-3 text-sm font-medium text-red-600">
          Out of stock
        </p>
      )}

      <div className="mt-5 flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="flex-1 rounded-xl bg-black px-4 py-3 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:bg-gray-300"
        >
          {product.stock === 0 ? "Unavailable" : "Add to Cart"}
        </button>

        <Link 
          href={`/products/${product.slug}`}
          className="rounded-xl border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          View →
        </Link>
      </div>
    </div>
  )
}