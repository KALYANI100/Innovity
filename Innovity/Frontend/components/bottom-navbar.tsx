"use client"

import { usePathname, useRouter } from "next/navigation"
import { Home, PlusSquare, Trophy, Swords, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BottomNavbar() {
  const pathname = usePathname()
  const router = useRouter()

  // Don't show navbar on auth pages
  if (pathname.includes("/auth")) {
    return null
  }

  const navItems = [
    {
      name: "Home",
      icon: Home,
      path: "/dashboard",
    },
    {
      name: "Create",
      icon: PlusSquare,
      path: "/create",
    },
    {
      name: "Leaderboard",
      icon: Trophy,
      path: "/leaderboard",
    },
    {
      name: "Compete",
      icon: Swords,
      path: "/compete",
    },
    {
      name: "Profile",
      icon: User,
      path: "/profile",
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => router.push(item.path)}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full transition-colors",
              pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-primary",
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
