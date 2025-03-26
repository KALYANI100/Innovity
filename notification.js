import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import {createServer} from "http";
import {Server} from "socket.io";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
const server = createServer(app);
const io = new Server(server,{
    cors:{
        origin:"*",
    },
});

const notificationSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true},
    likeId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    message:
    {
        type:String,
        required:true
    },
    read:
    {
        type:Boolean,
        default:false
    },
    timestamp:{type:Date,default:Date.now}

},{timestamps:true});

const notification = mongoose.model("Notification",notificationSchema);

app.post("/like-post",async (req,res)=>{
    try{
        const{userId,postId,likeId}=req.body;
        if(!userId||!postId||!likeId){
            return res.status(400).json({error:"Missing an ID"});
        }
        const newNotification = new notification({
            userId,
            postId,
            likeId,
            message:`User ${likeId} liked your post`
        });
        await newNotification.save();
        io.to(userId).emit("notification",{
            message:`User ${likeId} liked your post`,postId
        })
        res.json({message:"post like and notifictaion sent"});
    }catch(error){
        console.error("Error fetching notifications",error);
        res.status(500).json({error:"Failed to fetch notification"});
    }


});
io.on("connection",(socket)=>{
    console.log("A user connected: ",socket.id);
    socket.on("register",(userId)=>{
        socket.join(userId);
        console.log(`User${userId} joined the room`);
        
    });
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
    
})

const PORT = 8080;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));