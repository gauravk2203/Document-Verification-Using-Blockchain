import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
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

export const Document = mongoose.model("Document", documentSchema);
