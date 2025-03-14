import { uploadDocument } from '../Services/documentToipfs.js';
import { Document } from '../Models/Document.model.js';
import { storeHashOnBlockchain } from '../Services/BlockchainService.js';

export const addDocument = async (req, res) => {
    const { documentName, abcID } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    if (!documentName || !abcID) {
        return res.status(400).json({ error: 'documentName and abcID are required' });
    }

    try {
        // Upload file to IPFS
        const ipfsHash = await uploadDocument(file.buffer, file.originalname);

        // Check if documentHash already exists in any document
        const existingDocument = await Document.findOne({ "documents.documentHash": ipfsHash });

        if (existingDocument) {
            return res.status(400).json({ error: 'This document already exists in the system.' });
        }

        // Store hash on blockchain
        try {
            await storeHashOnBlockchain(abcID, ipfsHash);
        } catch (blockchainError) {
            console.error('Blockchain error:', blockchainError.message);
            return res.status(500).json({ error: 'Failed to store hash on blockchain' });
        }

        // Update or insert the document entry in MongoDB
        await Document.findOneAndUpdate(
            { abcID },
            { $push: { documents: { documentName, documentHash: ipfsHash } } },
            { new: true, upsert: true }
        );

        res.json({ message: 'Document uploaded successfully', ipfsHash });
    } catch (error) {
        console.error('Error uploading document:', error.message);
        res.status(500).json({ error: `Error uploading document: ${error.message}` });
    }
};
