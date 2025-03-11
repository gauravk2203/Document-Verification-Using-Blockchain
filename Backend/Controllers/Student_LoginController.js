import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Student } from '../Models/Student.model.js';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY; // Ensure this is set in your .env file

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Student.findOne({ email });
        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate a JWT token with abcID
        const token = jwt.sign(
            { 
                studentId: user._id,
                abcID: user.abcID, 
                email: user.email
             }, // Payload
            SECRET_KEY, 
            { expiresIn: "7d" } // Expiration time
        );

        // Store JWT in an HTTP-only cookie
         res.cookie("jwt", token, {
            httpOnly: true,  // Prevents JavaScript access (XSS protection)
            secure: false, // Use true only in production (HTTPS required)
            sameSite: "Lax", // Prevents CSRF
            maxAge: 24 * 60 * 60 * 1000,  // 1 day expiration (milliseconds)
        });


        res.status(200).json({ message: "Login successful" , token});

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
