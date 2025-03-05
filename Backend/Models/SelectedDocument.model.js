import mongoose from "mongoose";

const selectedDocumentsSchema = new mongoose.Schema({
   abcID: {
       type: String,
       required: true,
   },
   documents: [{ 
       documentName: { type: String, required: true }, 
       documentHash: { type: String, required: true, unique: true },
       createdAt: { type: Date, default: Date.now }
   }]
}, { timestamps: true });

export const SelectedDocument = mongoose.model("SelectedDocument", selectedDocumentsSchema);
