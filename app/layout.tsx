import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import BottomNavbar from "@/components/bottom-navbar"
import { AuthProvider } from "@/components/auth-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "InnoVity - Creative Learning Hub",
  description: "Empower students to showcase creativity, build knowledge, and engage in meaningful competitions",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-background to-background/80`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            <div className="flex flex-col min-h-screen pb-16">
              {children}
              <BottomNavbar />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'