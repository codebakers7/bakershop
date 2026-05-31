"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Inter, Playfair_Display } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"] })

const heroImages = [
  "/images/bakery1.jpg",
  "/images/bread.jpg",
  "/images/croissant.jpg",
  "/images/pastry2.jpg",
]

export default function HeroSection1() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={`relative min-h-[90vh] text-white overflow-hidden ${inter.className}`}>
      {/* Background Carousel */}
      {heroImages.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
          style={{
            // Darkened slightly so white text stands out perfectly against the croissants
            backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.75)), url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center min-h-[90vh] text-center">
        
        {/* 1. THE BADGE: Added mb-6 to push the headline away */}
        <p className="text-amber-400 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase mb-6">
          Fresh Daily Since 1987
        </p>

        {/* 2. THE HEADLINE: Added playfair, adjusted size, and used mb-6 for clean breathing room */}
        <h1 className={`${playfair.className} text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 max-w-4xl`}>
          Handcrafted Breads <br className="hidden md:inline" /> Worth Waking Up For
        </h1>

        {/* 3. THE DESCRIPTION: Changed max-w-xl so it doesn't stretch too wide like in the screenshot, and added mb-10 */}
        <p className="text-base md:text-lg text-gray-200 max-w-xl leading-relaxed mb-10">
          Artisan breads, cakes and pastries crafted daily using premium ingredients and traditional methods.
        </p>

        {/* 4. THE BUTTONS: Changed rounded-lg to rounded-full for a modern premium feel */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link
            href="#products"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-semibold transition transform hover:scale-105"
          >
            Shop Now
          </Link>

          <Link
            href="/about"
            className="border border-white/80 hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-semibold transition"
          >
            Our Story
          </Link>
        </div>

        {/* Carousel Indicators */}
        <div className="flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-3 w-3 rounded-full transition-all ${
                currentImage === index ? "bg-amber-500 scale-125" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}