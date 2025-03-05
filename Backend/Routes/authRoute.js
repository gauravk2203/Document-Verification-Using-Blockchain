import express from 'express';
import validateStudent from '../Middleware/validateStudentMiddleware.js';
import  registerStudent  from '../Controllers/studentRegistrationController.js';
import validateInstitute from '../Middleware/validateInstituteMiddleware.js';
import  registerInstitute  from '../Controllers/InstituteController.js';
import { Login } from '../Controllers/LoginController.js';

const router = express.Router();

// Route for student registration
router.post('/studentRegister', validateStudent, registerStudent);

// Route for intitute registration
router.post('/instituteRegister', validateInstitute, registerInstitute);

router.post('/login', Login)

router.post("/logout", (req, res) => {
    res.clearCookie("jwt", { httpOnly: true, secure: true, sameSite: "Strict" });
    res.json({ message: "Logged out successfully" });
});

export default router;