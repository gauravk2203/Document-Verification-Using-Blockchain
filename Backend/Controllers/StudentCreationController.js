import { InstituteStudent } from '../Models/InstituteStudent.model.js';
import Institute from '../Models/Institute.model.js';
import { Student } from '../Models/Student.model.js';

export const createStudentByInstitute = async (req, res) => {
    try {
        const { studentName, abcID, course, batch, pid } = req.body;
        const { instituteId } = req.user;
        console.log("Request Body:", req.user);

        // Validate required fields
        if (!studentName || !abcID || !instituteId || !course || !batch || !pid) {
            return res.status(400).json({ message: "All fields are required" });
        }

        console.log("Received instituteId:", instituteId);

        // Check if the student already exists
        const student = await Student.findOne({ abcID });

        // Create a new InstituteStudent entry
        const newInstituteStudent = new InstituteStudent({
            studentName,
            abcID,
            instituteId,
            studentId: student ? student._id : null, // Set studentId if found, else null
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
