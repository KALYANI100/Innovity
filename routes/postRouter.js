import express from 'express'
import { createPost, deletePost } from '../controllers/postController.js';
import multer from 'multer';
import { commentOnPost, likePost } from '../controllers/likeCommentController.js';
import authMiddleware from '../middleware/auth.js';
const postRouter = express.Router();

const storage = multer.memoryStorage(); // Use memory storage for AWS S3
const upload = multer({ storage });
postRouter.post("/post", authMiddleware,upload.single("file"),createPost);
postRouter.post("/delete", authMiddleware,deletePost);
postRouter.post("/like",authMiddleware,likePost);
postRouter.post("/comment",authMiddleware,commentOnPost);
export default postRouter;
