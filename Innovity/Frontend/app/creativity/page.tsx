// "use client"
// import { useRouter } from "next/navigation"
// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Palette, Music, Camera, Utensils, Video } from "lucide-react"

// export default function CreativityCorner() {
//   const router = useRouter()

//   const categories = [
//     {
//       id: "painting",
//       title: "Painting",
//       description: "Share your paintings and drawings",
//       icon: Palette,
//       color: "bg-red-100 dark:bg-red-900",
//       iconColor: "text-red-500",
//     },
//     {
//       id: "dance",
//       title: "Dance",
//       description: "Show off your dance moves",
//       icon: Video,
//       color: "bg-purple-100 dark:bg-purple-900",
//       iconColor: "text-purple-500",
//     },
//     {
//       id: "photography",
//       title: "Photography",
//       description: "Display your photography skills",
//       icon: Camera,
//       color: "bg-blue-100 dark:bg-blue-900",
//       iconColor: "text-blue-500",
//     },
//     {
//       id: "singing",
//       title: "Singing",
//       description: "Share your musical talents",
//       icon: Music,
//       color: "bg-green-100 dark:bg-green-900",
//       iconColor: "text-green-500",
//     },
//     {
//       id: "cooking",
//       title: "Cooking",
//       description: "Show your culinary creations",
//       icon: Utensils,
//       color: "bg-amber-100 dark:bg-amber-900",
//       iconColor: "text-amber-500",
//     },
//   ]

//   const handleCategorySelect = (categoryId: string) => {
//     router.push(`/posts/creativity/${categoryId}`)
//   }

//   return (
//     <div className="container max-w-4xl mx-auto p-4">
//       <div className="mb-6 text-center">
//         <h1 className="text-3xl font-bold">Creativity Corner</h1>
//         <p className="text-muted-foreground">Choose a category to explore or share your creative work</p>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {categories.map((category) => (
//           <Card
//             key={category.id}
//             className="overflow-hidden transition-all hover:shadow-lg cursor-pointer"
//             onClick={() => handleCategorySelect(category.id)}
//           >
//             <div className={`p-6 ${category.color}`}>
//               <category.icon className={`h-12 w-12 ${category.iconColor}`} />
//             </div>
//             <CardHeader>
//               <CardTitle>{category.title}</CardTitle>
//               <CardDescription>{category.description}</CardDescription>
//             </CardHeader>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }
