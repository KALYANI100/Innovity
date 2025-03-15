import express from "express"
import { loginStudent , registerStudent } from "../controllers/studentController.js"

const studentRouter = express.Router();

studentRouter.post("/register",registerStudent);
studentRouter.post("/login",loginStudent);

export default studentRouter;
