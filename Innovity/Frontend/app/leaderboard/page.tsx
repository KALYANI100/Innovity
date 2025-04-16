"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy } from "lucide-react"

type LeaderboardUser = {
  id: string
  name: string
  avatar?: string
  score: number
  rank: number
  badges: string[]
}

// Mock data for leaderboard
const mockLeaderboardData: LeaderboardUser[] = [
  {
    id: "1",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 1250,
    rank: 1,
    badges: ["Quiz Master", "Creative Genius", "Innovation Star"],
  },
  {
    id: "2",
    name: "Noah Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 980,
    rank: 2,
    badges: ["Quiz Master", "Study Champion"],
  },
  {
    id: "3",
    name: "Olivia Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 875,
    rank: 3,
    badges: ["Creative Genius", "Photography Pro"],
  },
  {
    id: "4",
    name: "Liam Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 820,
    rank: 4,
    badges: ["Dance Star", "Creative Genius"],
  },
  {
    id: "5",
    name: "Ava Brown",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 790,
    rank: 5,
    badges: ["Singing Pro", "Creative Genius"],
  },
  {
    id: "6",
    name: "Lucas Garcia",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 750,
    rank: 6,
    badges: ["Cooking Master", "Creative Genius"],
  },
  {
    id: "7",
    name: "Sophia Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 720,
    rank: 7,
    badges: ["Study Champion", "Quiz Master"],
  },
  {
    id: "8",
    name: "Ethan Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 680,
    rank: 8,
    badges: ["Innovation Star"],
  },
  {
    id: "9",
    name: "Maya Patel",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 650,
    rank: 9,
    badges: ["Innovation Star", "Tech Wizard"],
  },
  {
    id: "10",
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    score: 620,
    rank: 10,
    badges: ["Study Champion"],
  },
]

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([])
  const [filter, setFilter] = useState<"all" | "weekly" | "monthly">("all")

  useEffect(() => {
    // In a real app, fetch leaderboard data from API
    // For now, we'll use mock data and filter it based on the selected tab
    let filteredData = [...mockLeaderboardData]

    if (filter === "weekly") {
      // Simulate weekly data by shuffling and reducing scores
      filteredData = filteredData
        .map((user) => ({ ...user, score: Math.floor(user.score * 0.2) }))
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({ ...user, rank: index + 1 }))
    } else if (filter === "monthly") {
      // Simulate monthly data by shuffling and adjusting scores
      filteredData = filteredData
        .map((user) => ({ ...user, score: Math.floor(user.score * 0.5) }))
        .sort((a, b) => b.score - a.score)
        .map((user, index) => ({ ...user, rank: index + 1 }))
    }

    setLeaderboardData(filteredData)
  }, [filter])

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-muted-foreground">Top performers based on credits earned</p>
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">All Time</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <LeaderboardContent users={leaderboardData} />
        </TabsContent>
        <TabsContent value="monthly" className="mt-0">
          <LeaderboardContent users={leaderboardData} />
        </TabsContent>
        <TabsContent value="weekly" className="mt-0">
          <LeaderboardContent users={leaderboardData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Simplify the leaderboard to only show name, score, rank, and profile image
function LeaderboardContent({ users }: { users: LeaderboardUser[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
        <CardDescription>Students with the highest credits earned</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8">
                  {user.rank <= 3 ? (
                    <Trophy
                      className={`h-5 w-5 ${
                        user.rank === 1 ? "text-yellow-500" : user.rank === 2 ? "text-gray-400" : "text-amber-700"
                      }`}
                    />
                  ) : (
                    <span className="text-muted-foreground font-medium">{user.rank}</span>
                  )}
                </div>
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="font-medium">{user.name}</div>
              </div>
              <div className="font-bold text-lg">{user.score}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
