"use client"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-bold text-xl text-stone-800">
          Crumb <span className="text-amber-500">&</span> Co.
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-stone-600">
          <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-amber-500 transition-colors">About</Link>
          <Link href="/cart" className="hover:text-amber-500 transition-colors">My Cart</Link>
        </div>

        <Button asChild className="hidden md:flex bg-amber-500 hover:bg-amber-600 text-white">
  <Link href="#enquiry">Order Now</Link>
</Button>

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden text-stone-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 px-6 py-4 flex flex-col gap-4 text-sm text-stone-600">
          <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)}>My Cart</Link>
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-white w-full">
  <Link href="#enquiry">Order Now</Link>
</Button>
        </div>
      )}
    </nav>
  )
}