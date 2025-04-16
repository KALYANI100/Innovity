    import mongoose from "mongoose"

    const teacherSchema = new mongoose.Schema({
        username: { type: String, required: true },
        name: {type:String ,required:true},
        email: {type:String ,required:true,unique:true},
        password: {type:String ,required:true},
        age: {type:Number ,required:true},
        profile_pic: { type: String }
    },{minimize:false})


    const teacherModel = mongoose.models.teacher || mongoose.model("teacher",teacherSchema);

    export default teacherModel;