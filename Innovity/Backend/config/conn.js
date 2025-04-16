import mongoose from "mongoose";

export const mongoDB = async () => {
    await mongoose.connect('mongodb+srv://sahilamrutkar1808:p9y1oAUpO7FHB47z@cluster0.5yzub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Database connected successfully...."));
}