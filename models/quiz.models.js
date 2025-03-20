import mongoose from "mongoose";
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
export default Quiz;