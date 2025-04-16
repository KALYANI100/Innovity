"use client"

import type React from "react"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, Send } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Input } from "@/components/ui/input"

export type Comment = {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  createdAt: string
}

export type Post = {
  id: string
  author: {
    name: string
    avatar?: string
  }
  content: string
  image?: string
  video?: string
  pdf?: string
  likes: number
  comments: number
  commentsList?: Comment[]
  createdAt: string
}

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [comments, setComments] = useState<Comment[]>(
    post.commentsList || [
      {
        id: "1",
        author: {
          name: "Jane Smith",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content: "This is really interesting! Thanks for sharing.",
        createdAt: "1 hour ago",
      },
      {
        id: "2",
        author: {
          name: "Mike Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
        },
        content: "Great work! I learned a lot from this.",
        createdAt: "30 minutes ago",
      },
    ],
  )

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: {
        name: "Student User", // This would come from the auth context in a real app
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: commentText,
      createdAt: "Just now",
    }

    setComments([...comments, newComment])
    setCommentText("")
  }

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{post.author.name}</div>
            <div className="text-xs text-muted-foreground">{post.createdAt}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="mb-3">{post.content}</p>
        {post.image && (
          <div className="relative w-full h-64 rounded-md overflow-hidden">
            <Image src={post.image || "/placeholder.svg"} alt="Post image" fill className="object-cover" />
          </div>
        )}
        {post.video && (
          <div className="relative w-full rounded-md overflow-hidden aspect-video">
            <video src={post.video} controls className="w-full" />
          </div>
        )}
        {post.pdf && (
          <div className="border rounded-md p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">Document</p>
              <p className="text-sm text-muted-foreground">PDF Document</p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <a href={post.pdf} target="_blank" rel="noopener noreferrer">
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
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
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
              ))}
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
