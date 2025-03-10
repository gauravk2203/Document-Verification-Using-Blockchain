import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import  Institute from '../Models/Institute.model.js';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY; // Ensure this is set in your .env file

export const LOGIN = async (req, res) => {
    const { instituteCode, email, password } = req.body;

    try {
        // Find user by email or instituteCode (whichever is provided)
        const user = await Institute.findOne({ 
            $or: [{ email }, { instituteCode }] 
        });

        if (!user) return res.status(400).json({ error: "Invalid credentials" });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate a JWT token with InstituteId & abcID
        const InstitueToken = jwt.sign(
            { 
                instituteId: user._id,
                abcID: user.abcID, 
                email: user.email
            }, 
            SECRET_KEY, 
            { expiresIn: "1h" }
        );

        // Store JWT in an HTTP-only cookie
        res.cookie("jwt", InstitueToken, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production", 
            sameSite: "Strict", 
            maxAge: 3600000  
        });

        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
