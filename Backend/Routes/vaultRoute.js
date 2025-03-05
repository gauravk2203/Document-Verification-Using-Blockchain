import express from 'express';
import verifyToken from '../Middleware/verifyToken.js';
import { addToVault } from '../Controllers/MyvaultController.js';
import { getVaultDocuments } from '../Controllers/MyvaultController.js';



const router = express.Router();

router.post('/addtoVault', verifyToken , addToVault);

router.get('/Myvault', verifyToken , getVaultDocuments);


export default router;
