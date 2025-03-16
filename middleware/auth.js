import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1]; // Bearer Token
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided by user" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default authMiddleware;
