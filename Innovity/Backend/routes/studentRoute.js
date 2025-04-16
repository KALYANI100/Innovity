import express from "express"
import { getAllStudents, loginStudent , registerStudent } from "../controllers/studentController.js"

const studentRouter = express.Router();

studentRouter.post("/register",registerStudent);
studentRouter.post("/login",loginStudent);
studentRouter.get("/getall",getAllStudents);

export default studentRouter;
