"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Brain, Trophy, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

// Mock quiz questions
const mockQuizQuestions = [
  {
    id: "1",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    id: "2",
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    id: "3",
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: "Au",
  },
  {
    id: "4",
    question: "Which of these is not a primary color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    correctAnswer: "Green",
  },
  {
    id: "5",
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: "Blue Whale",
  },
]

// Mock upcoming competitions
const mockCompetitions = [
  {
    id: "1",
    title: "Science Innovation Challenge",
    description: "Create an innovative solution to a real-world problem using scientific principles.",
    date: "May 15, 2025",
    registrationOpen: true,
  },
  {
    id: "2",
    title: "Creative Writing Contest",
    description: "Write a short story on the theme 'Future of Education'.",
    date: "June 2, 2025",
    registrationOpen: true,
  },
  {
    id: "3",
    title: "Math Olympiad",
    description: "Test your mathematical skills in this challenging competition.",
    date: "June 10, 2025",
    registrationOpen: false,
  },
]

export default function Compete() {
  const [activeTab, setActiveTab] = useState("quiz")
  const [quizState, setQuizState] = useState<"setup" | "inProgress" | "completed">("setup")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({})
  const [quizResults, setQuizResults] = useState<{
    score: number
    totalQuestions: number
    correctAnswers: number
  } | null>(null)

  const router = useRouter()
  const { toast } = useToast()

  const startQuiz = () => {
    if (!selectedTopic || !selectedDifficulty) {
      toast({
        title: "Missing selection",
        description: "Please select both a topic and difficulty level.",
        variant: "destructive",
      })
      return
    }

    setQuizState("inProgress")
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
  }

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    })
  }

  const goToNextQuestion = () => {
    if (currentQuestionIndex < mockQuizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      completeQuiz()
    }
  }

  const completeQuiz = () => {
    // Calculate results
    let correctAnswers = 0
    mockQuizQuestions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    setQuizResults({
      score: Math.round((correctAnswers / mockQuizQuestions.length) * 100),
      totalQuestions: mockQuizQuestions.length,
      correctAnswers,
    })

    setQuizState("completed")
  }

  const resetQuiz = () => {
    setQuizState("setup")
    setSelectedTopic("")
    setSelectedDifficulty("")
    setQuizResults(null)
  }

  const currentQuestion = mockQuizQuestions[currentQuestionIndex]

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Compete</h1>
        <p className="text-muted-foreground">Test your knowledge and skills in competitions</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="quiz">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>Quiz</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="competitions">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Competitions</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quiz" className="mt-0">
          <Card>
            {quizState === "setup" && (
              <>
                <CardHeader>
                  <CardTitle>Start a Quiz</CardTitle>
                  <CardDescription>Select a topic and difficulty level to begin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="math">Mathematics</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                        <SelectItem value="general">General Knowledge</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={startQuiz}>
                    Start Quiz
                  </Button>
                </CardFooter>
              </>
            )}

            {quizState === "inProgress" && currentQuestion && (
              <>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {mockQuizQuestions.length}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Time remaining: 2:45</span>
                    </div>
                  </div>
                  <CardTitle>{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={selectedAnswers[currentQuestion.id] || ""}
                    onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
                    className="space-y-3"
                  >
                    {currentQuestion.options.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted/50"
                        onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                      >
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={goToNextQuestion} disabled={!selectedAnswers[currentQuestion.id]}>
                    {currentQuestionIndex < mockQuizQuestions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                </CardFooter>
              </>
            )}

            {quizState === "completed" && quizResults && (
              <>
                <CardHeader>
                  <CardTitle className="text-center">Quiz Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="text-6xl font-bold mb-2">{quizResults.score}%</div>
                    <p className="text-muted-foreground">
                      You got {quizResults.correctAnswers} out of {quizResults.totalQuestions} questions correct
                    </p>
                  </div>

                  <div className="space-y-4">
                    {mockQuizQuestions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          {selectedAnswers[question.id] === question.correctAnswer ? (
                            <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium">
                              {index + 1}. {question.question}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              Your answer:{" "}
                              <span
                                className={
                                  selectedAnswers[question.id] === question.correctAnswer
                                    ? "text-green-500 font-medium"
                                    : "text-red-500 font-medium"
                                }
                              >
                                {selectedAnswers[question.id]}
                              </span>
                            </p>
                            {selectedAnswers[question.id] !== question.correctAnswer && (
                              <p className="text-sm text-muted-foreground">
                                Correct answer:{" "}
                                <span className="text-green-500 font-medium">{question.correctAnswer}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button className="w-full" onClick={resetQuiz}>
                    Take Another Quiz
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => router.push("/dashboard")}>
                    Back to Dashboard
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </TabsContent>

        <TabsContent value="competitions" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Competitions</CardTitle>
              <CardDescription>Participate in competitions to showcase your skills and win credits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCompetitions.map((competition) => (
                  <Card key={competition.id}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">{competition.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-muted-foreground mb-2">{competition.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{competition.date}</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={competition.registrationOpen ? "default" : "outline"}
                        disabled={!competition.registrationOpen}
                      >
                        {competition.registrationOpen ? "Register Now" : "Registration Closed"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
