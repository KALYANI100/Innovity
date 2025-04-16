"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PostCard, type Post } from "@/components/post-card"
import { Palette, Camera, Music, Video, Utensils } from "lucide-react"

// Update the mock creativity posts to include commentsList
const mockCreativityPosts: Record<string, Post[]> = {
  painting: [
    {
      id: "1",
      author: {
        name: "Emma Wilson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "My latest watercolor painting of the sunset at the beach!",
      image: "/placeholder.svg?height=300&width=500",
      likes: 45,
      comments: 12,
      commentsList: [
        {
          id: "1",
          author: {
            name: "Art Teacher",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "Beautiful use of colors, Emma! The gradient in the sky is perfect.",
          createdAt: "2 hours ago",
        },
        {
          id: "2",
          author: {
            name: "Fellow Artist",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "What brushes did you use for this? The texture is amazing!",
          createdAt: "1 hour ago",
        },
      ],
      createdAt: "3 hours ago",
    },
    {
      id: "2",
      author: {
        name: "Noah Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Abstract art I created for the school exhibition",
      image: "/placeholder.svg?height=300&width=500",
      likes: 32,
      comments: 8,
      commentsList: [
        {
          id: "1",
          author: {
            name: "Art Enthusiast",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "I love the emotion this conveys. The composition is really striking.",
          createdAt: "20 hours ago",
        },
        {
          id: "2",
          author: {
            name: "Gallery Owner",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "This would look amazing in our student showcase. Would you be interested?",
          createdAt: "12 hours ago",
        },
      ],
      createdAt: "1 day ago",
    },
  ],
  photography: [
    {
      id: "3",
      author: {
        name: "Olivia Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Captured this amazing wildlife shot during our field trip!",
      image: "/placeholder.svg?height=300&width=500",
      likes: 67,
      comments: 15,
      commentsList: [
        {
          id: "1",
          author: {
            name: "Photography Club",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "The composition and timing are perfect! What camera settings did you use?",
          createdAt: "4 hours ago",
        },
        {
          id: "2",
          author: {
            name: "Nature Lover",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "This is breathtaking! The lighting really brings out the details.",
          createdAt: "2 hours ago",
        },
      ],
      createdAt: "5 hours ago",
    },
  ],
  dance: [
    {
      id: "4",
      author: {
        name: "Liam Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "My hip-hop dance routine for the talent show next week",
      video: "https://example.com/video.mp4",
      likes: 89,
      comments: 24,
      commentsList: [
        {
          id: "1",
          author: {
            name: "Dance Coach",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "Your moves are so clean and precise! Keep up the great work.",
          createdAt: "1 day ago",
        },
        {
          id: "2",
          author: {
            name: "Talent Show Judge",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "This is going to be a showstopper! Can't wait to see it live.",
          createdAt: "1 day ago",
        },
      ],
      createdAt: "2 days ago",
    },
  ],
  singing: [
    {
      id: "5",
      author: {
        name: "Ava Brown",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Cover of my favorite song - let me know what you think!",
      video: "https://example.com/video.mp4",
      likes: 76,
      comments: 18,
      commentsList: [
        {
          id: "1",
          author: {
            name: "Music Teacher",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "Your vocal control is impressive! The high notes were perfect.",
          createdAt: "20 hours ago",
        },
        {
          id: "2",
          author: {
            name: "Music Fan",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "This gave me chills! You have such a beautiful voice.",
          createdAt: "12 hours ago",
        },
      ],
      createdAt: "1 day ago",
    },
  ],
  cooking: [
    {
      id: "6",
      author: {
        name: "Lucas Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Made this delicious chocolate cake from scratch!",
      image: "/placeholder.svg?height=300&width=500",
      likes: 54,
      comments: 13,
      commentsList: [
        {
          id: "1",
          author: {
            name: "Baking Enthusiast",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "This looks amazing! Would you mind sharing the recipe?",
          createdAt: "3 hours ago",
        },
        {
          id: "2",
          author: {
            name: "Culinary Student",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "The frosting looks perfect! What technique did you use?",
          createdAt: "2 hours ago",
        },
      ],
      createdAt: "4 hours ago",
    },
  ],
}

export default function CreativityCategoryPage() {
  const { category } = useParams<{ category: string }>()
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    // In a real app, fetch posts from API
    setPosts(mockCreativityPosts[category as string] || [])
  }, [category])

  const getCategoryDetails = () => {
    switch (category) {
      case "painting":
        return {
          title: "Painting",
          icon: Palette,
          color: "text-red-500",
          description: "Explore and share paintings and drawings",
        }
      case "dance":
        return {
          title: "Dance",
          icon: Video,
          color: "text-purple-500",
          description: "Watch and share dance performances",
        }
      case "photography":
        return {
          title: "Photography",
          icon: Camera,
          color: "text-blue-500",
          description: "Discover and share amazing photographs",
        }
      case "singing":
        return {
          title: "Singing",
          icon: Music,
          color: "text-green-500",
          description: "Listen to and share vocal performances",
        }
      case "cooking":
        return {
          title: "Cooking",
          icon: Utensils,
          color: "text-amber-500",
          description: "Explore and share culinary creations",
        }
      default:
        return {
          title: "Creativity",
          icon: Palette,
          color: "text-primary",
          description: "Showcase your creative talents",
        }
    }
  }

  const categoryDetails = getCategoryDetails()
  const CategoryIcon = categoryDetails.icon

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <CategoryIcon className={`h-6 w-6 ${categoryDetails.color}`} />
          <h1 className="text-2xl font-bold">{categoryDetails.title}</h1>
        </div>
        <p className="text-muted-foreground">{categoryDetails.description}</p>
      </div>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No posts yet in this category. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  )
}
