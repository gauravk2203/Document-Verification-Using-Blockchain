import { InstituteStudent } from '../Models/InstituteStudent.model.js';
import Institute from '../Models/Institute.model.js';
import { Student } from '../Models/Student.model.js';

export const createStudentByInstitute = async (req, res) => {
    try {
        const { studentName, email, abcID, instituteId , course , batch , pid } = req.body; // Removed studentId from request body
        console.log("Request Body:", req.body);

        // Validate required fields
        if (!studentName || !email || !abcID || !instituteId || !course || !batch || !pid) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if the student already exists using abcID
        const student = await Student.findOne({ abcID });
        if (!student) {
            return res.status(404).json({ message: "Student not found with the provided abcID" });
        }

        console.log("Received instituteId:", instituteId);

        // Create new InstituteStudent entry
        const newInstituteStudent = new InstituteStudent({
            studentName,
            email,
            abcID,
            instituteId: instituteId,
            studentId: student._id, // Use the found student's ID
            course,
            batch,
            pid
        });

        // Save the student to the database
        const savedStudent = await newInstituteStudent.save();

        // Update the Institute to track the created student
        await Institute.findByIdAndUpdate(instituteId, { $push: { createdStudents: savedStudent._id } });

        res.status(201).json({
            message: "Student created successfully",
            student: savedStudent
        });

    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
