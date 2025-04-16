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


const createPost = async (req, res) => {
    const { studentId, description, domain } = req.body;
    const file = req.file; // File uploaded from frontend (multer should be used)

    try {
        console.log("📁 Received File:", file);
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.json({ success: false, message: "Student not found" });
        }

        let fileUrl = null;
        if (file) {
            fileUrl = await uploadToS3(file.buffer, file.originalname, file.mimetype);
        }
        let new_points=10;
        let newStreak = 1;
        const today = new Date();
        const lastPost = student.lastPost ? new Date(student.lastPost) : null;
        if (lastPost) {
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(today.getDate() - 7);
            if (lastPost >= oneWeekAgo) {
                newStreak = student.curr_streak + 1; 
                new_points=student.points+10;
            }
        }
        
        const newPost = new postModel({
            studentId,
            description,
            createdAt: today,
            domain,
            fileUrl,
        });
        await newPost.save();
        
         let updatedBadges = student.badges || [];
         const badgeUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/badges/30_streak.jpg`; // Replace with actual badge image URL
 
         if (newStreak === 30 && !updatedBadges.includes(badgeUrl)) {
             updatedBadges.push(badgeUrl);
         }
        
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


const deletePost = async (req, res) => {
    const { postId, studentId } = req.body;  

    try {
        
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        
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

       
        await postModel.findByIdAndDelete(postId);
        console.log("✅ Post deleted from DB:", postId);

        
        const latestPost = await postModel.findOne({ studentId }).sort({ createdAt: -1 });

        
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

const getAllPosts = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await studentModel.findById(studentId);
        if (!student) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        const posts = await postModel.find({ studentId }).sort({ createdAt: -1 });
        res.json({ success: true, posts });
    } catch (error) {
        console.error("🚨 Error fetching posts:", error);
        res.status(500).json({ success: false, message: "Error fetching posts" });
    }
};

export { deletePost,createPost,getAllPosts };

