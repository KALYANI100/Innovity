import studentModel from "../models/studentModel.js";
    import jwt from "jsonwebtoken";
    import bcrypt from "bcrypt";
    import validator from "validator";

    // Function to create JWT token
    const createToken = (id) => {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    };


    const loginStudent = async (req, res) => {
        const { email, password } = req.body;
        try {
            // Check if student exists
            const student = await studentModel.findOne({ email });
            if (!student) {
                return res.status(404).json({ success: false, message: "Student doesn't exist" });
            }

            // Validate password
            const isMatch = await bcrypt.compare(password, student.password);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid Credentials" });
            }
            // Generate token
            const token = createToken(student._id);
            res.status(200).json({token, student});

        } catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    };


    const registerStudent = async (req, res) => {
        const { username, name, email, password, age, school_id, city, state, stdclass } = req.body;

        try {
            // Check if student already exists
            const exists = await studentModel.findOne({ email });
            if (exists) {
                return res.status(400).json({ success: false, message: "Student already exists" });
            }

            // Validate email and password
            if (!validator.isEmail(email)) {
                return res.status(400).json({ success: false, message: "Invalid email format" });
            }
            if (password.length < 8) {
                return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const profilePicture=`https://api.dicebear.com/8.x/bottts/svg?seed=${username}`
            // Create new student
            const newStudent = new studentModel({
                username,
                name,
                email,
                password: hashedPassword,
                age,
                school_id,
                city,
                state,
                stdclass,
                profile_pic: profilePicture, 
                badges: [], // Empty badges array
                curr_streak: 0,
                longest_streak: 0,
                points: 0
            });

            // Save student to database
            const student = await newStudent.save();
            const token = createToken(student._id);
            res.status(201).json({token, student });

        } catch (error) {
            console.error("Registration error:", error);
            res.status(500).json({ success: false, message: "Server Error In Student Controller" });
        }
    };
    const getAllStudents = async (req, res) => {
        try {
            const students = await studentModel.find();
            res.json({students });
        } catch (error) {
            console.error("🚨 Error fetching students:", error);
            res.status(500).json({ success: false, message: "Error fetching students" });
        }
    };
    const getSingleUser = async (req, res) => {
        const { userId } = req.params;  
        try {
            const student = await studentModel.findById(userId);  // Use singular naming for clarity
            if (!student) {
                return res.status(404).json({ success: false, message: "Student not found" });
            }
            res.json(student);
        } catch (error) {
            console.error("🚨 Error fetching student:", error);
            res.status(500).json({ success: false, message: "Error fetching student" });
        }
    };

    export { loginStudent, registerStudent ,getAllStudents,getSingleUser};