"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PostCard, type Post } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { Book, Palette, Lightbulb, MessageSquare } from "lucide-react"
import { AIAssistant } from "@/components/ai-assistant"
import { jwtDecode } from "jwt-decode"

export default function PostsPage() {
  const { corner } = useParams<{ corner: string }>()
  const [student, setStudent] = useState<any>(null);
  const [loading,setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([])
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getpostsbydomain?domain=${corner}`
        )
        if (!res.ok) {
          throw new Error("Failed to fetch posts")
        }
        const data = await res.json()
        setPosts(data.posts || [])
      } catch (error) {
        console.error("Error fetching posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [corner])
  // useEffect(() => {
  //     const fetchStudent = async () => {
  //       setLoading(true);
  //       try {
  //         const userStr =
  //           typeof window !== "undefined" ? localStorage.getItem("user") : null;
  //         if (userStr) {
  //           const userObj = JSON.parse(userStr);
  //           const token = userObj?.token;
  //           if (token) {
  //             const decoded: { id: string } = jwtDecode(token);
  //             const res = await fetch(
  //               `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/get/${decoded.id}`
  //             );
  //             if (!res.ok) throw new Error("Failed to fetch student data");
  //             const data = await res.json();
  //             setStudent(data);
  //           }
  //         }
  //       } catch (err) {
  //         console.error("❌ Error fetching student from API:", err);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  
  //     fetchStudent();
  //   }, []);
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
        {loading ? (
          <div className="text-center p-8">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        ) : posts.length > 0 ? (
          posts.map((post,index) => <PostCard key={index} post={post} currentUser={post.studentId} />)
        ) : (
          <div className="text-center p-8">
            <p className="text-muted-foreground">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  )
}
