import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import postModel from "../models/postModel.js";
import studentModel from "../models/studentModel.js";
import dotenv from "dotenv";

dotenv.config();
const s3client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

// ✅ Upload File to S3 (Fixed)
const uploadToS3 = async (fileBuffer, fileName, mimeType) => {
    const key = `posts/${Date.now()}-${fileName}`;

    const uploadCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: key,
        Body: fileBuffer,
        ContentType: mimeType
    });

    try {
        await s3client.send(uploadCommand); // Upload to S3
        console.log("✅ File uploaded to S3:", key);
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error) {
        console.error("🚨 S3 Upload Error:", error);
        throw new Error("File upload failed");
    }
};

// ✅ Create Post (Fixed)
const createPost = async (req, res) => {
    const { studentId, description, domain } = req.body;
    const file = req.file; // File uploaded from frontend (multer should be used)

    try {
        console.log("📁 Received File:", file);
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.json({ success: false, message: "Student not found" });
        }

        let fileUrl = "htttps://nothing.com";
        if (file) {
            fileUrl = await uploadToS3(file.buffer, file.originalname, file.mimetype);
        }

        const today = new Date();
        const lastPost = student.lastPost ? new Date(student.lastPost) : null;

        let newStreak = 1;
        let new_points=10;
        if (lastPost) {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            if (lastPost >= oneWeekAgo) {
                newStreak = student.curr_streak + 1; 
                new_points=student.points+10;
            }
        }
        // Save post to MongoDB
        const newPost = new postModel({
            studentId,
            description,
            createdAt: today,
            domain,
            fileUrl,
        });
        await newPost.save();
        
         // Check if student qualifies for the 30-day streak badge
         let updatedBadges = student.badges || [];
         const badgeUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/badges/30_streak.jpg`; // Replace with actual badge image URL
 
         if (newStreak === 30 && !updatedBadges.includes(badgeUrl)) {
             updatedBadges.push(badgeUrl);
         }
        // Update student's post streak
        await studentModel.findByIdAndUpdate(studentId, {
            curr_streak: newStreak,
            longest_streak: Math.max(student.longest_streak, newStreak),
            points:new_points,
            lastPost: today,
            badges:updatedBadges,
        });

        res.json({ success: true, message: `Post created! Streak: ${newStreak}`, fileUrl });

    } catch (error) {
        console.error("🚨 Error creating post:", error);
        res.status(500).json({ success: false, message: "Error creating post" });
    }
};

// ✅ Delete Post Function
const deletePost = async (req, res) => {
    const { postId, studentId } = req.body;  // Expecting postId & studentId in the request

    try {
        // 🔹 Find the post to delete
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // 🔹 Delete the file from S3 if it exists
        if (post.fileUrl) {
            const key = post.fileUrl.split(".amazonaws.com/")[1]; // Extract key from URL
            const deleteCommand = new DeleteObjectCommand({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Key: key,
            });

            try {
                await s3client.send(deleteCommand);
                console.log("✅ File deleted from S3:", key);
            } catch (error) {
                console.error("🚨 S3 Delete Error:", error);
            }
        }

        // Delete the post from MongoDB
        await postModel.findByIdAndDelete(postId);
        console.log("✅ Post deleted from DB:", postId);

        //Find the student's most recent post
        const latestPost = await postModel.findOne({ studentId }).sort({ createdAt: -1 });

        // 🔹 Update student's `lastPost` field and adjust the streak
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        let updatedLastPost = latestPost ? latestPost.createdAt : null;
        let newStreak = 0;

        if (updatedLastPost) {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(new Date().getDate() - 7);
            if (updatedLastPost >= oneWeekAgo) {
                newStreak = student.curr_streak -1; // Maintain streak if last post is within 7 days
            }
        }

        await studentModel.findByIdAndUpdate(studentId, {
            lastPost: updatedLastPost,
            curr_streak: newStreak,
        });

        res.json({ success: true, message: "Post deleted successfully!" });

    } catch (error) {
        console.error("🚨 Error deleting post:", error);
        res.status(500).json({ success: false, message: "Error deleting post" });
    }
};

export { deletePost,createPost };

