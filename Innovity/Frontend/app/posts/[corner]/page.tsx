"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PostCard, type Post } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Book, Palette, Lightbulb, MessageSquare } from "lucide-react"
import { AIAssistant } from "@/components/ai-assistant"

// Mock data for posts
const mockPosts: Record<string, Post[]> = {
  study: [
    {
      id: "1",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Just finished my math homework! Here are some tips for solving quadratic equations...",
      image: "/placeholder.svg?height=300&width=500",
      likes: 24,
      comments: 5,
      commentsList: [
        {
          id: "1",
          author: {
            name: "Jane Smith",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "These tips are super helpful! I was struggling with factoring.",
          createdAt: "2 hours ago",
        },
        {
          id: "2",
          author: {
            name: "Mike Johnson",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "Could you explain the quadratic formula again?",
          createdAt: "1 hour ago",
        },
      ],
      createdAt: "2 hours ago",
    },
    {
      id: "2",
      author: {
        name: "Sophia Chen",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Check out this amazing history timeline I created for my project!",
      pdf: "#",
      likes: 18,
      comments: 3,
      commentsList: [
        {
          id: "1",
          author: {
            name: "History Buff",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "This is really well organized! Great job on the research.",
          createdAt: "4 hours ago",
        },
        {
          id: "2",
          author: {
            name: "Teacher123",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "Excellent work, Sophia! I especially like how you included primary sources.",
          createdAt: "3 hours ago",
        },
      ],
      createdAt: "5 hours ago",
    },
  ],
  innovation: [
    {
      id: "3",
      author: {
        name: "Ethan Williams",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "My science fair project on renewable energy. What do you think?",
      image: "/placeholder.svg?height=300&width=500",
      likes: 42,
      comments: 12,
      commentsList: [
        {
          id: "1",
          author: {
            name: "Science Teacher",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "This is a fantastic project, Ethan! Have you considered the efficiency aspect?",
          createdAt: "20 hours ago",
        },
        {
          id: "2",
          author: {
            name: "Green Energy Fan",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "I love how you approached this problem. Very innovative!",
          createdAt: "12 hours ago",
        },
      ],
      createdAt: "1 day ago",
    },
    {
      id: "4",
      author: {
        name: "Maya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "I built this app that helps track water usage at home. Here's a demo!",
      video: "https://example.com/video.mp4",
      likes: 56,
      comments: 8,
      commentsList: [
        {
          id: "1",
          author: {
            name: "App Developer",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "The UI looks really clean! What tech stack did you use?",
          createdAt: "1 day ago",
        },
        {
          id: "2",
          author: {
            name: "Water Conservation Advocate",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "This is exactly what we need to raise awareness about water usage. Great job!",
          createdAt: "1 day ago",
        },
      ],
      createdAt: "2 days ago",
    },
  ],
}

export default function PostsPage() {
  const { corner } = useParams<{ corner: string }>()
  const [posts, setPosts] = useState<Post[]>([])
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  useEffect(() => {
    // In a real app, fetch posts from API
    setPosts(mockPosts[corner as string] || [])
  }, [corner])

  const getCornerDetails = () => {
    switch (corner) {
      case "study":
        return {
          title: "Study Corner",
          icon: Book,
          color: "text-blue-500",
          description: "Explore study materials and expand your knowledge",
        }
      case "creativity":
        return {
          title: "Creativity Corner",
          icon: Palette,
          color: "text-purple-500",
          description: "Showcase your artistic talents and creative projects",
        }
      case "innovation":
        return {
          title: "Innovation Corner",
          icon: Lightbulb,
          color: "text-amber-500",
          description: "Share your innovative ideas and inventions",
        }
      default:
        return {
          title: "Posts",
          icon: Book,
          color: "text-primary",
          description: "Explore posts from the community",
        }
    }
  }

  const cornerDetails = getCornerDetails()
  const CornerIcon = cornerDetails.icon

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CornerIcon className={`h-6 w-6 ${cornerDetails.color}`} />
          <h1 className="text-2xl font-bold">{cornerDetails.title}</h1>
        </div>
        <p className="text-muted-foreground">{cornerDetails.description}</p>
      </div>

      {corner === "study" && (
        <div className="mb-4">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setShowAIAssistant(!showAIAssistant)}
          >
            <MessageSquare className="h-4 w-4" />
            {showAIAssistant ? "Hide AI Assistant" : "Show AI Assistant"}
          </Button>
        </div>
      )}

      {corner === "study" && showAIAssistant && <AIAssistant />}

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  )
}
