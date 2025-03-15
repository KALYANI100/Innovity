import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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

        let fileUrl = null;
        if (file) {
            fileUrl = await uploadToS3(file.buffer, file.originalname, file.mimetype);
        }

        const today = new Date();
        const lastPost = student.lastPost ? new Date(student.lastPost) : null;

        let newStreak = 1;
        let new_points=0;
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

        // Update student's post streak
        await studentModel.findByIdAndUpdate(studentId, {
            curr_streak: newStreak,
            longest_streak: Math.max(student.longest_streak, newStreak),
            points:new_points,
            lastPost: today,
        });

        res.json({ success: true, message: `Post created! Streak: ${newStreak}`, fileUrl });

    } catch (error) {
        console.error("🚨 Error creating post:", error);
        res.status(500).json({ success: false, message: "Error creating post" });
    }
};

export { createPost };
