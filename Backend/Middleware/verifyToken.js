import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "default_secret_key"; // Ensure it's not undefined

const verifyToken = (req, res, next) => {
    try {       
        const token = req.cookies?.jwt;
        // console.log("Received JWT Token:", token);  // Debugging token

        if (!token) return res.status(401).json({ error: "No token provided" });

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Failed:", err.message);
                return res.status(403).json({ error: "Invalid token" });
            }

            req.user = decoded; // Attach decoded user data to request
            // console.log("Decoded JWT:", decoded);  // Debugging decoded user
            next();
        });

    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export default verifyToken;
