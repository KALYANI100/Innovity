"use client"

import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { PostCard, type Post } from "@/components/post-card"
import { Trophy, Medal, LogOut } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for user posts
const mockUserPosts: Post[] = [
  {
    id: "1",
    author: {
      name: "Student User",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "My science project on renewable energy sources!",
    image: "/placeholder.svg?height=300&width=500",
    likes: 24,
    comments: 5,
    commentsList: [
      {
        id: "1",
        author: {
          name: "Science Teacher",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content: "This is excellent work! I'm impressed by your research.",
        createdAt: "1 day ago",
      },
      {
        id: "2",
        author: {
          name: "Classmate",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content: "This helped me understand solar energy better. Thanks for sharing!",
        createdAt: "12 hours ago",
      },
    ],
    createdAt: "2 days ago",
  },
  {
    id: "2",
    author: {
      name: "Student User",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    content: "Check out my latest painting for the art competition",
    image: "/placeholder.svg?height=300&width=500",
    likes: 42,
    comments: 8,
    commentsList: [
      {
        id: "1",
        author: {
          name: "Art Teacher",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content: "Your use of color is outstanding! This is definitely competition-worthy.",
        createdAt: "6 days ago",
      },
      {
        id: "2",
        author: {
          name: "Art Club President",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content: "We'd love to feature this in our school magazine!",
        createdAt: "5 days ago",
      },
    ],
    createdAt: "1 week ago",
  },
]

export default function Profile() {
  const { user, logout } = useAuth()
  const { toast } = useToast()

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  if (!user) {
    return null
  }

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">Credits:</span>
            </div>
            <span className="text-xl font-bold">{user.credits}</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Medal className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Badges Earned:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <div key={index} className="bg-muted px-3 py-1 rounded-full text-sm">
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="posts">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="mt-0">
          <div className="space-y-4">
            {mockUserPosts.length > 0 ? (
              mockUserPosts.map((post) => <PostCard key={post.id} post={post} />)
            ) : (
              <div className="text-center p-8">
                <p className="text-muted-foreground">You haven't created any posts yet.</p>
                <Button className="mt-4">Create Your First Post</Button>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>Track your progress and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Quiz Master</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Completed 10 quizzes with a score of 80% or higher</p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-3/4" />
                  </div>
                  <div className="mt-1 text-xs text-right text-muted-foreground">75% complete</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Creative Contributor</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Share 5 creative works in the Creativity Corner</p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-2/5" />
                  </div>
                  <div className="mt-1 text-xs text-right text-muted-foreground">40% complete</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Innovation Pioneer</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Submit 3 projects to the Innovation Corner</p>
                  <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-1/3" />
                  </div>
                  <div className="mt-1 text-xs text-right text-muted-foreground">33% complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
