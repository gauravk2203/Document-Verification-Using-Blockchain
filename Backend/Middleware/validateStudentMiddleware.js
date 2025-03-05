const validateStudent = (req, res, next) => {
  const { studentName, abcID, email, password } = req.body;

  // Check for required fields
  if (!studentName || !abcID || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  next(); // Proceed to the controller
};

export default validateStudent;
