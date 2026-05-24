import { createClient } from "@/lib/supabase"
import { notFound } from "next/navigation"
import Link from "next/link"
import AddToCartButton from "@/components/AddToCartButton"

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  
  const supabase = createClient()
  
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <Link 
          href={`/category/${product.category}`}
          className="text-sm text-stone-500 hover:text-stone-800"
        >
          ← Back to {product.category}
        </Link>
      </div>

      {/* Product details */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Left — image placeholder */}
          <div className="bg-stone-200 rounded-3xl h-96 flex items-center justify-center text-8xl">
            🥐
          </div>

          {/* Right — info */}
          <div className="flex flex-col gap-6">
            <span className="text-sm font-medium text-stone-500 uppercase tracking-wide">
              {product.category}
            </span>
            
            <h1 className="text-4xl font-bold text-stone-900">
              {product.name}
            </h1>
            
            <p className="text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4">
              <span className="text-3xl font-bold text-stone-900">
                ₹{product.price}
              </span>
              {product.compare_price && (
                <span className="text-xl text-stone-400 line-through">
                  ₹{product.compare_price}
                </span>
              )}
            </div>

            {/* Stock */}
            {product.stock < 5 && product.stock > 0 && (
              <p className="text-red-500 font-medium">
                Only {product.stock} left — order soon
              </p>
            )}
            {product.stock === 0 && (
              <p className="text-red-600 font-medium">
                Out of stock
              </p>
            )}

            {/* Add to Cart */}
            <AddToCartButton product={product} />

          </div>
        </div>
      </div>
    </main>
  )
}