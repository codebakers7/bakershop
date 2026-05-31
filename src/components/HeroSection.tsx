"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function HeroSection() {
  const heroImages = [
    "/images/bakery1.jpg",
    "/images/bread.jpg",
    "/images/croissant.jpg",
    "/images/pastry2.jpg",
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative min-h-[90vh] text-white overflow-hidden">
      {/* Background Carousel */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center min-h-[90vh] text-center">
        <p className="text-amber-400 font-semibold tracking-widest uppercase mb-4">
          Fresh Daily Since 1987
        </p>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl">
          Artisan Breads, Cakes & Pastries
        </h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-8">
          Handcrafted every morning using premium ingredients and
          traditional baking techniques.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="#products"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold transition"
          >
            Shop Now
          </Link>

          <Link
            href="/about"
            className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg font-semibold transition"
          >
            Our Story
          </Link>
        </div>

        {/* Carousel Indicators */}
        <div className="flex gap-3 mt-12">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentImage === index
                  ? "bg-amber-500 scale-125"
                  : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}