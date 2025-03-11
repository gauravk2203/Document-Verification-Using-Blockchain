import express from 'express';
import multer from 'multer';
import { addDocument } from '../Controllers/DocumentController.js';
import { verify } from '../Controllers/VerifierController.js';
import { GetHash } from "../Controllers/HashController.js";
import { fetchHash } from '../Controllers/HashController.js';
import { getDocuments } from '../Controllers/HashController.js';
import verifyToken from '../Middleware/verifyToken.js';
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });


const router = express.Router();

router.post('/upload', upload.single('file'), addDocument)

router.post('/hash', GetHash);

router.post('/verify', upload.single('file'), verify);

router.post('/fetch' , upload.single('file'), verifyToken,  fetchHash);

router.get('/hashes/:abcID', getDocuments);

export default router;
