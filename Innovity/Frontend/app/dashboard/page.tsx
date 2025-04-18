"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Book, Palette, Lightbulb } from "lucide-react"

export default function Dashboard() {
  const { user } = useAuth()
  const router = useRouter()

  const corners = [
    {
      id: "study",
      title: "Study Corner",
      description: "Explore study materials, get help, and expand your knowledge",
      icon: Book,
      color: "bg-blue-100 dark:bg-blue-900",
      iconColor: "text-blue-500",
      path: "/posts/study",
    },
    {
      id: "creativity",
      title: "Creativity Corner",
      description: "Showcase your artistic talents and creative projects",
      icon: Palette,
      color: "bg-purple-100 dark:bg-purple-900",
      iconColor: "text-purple-500",
      path: "/posts/creativity",
    },
    {
      id: "innovation",
      title: "Innovation Corner",
      description: "Share your innovative ideas and inventions",
      icon: Lightbulb,
      color: "bg-amber-100 dark:bg-amber-900",
      iconColor: "text-amber-500",
      path: "/posts/innovation",
    },
  ]

  return (
    <div className="container max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
        <p className="text-muted-foreground">Explore, create, and learn on InnoVity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {corners.map((corner) => (
          <Card
            key={corner.id}
            className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
            onClick={() => router.push(corner.path)}
          >
            <div className={`p-6 ${corner.color}`}>
              <corner.icon className={`h-12 w-12 ${corner.iconColor}`} />
            </div>
            <CardHeader>
              <CardTitle>{corner.title}</CardTitle>
              <CardDescription>{corner.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Explore
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
