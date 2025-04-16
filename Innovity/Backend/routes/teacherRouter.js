import express from "express"
import { getAllTeachers, loginTeacher ,registerTeacher } from "../controllers/teacherController.js";

const teacherRouter = express.Router();

teacherRouter.post("/register",registerTeacher);
teacherRouter.post("/login",loginTeacher);
teacherRouter.get("/getall",getAllTeachers);

export default teacherRouter;