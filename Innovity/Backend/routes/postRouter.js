import express from 'express'
import { createPost, deletePost, getAllPosts, getPostsByDomain } from '../controllers/postController.js';
import multer from 'multer';
import { commentOnPost, likePost } from '../controllers/likeCommentController.js';
const postRouter = express.Router();

const storage = multer.memoryStorage(); // Use memory storage for AWS S3
const upload = multer({ storage });
postRouter.post("/post",upload.single("file"),createPost);
postRouter.delete("/delete",deletePost);
postRouter.post("/like",likePost);
postRouter.post("/comment",commentOnPost);
postRouter.get("/getall/:studentId",getAllPosts);
postRouter.get("/getpostsbydomain",getPostsByDomain);
export default postRouter;
