import mongoose from "mongoose";
const leaderboardSchema = new mongoose.Schema({
  username:String,
  score:Number,
  timestamp: {type: Date,default:Date.now}
});
const Leaderboard = mongoose.model("Leaderboard",leaderboardSchema);
export default Leaderboard;