import bcrypt from 'bcryptjs';
import { Student } from '../Models/Student.model.js';

const registerStudent = async (req, res) => {
  try {
    const { studentName, abcID, email, password } = req.body;

    // Check if the student already exists by abcID
    const existingStudent = await Student.findOne({ abcID });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this ABC ID already exists.' });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Step 1: Create a new student record
    const newStudent = new Student({
      studentName,
      abcID,
      email,
      password: hashedPassword,  // Store the hashed password
    });

    // Save the student to the database
    await newStudent.save();

    res.status(201).json({
      message: 'Student registered successfully.',
      student: newStudent,
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default registerStudent;
