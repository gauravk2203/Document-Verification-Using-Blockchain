import { ContractInteraction } from '../Services/BlockchainUtility.js';
import { generateIPFSHash } from '../Services/generateHash.js';

const contract = ContractInteraction();


export const verify = async (req ,res) => {

    const { studentUniqueId } = req.body;
    const fileBuffer = req.file?.buffer; // Access file buffer from memory
    console.log(fileBuffer);
    if (!studentUniqueId || !fileBuffer) {
        return res.status(400).json({ error: 'Student Unique ID and file are required.' });
    }

    try {
        // Generate the hash from the buffer
        const documentHash = await generateIPFSHash(fileBuffer);
        console.log("Generated Document Hash:", documentHash);

        // Call the controller function to verify the document
        const isValid = await contract.verifyDocument(studentUniqueId, documentHash);

        if (isValid) {
            return res.status(200).json({ 
                message: 'Document is authentic.', 
                documentHash
            });
        } else {
            return res.status(200).json({ 
                message: 'Document is not authentic.',
                documentHash
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while verifying the document.' });
    }

}