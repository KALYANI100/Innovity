import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    curr_streak: { type: Number, default: 0 }, // Current login/post streak
    longest_streak: { type: Number, default: 0 }, // Longest recorded streak
    lastPost: { type: Date }, // Last post date for streak tracking
    points: { type: Number, default: 0 }, // Reward points
    school_id: { type: Number, required: true }, // School ID as a string
    city: { type: String, required: true },
    state: { type: String, required: true },
    profile_pic: { type: String }, // Store profile pic as URL (S3, Firebase, etc.)
    badges: [{ type: String }], // Array of badge names or IDs
    stdclass: {type:Number,required:true}
}, { minimize: false });

const studentModel = mongoose.models.student || mongoose.model("student", studentSchema);

export default studentModel;
