import express from 'express'
import { createPost } from '../controllers/postController.js';
import multer from 'multer';
const postRouter = express.Router();

const storage = multer.memoryStorage(); // Use memory storage for AWS S3
const upload = multer({ storage });
postRouter.post("/post", upload.single("file"),createPost);

export default postRouter;
