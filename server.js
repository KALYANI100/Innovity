import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connected"))
.catch((err)=>console.error("Failed",err));

const quizSchema = new mongoose.Schema({
  topic:String,
  difficulty:String,
  questions:[
    {
      questionText:String,
      options:[String],
      correctAnswer:String
    }
  ]
});

const Quiz = mongoose.model("Quiz",quizSchema);

const leaderboardSchema = new mongoose.Schema({
  username:String,
  score:Number,
  timestamp: {type: Date,default:Date.now}
});
const Leaderboard = mongoose.model("Leaderboard",leaderboardSchema);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });


app.post("/generate-quiz", async (req, res) => {
  try {
    const { topic, difficulty, numQuestions } = req.body;

    const prompt = `Generate a ${numQuestions}-question quiz on "${topic}" with "${difficulty}" difficulty.
    Return ONLY a valid JSON object in this format:
    {
      "questions": [
        {
          "questionText": "What is the chemical symbol for water?",
          "options": ["H2O", "CO2", "NaCl", "O2"],
          "correctAnswer": "H2O"
        }
      ]
    }`;
    

    const result = await model.generateContent(prompt);
    let response = await result.response.text();
    console.log("Raw Response from Gemini:", response);

    response = response.replace(/```json|```/g, "").trim();

    const quizData = JSON.parse(response);
    if (!quizData.questions || !Array.isArray(quizData.questions)) {
      return res.status(400).json({ error: "Invalid quiz format" });
    }
    const newQuiz = new Quiz({
      topic,
      difficulty,
      questions:quizData.questions
    });
    await newQuiz.save();
    res.json({ quiz: quizData });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

app.post("/submit-quiz", async (req, res) => {
  try {
    const { username, answers, quizId } = req.body;

    if (!username || !answers || !quizId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    let score = 0;
    quiz.questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score += 1;
      }
    });

    const newEntry = new Leaderboard({ username, score });
    await newEntry.save();

    res.json({ message: "Quiz submitted successfully", score });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    const topScores = await Leaderboard.find().sort({ score: -1 }).limit(10);
    res.json({ leaderboard: topScores });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
