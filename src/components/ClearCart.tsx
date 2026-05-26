"use client"

import { useEffect } from "react"

export default function ClearCart() {
  useEffect(() => {
    // Remove cart from localStorage
    localStorage.removeItem("cart")
    
    // Optional: dispatch event so Navbar updates cart count
    window.dispatchEvent(new Event("storage"))
  }, [])

  return null  // This component renders nothing
}