import express from "express"
import cors from "cors"
import 'dotenv/config'
import { mongoDB } from "./config/conn.js";
import studentRouter from "./routes/studentRoute.js";
import teacherRouter from "./routes/teacherRouter.js";
import postRouter from "./routes/postRouter.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
mongoDB();

app.use("/api/student",studentRouter);
app.use("/api/teacher",teacherRouter);
app.use("/api",postRouter);

app.get("/",(req,res)=>{
    res.send("API is working fine");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
