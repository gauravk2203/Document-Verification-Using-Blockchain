import { InstituteStudent } from '../Models/InstituteStudent.model.js';

export const getStudentsByInstitute = async (req, res) => {
    try {
        const students = await InstituteStudent.find(); // Fetch all students from DB
        res.status(200).json(students); // Send students as JSON response
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch students" });
    }
};


export const getStudent = async (req, res) => {
    try {
        // console.log("Received request params:", req.params); // Debugging Log

        const { abcID } = req.params; // Extract abcID properly
        if (!abcID) {
            return res.status(400).json({ message: "abcID is required" });
        }

        const student = await InstituteStudent.findOne({ abcID }); // Query correctly
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Failed to fetch student" });
    }
};


