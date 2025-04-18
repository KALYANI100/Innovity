import express from "express"
import { getAllStudents, getSingleUser, loginStudent , registerStudent } from "../controllers/studentController.js"

const studentRouter = express.Router();

studentRouter.post("/register",registerStudent);
studentRouter.post("/login",loginStudent);
studentRouter.get("/getall",getAllStudents);
studentRouter.get("/get/:userId",getSingleUser);

export default studentRouter;