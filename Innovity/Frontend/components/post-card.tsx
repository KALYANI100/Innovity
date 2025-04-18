"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Send } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { jwtDecode } from "jwt-decode"

export type Comment = {
  id: string
  author: {
    name: string
    profile_pic?: string
  }
  content: string
  createdAt: string
}

export type Post = {
  _id: string
  studentId: string
  createdAt: string
  description: string
  fileUrl?: string
  likes: {
    students: string[];
    teachers: string[];
  }
  comments: Comment[]
  __v: number
  // Add additional fields for the student author info that will be populated
  author?: {
    name: string
    profile_pic?: string
  }
  
}

interface PostCardProps {
  post: Post
  currentUser?: {
    id: string
    name: string
    profile_pic?: string
  }
}

export function PostCard({ post, currentUser }: PostCardProps) {
  console.log(currentUser)
  const [loading , setLoading] = useState(false);
  // const [student , setStudent] = useState<any>(null);
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(Object.keys(post.likes || {}).length)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>(
    post.comments && post.comments.length > 0 ? post.comments : []
  )
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
  // }, []);
  // Helper function to determine file type
  const getFileType = (url: string | undefined) => {
    if (!url) return null;
    const extension = url.split('.').pop()?.toLowerCase();
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return 'image';
    } else if (['mp4', 'webm', 'mov'].includes(extension || '')) {
      return 'video';
    } else if (extension === 'pdf') {
      return 'pdf';
    }
    return null;
  };

  const fileType = getFileType(post.fileUrl);
  
  // Format the date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
    // In a real app, you would also make an API call to update the like status
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: currentUser?.name || "Anonymous",
        profile_pic: currentUser?.profile_pic || "/placeholder.svg?height=32&width=32",
      },
      content: commentText,
      createdAt: "Just now",
    }

    setComments([...comments, newComment])
    setCommentText("")
    // In a real app, you would also make an API call to save the comment
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={currentUser?.profile_pic || "/placeholder.svg"} alt={post.author?.name} />
            <AvatarFallback>{currentUser?.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{currentUser?.name || "Unknown User"}</div>
            <div className="text-xs text-muted-foreground">{formatDate(post.createdAt)}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-3">{post.description}</p>
        {fileType === 'image' && post.fileUrl && (
          <div className="relative w-full h-64 rounded-md overflow-hidden">
            <Image src={post.fileUrl} alt="Post image" fill className="object-cover" />
          </div>
        )}
        {fileType === 'video' && post.fileUrl && (
          <div className="relative w-full rounded-md overflow-hidden aspect-video">
            <video src={post.fileUrl} controls className="w-full" />
          </div>
        )}
        {fileType === 'pdf' && post.fileUrl && (
          <div className="border rounded-md p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">Document</p>
              <p className="text-sm text-muted-foreground">PDF Document</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={post.fileUrl} target="_blank" rel="noopener noreferrer">
                View
              </a>
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex space-x-4 w-full mb-2">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
            onClick={handleLike}
          >
            <Heart className="h-4 w-4" />
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{comments.length}</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>

        {showComments && (
          <div className="w-full border-t pt-2 mt-2">
            <div className="space-y-3 max-h-60 overflow-y-auto mb-3">
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={comment.author.profile_pic || "/placeholder.svg"} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted p-2 rounded-md flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-muted-foreground">No comments yet</p>
              )}
            </div>

            <form onSubmit={handleAddComment} className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="sm" disabled={!commentText.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}