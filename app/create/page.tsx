"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Book, Palette, Lightbulb, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function CreatePost() {
  const [content, setContent] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [corner, setCorner] = useState("")
  const [category, setCategory] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content) {
      toast({
        title: "Missing content",
        description: "Please add some text to your post.",
        variant: "destructive",
      })
      return
    }

    if (!corner) {
      toast({
        title: "Select a corner",
        description: "Please select which corner to post to.",
        variant: "destructive",
      })
      return
    }

    if (corner === "creativity" && !category) {
      toast({
        title: "Select a category",
        description: "Please select a creativity category.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Post created",
        description: "Your post has been published successfully!",
      })

      // Redirect to appropriate page
      if (corner === "creativity") {
        router.push(`/posts/creativity/${category}`)
      } else {
        router.push(`/posts/${corner}`)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error creating your post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create a Post</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="corner">Select Corner</Label>
              <Select value={corner} onValueChange={setCorner}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a corner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="study">
                    <div className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-blue-500" />
                      <span>Study Corner</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="creativity">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-purple-500" />
                      <span>Creativity Corner</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="innovation">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      <span>Innovation Corner</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {corner === "creativity" && (
              <div className="space-y-2">
                <Label htmlFor="category">Select Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="painting">Painting</SelectItem>
                    <SelectItem value="dance">Dance</SelectItem>
                    <SelectItem value="photography">Photography</SelectItem>
                    <SelectItem value="singing">Singing</SelectItem>
                    <SelectItem value="cooking">Cooking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Share your thoughts, ideas, or creations..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-32"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Attachment (Image, Video, or PDF)</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="file"
                  type="file"
                  accept="image/*,video/*,.pdf"
                  onChange={handleFileChange}
                  className="flex-1"
                />
                {file && (
                  <Button type="button" variant="outline" size="icon" onClick={() => setFile(null)}>
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
