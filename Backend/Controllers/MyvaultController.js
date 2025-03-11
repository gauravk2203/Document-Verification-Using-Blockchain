import { SelectedDocument } from '../Models/SelectedDocument.model.js';
// import { Document } from '../Models/Document.model.js';

export const getVaultDocuments = async (req, res) => {
    try {
        // console.log("Full request query:", req.query); // Debugging

        const { abcID } = req.user; // Extract abcID from decoded token

        if (!abcID) {
            return res.status(400).json({ message: "abcID is missing in token" });
        }

        // console.log("abcID received from token:", abcID);

        const vault = await SelectedDocument.findOne({ abcID: abcID.toString() });

        // console.log("Vault found:", vault);

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
        // console.log("Received request body:", req.body);

        const receivedDocument = req.body.document; 
        if (!receivedDocument) {
            return res.status(400).json({ message: "Document is missing in the request body" });
        }

        const { documentName, documentHash } = receivedDocument;
        const { abcID } = req.user;

        if (!documentName || !documentHash || !abcID) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        console.log(`Storing document for student: ${abcID}, Document Name: ${documentName}, Hash: ${documentHash}`);

        // Find or create SelectedDocument entry
        let selectedDoc = await SelectedDocument.findOne({ abcID });

        if (!selectedDoc) {
            selectedDoc = new SelectedDocument({ 
                abcID, 
                documents: [{ documentName, documentHash }] 
            });
        } else {
            const alreadyExists = selectedDoc.documents.some(doc => doc.documentHash === documentHash);
            if (alreadyExists) {
                return res.status(400).json({ message: "Document already exists in the vault" });
            }
            selectedDoc.documents.push({ documentName, documentHash });
        }

        await selectedDoc.save();
        return res.status(201).json({ success: true, message: "Document added to vault", document: receivedDocument });

    } catch (error) {
        console.error("Error adding document to vault:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
