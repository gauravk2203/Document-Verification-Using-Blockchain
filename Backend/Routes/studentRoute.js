import express from 'express';
import {createStudentByInstitute} from '../Controllers/StudentCreationController.js';
import { getStudentsByInstitute } from '../Controllers/getStudentsController.js';
import { getStudent } from '../Controllers/getStudentsController.js';
import verifyToken from '../Middleware/verifyToken.js';

const router = express.Router();


router.post("/createStudent" , verifyToken , createStudentByInstitute);

router.get("/getStudents" , getStudentsByInstitute);

router.get("/getStudent/:abcID" , getStudent);


export default router;