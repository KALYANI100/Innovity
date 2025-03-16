import teacherModel from "../models/teacherModel.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import studentModel from "../models/studentModel.js"


const loginTeacher = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const teacher = await teacherModel.findOne({email});
        if(!teacher)
        {
            return res.json({success:false,message:"teacher doesn't exist"});
        }

        const isMatch = await bcrypt.compare(password,teacher.password);
        if(!isMatch)
        {
            return res.json({success:false,message:"Invalid Credentials"})
        }

        const token = createToken(teacher._id);
        res.json({success:true,token});
    }
    catch (error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerTeacher = async (req,res)=>{
    const {username,name,password,email,age} = req.body;

    try {
        const TeacherExists = await teacherModel.findOne({email});
        const StudentExists = await studentModel.findOne({email});
        if(TeacherExists || StudentExists){
            return res.json({success:false,message:"user already exist"})
        }
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please enter valid email"})
        }

        if(password.length < 8)
        {
            return res.json({success:false,message:"Please enter strong password"})
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const profilePicture = `https://ui-avatars.com/api/?name=${name}&size=200`;

        const newTeacher = new teacherModel({
            username:username,
            name:name,
            email:email,
            password:hashedPassword,
            age:age,
            profile_pic:profilePicture
        })

        //now we need to save this user details in our database
        const teacher = await newTeacher.save();
        const token = createToken(teacher._id);
        res.json({success:true,token,teacher});
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error in Controller"});
    }
}

export {loginTeacher,registerTeacher};