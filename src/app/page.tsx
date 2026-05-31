import { createClient } from "@/lib/supabase"
import ProductCard from "@/components/ProductCard"
import CategoryNav from "@/components/CategoryNav"
import HeroSection from "@/components/HeroSection"
import HeroSection1 from "@/components/HeroSection1"


export default async function HomePage() {
  const supabase = createClient()
  
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-stone-50">
      {/* <HeroSection /> */}
      <HeroSection1 />

    

      <CategoryNav active="all" />

      <section id="products" className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-stone-800 mb-8">Our Products</h2>
          
          {products && products.length === 0 && (
            <p className="text-stone-500 text-center py-12">No products available</p>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}