import { ContractInteraction } from "../Services/BlockchainUtility.js";
import { Document } from "../Models/Document.model.js";
import { generateIPFSHash } from "../Services/generateHash.js";

const contract = ContractInteraction();

export const GetHash = async (req , res) => {
    console.log("Authenticated User:", req.user);
    const { studentUniqueId } = req.body;
    
    console.log('This is the studentID', studentUniqueId);
       
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
    const { abcID } = req.user;
    
    // console.log("🔹 Received Headers:", req.headers);
    // console.log("🔹 Received Cookies:", req.cookies);
    // console.log("🔹 Received Body:", req.body);
    // console.log("🔹 Received File:", req.file);
    // console.log("🛠 Received abcID:", abcID);
    // console.log("🛠 Received file:", req.file);

    if (!abcID || !req.file) {
        return res.status(400).json({ error: 'Student Unique ID and file are required.' });
    }

    const fileBuffer = req.file.buffer; // Access file buffer from memory

    try {
        // ✅ Generate document hash from the uploaded file
        const documentHash = await generateIPFSHash(fileBuffer);

        // ✅ Fetch documents for the given student
        const document = await Document.findOne({ abcID }, { "documents": 1 });

        if (!document || !document.documents || document.documents.length === 0) {
            return res.status(404).json({ error: 'No documents found for this student.' });
        }

        // ✅ Find the document with the matching hash
        const matchingDocument = document.documents.find(doc => doc.documentHash === documentHash);
        // console.log("📜 Matching Document:", matchingDocument);

        if (matchingDocument) {
            return res.json({ document: matchingDocument });
        } else {
            return res.status(404).json({ error: 'No matching document found.' });
        }

    } catch (error) {
        console.error("❌ Error in fetchHash:", error);
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
