"use client"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
const values = [
  {
    id: 1,
    emoji: "🌾",
    title: "Local Ingredients",
    description: "We source flour, dairy and eggs from farms within 50km of our bakery.",
  },
  {
    id: 2,
    emoji: "⏰",
    title: "Baked Fresh Daily",
    description: "Every item is made from scratch before 6am. No day-old bread here.",
  },
  {
    id: 3,
    emoji: "👨‍👩‍👧",
    title: "Family Recipes",
    description: "Three generations of baking tradition in every bite.",
  },
]

export default function About() {
  const bakeryImages = [
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1200&auto=format&fit=crop",
]

const [current, setCurrent] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCurrent((prev) => (prev + 1) % bakeryImages.length)
  }, 3000)

  return () => clearInterval(timer)
}, [])
  return (
      <section id="about" className="py-24 bg-gradient-to-b from-stone-900 via-amber-950/40 to-stone-950 px-6">  
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left - image placeholder */}
  <div className="relative h-[420px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
 
 {/* <div className="relative h-[420px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl"> */}

  {/* Glow effect */}
  <div className="absolute -inset-4 bg-amber-500/20 blur-3xl rounded-full" />

  <AnimatePresence mode="wait">
    <motion.div
      key={current}
      initial={{
        opacity: 0,
        scale: 1.15,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.95,
      }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      className="absolute inset-0"
    >
      <Image
        src={bakeryImages[current]}
        alt="Bakery"
        fill
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/20" />
    </motion.div>
  </AnimatePresence>

</div>

{/* </div> */}

        {/* Right - text */}
        <div className="flex flex-col gap-8">
          <div>
            <span className="block text-center bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent text-2xl md:text-3xl font-bold uppercase tracking-widest">
              Our story
            </span>
            <h2 className="text-4xl font-bold text-amber-50 mt-2">
              Baking since 1987
            </h2>
            <p className="text-stone-400 mt-4 leading-relaxed">
              What started as a small family kitchen in Chennai has grown   
              into a beloved neighbourhood bakery. We still use the same 
              recipes, the same oven, and the same love.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {values.map((value) => (
              <Card key={value.id} className="bg-gradient-to-br from-stone-900 to-stone-800 hover:border-amber-400/50 transition-all duration-300">
                <CardContent className="p-4 flex items-start gap-4"> 
                  <span className="text-2xl">{value.emoji}</span>
                  <div>
                    <h3 className="font-semibold text-white">{value.title}</h3>
                    <p className="text-stone-400 text-sm mt-1">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}