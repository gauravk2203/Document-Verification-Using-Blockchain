import bcrypt from 'bcryptjs';
import Institute from  '../Models/Institute.model.js';

const registerInstitute = async (req, res) => {
  try {
    const { instituteName, instituteCode, universityName, location, pincode, password, email } = req.body;

    // Validate required fields
    if (!instituteName || !instituteCode || !universityName || !location || !pincode || !password || !email) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if the institute code already exists
    const existingInstitute = await Institute.findOne({ instituteCode });
    if (existingInstitute) {
      return res.status(400).json({ message: 'Institute code already exists.' });
    }

    // Check if the email is already registered
    const existingEmail = await Institute.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save a new institute
    const newInstitute = new Institute({
      instituteName,
      instituteCode,
      universityName,
      location,
      pincode,
      email,
      password: hashedPassword, // Store hashed password
    });

    await newInstitute.save();

    res.status(201).json({
      message: 'Institute registered successfully.',
      institute: {
        _id: newInstitute._id,
        instituteName: newInstitute.instituteName,
        instituteCode: newInstitute.instituteCode,
        universityName: newInstitute.universityName,
        location: newInstitute.location,
        pincode: newInstitute.pincode,
        email: newInstitute.email,
      },
    });
  } catch (error) {
    console.error('Error registering institute:', error);
    res.status(500).json({ message: 'Internal server error.', error: error.message });
  }
};

export default registerInstitute;
