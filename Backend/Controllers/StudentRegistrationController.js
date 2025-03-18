import bcrypt from 'bcryptjs';
import { Student } from '../Models/Student.model.js';
import { InstituteStudent } from '../Models/InstituteStudent.model.js';

const registerStudent = async (req, res) => {
  try {
    const { studentName, abcID, email, password } = req.body;

    // Check if the student already exists by abcID or email
    const existingStudent = await Student.findOne({ $or: [{ abcID }, { email }] });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with this ABC ID or Email already exists.' });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Step 1: Create a new student record
    const newStudent = new Student({
      studentName,
      abcID,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the student to the database
    await newStudent.save();

    // Step 2: Link Student to InstituteStudent if an entry exists
    const instituteStudent = await InstituteStudent.findOne({ abcID });
    if (instituteStudent) {
      instituteStudent.studentId = newStudent._id;
      await instituteStudent.save();
    }

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
