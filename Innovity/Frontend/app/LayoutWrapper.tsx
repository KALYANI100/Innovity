// app/components/LayoutWrapper.tsx
"use client"

import React from "react"
import { useAuth } from "@/components/auth-provider"
import BottomNavbar from "@/components/bottom-navbar"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  return (
    <div className="flex flex-col min-h-screen pb-16">
      {children}
      {!isLoading && user && <BottomNavbar />}
    </div>
  )
}
