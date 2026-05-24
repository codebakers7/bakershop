"use client"
import { Geist } from "next/font/google"
import { usePathname } from "next/navigation"
import Navbar from "@/components/Navbar"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const isAuth = pathname.startsWith("/auth")
  const showNav = !isAdmin && !isAuth

  return (
    <html lang="en">
      <body className={geist.className}>
        {showNav && <Navbar />}
        {children}
      </body>
    </html>
  )
}