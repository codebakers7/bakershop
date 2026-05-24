import { createClient } from "@/lib/supabase"
import ProductCard from "@/components/ProductCard"
import CategoryNav from "@/components/CategoryNav"
import { notFound } from "next/navigation"

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params
  
  const supabase = createClient()
  
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("category", slug)
    .order("created_at", { ascending: false })

  // If no products in this category, show 404
  if (!products || products.length === 0) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-stone-50">
      <section className="bg-stone-900 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold capitalize">
            {slug}
          </h1>
          <p className="mt-4 text-stone-400 text-lg">
            Fresh from the oven
          </p>
        </div>
      </section>

      <CategoryNav active={slug} />

      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-8 capitalize">
            {slug} Collection
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}