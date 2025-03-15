import mongoose from "mongoose"

const teacherSchema = new mongoose.Schema({
    name: {type:String ,required:true},
    email: {type:String ,required:true,unique:true},
    password: {type:String ,required:true},
    age: {type:Number ,required:true}

},{minimize:false})


const teacherModel = mongoose.models.teacher || mongoose.model("teacher",teacherSchema);

export default teacherModel;