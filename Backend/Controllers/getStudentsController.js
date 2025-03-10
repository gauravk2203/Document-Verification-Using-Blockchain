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
    try{
        const student = await InstituteStudent.findOne(req.abcID);
        res.status(200).json(student);
    }catch(error){
        res.status(500).json({ message: "Failed to fetch student" });
    }
};


