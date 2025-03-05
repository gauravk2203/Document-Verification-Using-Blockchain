const validateInstitute = (req, res, next) => {
  const { instituteName, instituteCode, universityName, location, pincode } = req.body;

  // Check for required fields
  if (!instituteName || !instituteCode || !universityName || !location || !pincode) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate the pincode (optional validation rule for demonstration)
  if (!/^\d{6}$/.test(pincode)) {
    return res.status(400).json({ message: 'Invalid pincode format. Must be 6 digits.' });
  }

  next(); // Proceed to the controller
};

export default validateInstitute;
