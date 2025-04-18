"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PostCard, type Post } from "@/components/post-card";
import { Trophy, Medal, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {jwtDecode} from "jwt-decode";

export default function Profile() {
  const [student, setStudent] = useState<any>(null);
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      try {
        const userStr =
          typeof window !== "undefined" ? localStorage.getItem("user") : null;
        if (userStr) {
          const userObj = JSON.parse(userStr);
          const token = userObj?.token;
          if (token) {
            const decoded: { id: string } = jwtDecode(token);
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/student/get/${decoded.id}`
            );
            if (!res.ok) throw new Error("Failed to fetch student data");
            const data = await res.json();
            setStudent(data);
          }
        }
      } catch (err) {
        console.error("❌ Error fetching student from API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!student || !student._id) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getall/${student._id}`,
          { method: "GET" }
        );
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, [student]);

  const handleLogout = () => {
    localStorage.removeItem("studentData");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    window.location.href = "/login";
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!student) return null;

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src={student?.profile_pic || "/placeholder.svg"}
                  alt={student?.name || "User"}
                />
                <AvatarFallback>{student?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{student.name}</CardTitle>
                <CardDescription>{student.email}</CardDescription>
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
              <span className="font-medium">Points:</span>
            </div>
            <span className="text-xl font-bold">{student.points}</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <Medal className="h-5 w-5 text-purple-500" />
              <span className="font-medium">Badges Earned:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(student.badges) && student.badges.length > 0 ? (
                student.badges.map((badge: string, index: number) => (
                  <div
                    key={index}
                    className="bg-muted px-3 py-1 rounded-full text-sm"
                  >
                    {badge}
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground">No badges yet</span>
              )}
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
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post, index) => (
                <PostCard key={index} post={post} currentUser={student} />
              ))}
            </div>
          ) : (
            <div className="text-center p-8">
              <p className="text-muted-foreground">
                You haven't created any posts yet.
              </p>
              <Button className="mt-4">Create Your First Post</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="achievements" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Your Achievements</CardTitle>
              <CardDescription>
                Track your progress and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Current Streak</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    You're on a {student.curr_streak} day learning streak!
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    <span className="font-medium">Longest Streak</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your record streak is {student.longest_streak} days.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}