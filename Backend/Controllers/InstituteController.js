import Institute from '../Models/Intitute.model.js'

const registerInstitute = async (req, res) => {
  try {
    const { instituteName, instituteCode, universityName, location, pincode } = req.body;

    // Check if the institute code already exists
    const existingInstitute = await Institute.findOne({ instituteCode });
    if (existingInstitute) {
      return res.status(400).json({ message: 'Institute code already exists.' });
    }

    // Create and save a new institute
    const newInstitute = new Institute({
      instituteName,
      instituteCode,
      universityName,
      location,
      pincode,
    });

    await newInstitute.save();

    res.status(201).json({
      message: 'Institute registered successfully.',
      institute: newInstitute,
    });
  } catch (error) {
    console.error('Error registering institute:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export default registerInstitute;
