import Link from "next/link"

const categories = [
  { slug: "all", label: "All Products" },
  { slug: "bread", label: "Bread" },
  { slug: "cakes", label: "Cakes" },
  { slug: "pastries", label: "Pastries" },
  { slug: "biscuits", label: "Biscuits" },
]

export default function CategoryNav({ active }: { active: string }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center py-8">
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={cat.slug === "all" ? "/" : `/category/${cat.slug}`}
          className={`px-5 py-2 rounded-full text-sm font-medium transition
            ${active === cat.slug 
              ? "bg-stone-900 text-white" 
              : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
            }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  )
}