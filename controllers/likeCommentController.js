import Post from "../models/postModel.js";
import studentModel from "../models/studentModel.js";
import teacherModel from "../models/teacherModel.js";

/**
 * ✅ Like or Unlike a Post (After Verifying User Type)
 */
const likePost = async (req, res) => {
    const { postId, userId, userType } = req.body; // userType should be 'student' or 'teacher'

    try {
        // 🔹 Validate user type from database
        let user;
        if (userType === "student") {
            user = await studentModel.findById(userId);
        } else if (userType === "teacher") {
            user = await teacherModel.findById(userId);
        } else {
            return res.status(400).json({ success: false, message: "Invalid user type" });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 🔹 Fetch the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // 🔹 Determine where to store the like (students or teachers)
        const likeField = userType === "student" ? post.likes.students : post.likes.teachers;

        // 🔹 Check if user already liked the post
        const alreadyLiked = likeField.includes(userId);

        if (alreadyLiked) {
            // Unlike the post
            post.likes[userType + "s"] = likeField.filter(id => id.toString() !== userId);
        } else {
            // Like the post
            post.likes[userType + "s"].push(userId);
        }

        await post.save();
        res.json({ success: true, message: alreadyLiked ? "Unliked post" : "Liked post" });

    } catch (error) {
        console.error("🚨 Error liking post:", error);
        res.status(500).json({ success: false, message: "Error liking post" });
    }
};

/**
 * ✅ Comment on a Post (After Verifying User Type)
 */
const commentOnPost = async (req, res) => {
    const { postId, userId, userType, text } = req.body;

    try {
        // 🔹 Validate user type from database
        let user;
        if (userType === "student") {
            user = await studentModel.findById(userId);
        } else if (userType === "teacher") {
            user = await teacherModel.findById(userId);
        } else {
            return res.status(400).json({ success: false, message: "Invalid user type" });
        }

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // 🔹 Fetch the post
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // 🔹 Add comment to the post
        post.comments.push({
            userId,
            userType, // Store user type for better reference
            text,
            createdAt: new Date(),
        });

        await post.save();
        res.json({ success: true, message: "Comment added successfully" });

    } catch (error) {
        console.error("🚨 Error commenting on post:", error);
        res.status(500).json({ success: false, message: "Error commenting on post" });
    }
};

export { likePost, commentOnPost };
