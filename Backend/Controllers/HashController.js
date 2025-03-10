import { ContractInteraction } from "../Services/BlockchainUtility.js";
import { Document } from "../Models/Document.model.js";
import { generateIPFSHash } from "../Services/generateHash.js";

const contract = ContractInteraction();

export const GetHash = async (req , res) => {
    const { studentUniqueId } = req.body;
       
       
       if (!studentUniqueId) {
           return res.status(400).json({ error: "Student Unique ID is required." });
       }
   
       try {
           const documentHashes = await contract.getDocumentHashes(studentUniqueId);
           console.log("📜 Retrieved Document Hashes:", documentHashes);
   
           if (!documentHashes || documentHashes.length === 0) {
               return res.status(404).json({ message: "No document hashes found for this student ID." 
               });
           }
   
           return res.status(200).json({ documentHashes });
       } catch (err) {
           console.error("❌ Error:", err);
           return res.status(500).json({ error: "An error occurred while retrieving the document hashes." });
       }
   };

   export const fetchHash = async (req, res) => {
    const { abcID } = req.body;
    const fileBuffer = req.file?.buffer; // Access file buffer from memory

    if (!abcID || !fileBuffer) {
        return res.status(400).json({ error: 'Student Unique ID and file are required.' });
    }

    try {
        // ✅ Generate document hash from the uploaded file
        const documentHash = await generateIPFSHash(fileBuffer);

        // ✅ Fetch the documents for the given student
        const document = await Document.findOne(
            { abcID },
            { "documents": 1 } // Retrieve all document details
        );

        if (!document || !document.documents || document.documents.length === 0) {
            return res.status(404).json({ error: 'No documents found for this student.' });
        }

        // ✅ Find the document with the matching hash
        const matchingDocument = document.documents.find(doc => doc.documentHash === documentHash);

        if (matchingDocument) {
            return res.json({ document: matchingDocument });
        } else {
            return res.status(404).json({ error: 'No matching document found.' });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the document.' });
    }
};


export const getDocuments = async (req, res) => {
    const { abcID } = req.params;
    console.log("🔍 Fetching documents for student:", abcID);

    try {
        const document = await Document.findOne({ abcID }); // Ensure 'abcID' exists in your schema
        if (!document) {
            return res.status(404).json({ message: "No documents found for this student" });
        }
        res.status(200).json(document);
    } catch (error) {
        console.error("❌ Error fetching documents:", error);
        res.status(500).json({ message: "Failed to fetch documents", error: error.message });
    }
};
