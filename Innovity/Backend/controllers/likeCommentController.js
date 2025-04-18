import Post from "../models/postModel.js";
import studentModel from "../models/studentModel.js";
import teacherModel from "../models/teacherModel.js";

const likePost = async (req, res) => {
    const { postId, userId, userType } = req.body;

    try {
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

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        const likeField = userType === "student" ? post.likes.students : post.likes.teachers;

        const alreadyLiked = likeField.includes(userId);

        if (alreadyLiked) {
            post.likes[userType + "s"] = likeField.filter(id => id.toString() !== userId);
        } else {
            post.likes[userType + "s"].push(userId);
        }

        await post.save();
        res.json({ success: true, message: alreadyLiked ? "Unliked post" : "Liked post" });

    } catch (error) {
        console.error("🚨 Error liking post:", error);
        res.status(500).json({ success: false, message: "Error liking post" });
    }
};


const commentOnPost = async (req, res) => {
    const { postId, userId, userType, text } = req.body;

    try {
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

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        post.comments.push({
            userId,
            userType,
            text,
            createdAt: new Date(),
        });

        await post.save();
        res.json({ success: true, message: "Comment of User added successfully" });

    } catch (error) {
        console.error("🚨 Error commenting on post:", error);
        res.status(500).json({ success: false, message: "Error commenting on post" });
    }
};

export { likePost, commentOnPost };
