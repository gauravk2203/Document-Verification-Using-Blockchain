import { SelectedDocument } from '../Models/SelectedDocument.model.js';
// import { Document } from '../Models/Document.model.js';

export const getVaultDocuments = async (req, res) => {
    try {
        console.log("Full request query:", req.query); // Debugging

        const { abcID } = req.user; // Extract abcID from decoded token

        if (!abcID) {
            return res.status(400).json({ message: "abcID is missing in token" });
        }

        console.log("abcID received from token:", abcID);

        const vault = await SelectedDocument.findOne({ abcID: abcID.toString() });

        console.log("Vault found:", vault);

        if (!vault || !vault.documents || vault.documents.length === 0) {
            return res.status(404).json({ message: "No documents found in vault" });
        }

        return res.status(200).json({ documents: vault.documents });
    } catch (error) {
        console.error("Error fetching vault documents:", error);
        res.status(500).json({ message: "Error fetching vault documents", error });
    }
};



export const addToVault = async (req, res) => {
    try {
        const { document, abcID } = req.body; // Extract entire document and abcID from request body

        if (!document || !abcID) {
            return res.status(400).json({ message: "Document and abcID are required" });
        }

        console.log("Storing document for student:", abcID);

        // Find or create a SelectedDocument entry for the given abcID
        let selectedDoc = await SelectedDocument.findOne({ abcID });

        if (!selectedDoc) {
            // If no entry exists, create a new one
            selectedDoc = new SelectedDocument({
                abcID,
                documents: [document]  // Initialize with the provided document
            });
        } else {
            // Check if the document is already added
            const alreadyExists = selectedDoc.documents.some(doc => doc.documentHash === document.documentHash);
            
            if (alreadyExists) {
                return res.status(400).json({ message: "Document already exists in the vault" });
            }

            // Push the new document into the array
            selectedDoc.documents.push(document);
        }

        // Save the updated or newly created entry
        await selectedDoc.save();

        return res.status(200).json({ message: "Document added to vault" });

    } catch (error) {
        console.error("Error adding document to vault:", error);
        return res.status(500).json({ message: "Error adding document to vault", error });
    }
};
