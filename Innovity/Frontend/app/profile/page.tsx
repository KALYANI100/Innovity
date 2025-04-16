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
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const [student, setStudent] = useState<any>(null);
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (student) {
      // console.log("Updated student:", student);
    }
  }, [student]);
  useEffect(() => {
    try {
      const userStr =
        typeof window !== "undefined" ? localStorage.getItem("user") : null;
      if (userStr) {
        const userObj = JSON.parse(userStr);
        const token = userObj.token;
        const decoded: { id: string } = jwtDecode(token);
        setStudent(userObj.student);
      }
    } catch (err) {
      console.error("Error accessing localStorage:", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentData");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    location.reload();
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getall/${student._id}`, {
          method: "GET",
        });

        const data = await res.json();
        
        setPosts(data.posts);
        // console.log(posts) // assuming API returns { posts: [...] }
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    if (student) {
      fetchPosts();
    }
  }, [student]);

  if (!student) return null;

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={student.profile_pic} alt={student.name} />
                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
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
              {student.badges?.length > 0 ? (
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
