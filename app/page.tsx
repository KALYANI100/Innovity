import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <Sparkles className="h-16 w-16 text-primary" />
            <div className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground rounded-full p-2">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to <span className="text-primary">InnoVity</span>
        </h1>

        <p className="text-xl text-muted-foreground mb-8">
          A creative learning hub where students can showcase creativity, build knowledge, and engage in meaningful
          competitions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="text-lg">
            <Link href="/auth/login">Login</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-lg">
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
