import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "student", required: true }, // Reference to the student who created the post
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the post was created
    description: { type: String, required: true }, // Post content
    fileUrl: { type: String, required: true }, // Image URL from S3
    
    likes: {
        students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }], // Array of student IDs who liked the post
        teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }] // Array of teacher IDs who liked the post
    },

    comments: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "comments.userType" }, // Can be student or teacher ID
            text: { type: String, required: true }, // Comment content
            createdAt: { type: Date, default: Date.now } // Timestamp of comment
        }
    ],
    
    domain: {type:String,required:true}
    


});

const Post = mongoose.models.post || mongoose.model("post", postSchema);
export default Post;
