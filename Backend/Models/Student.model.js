import mongoose from 'mongoose';
import { Document } from './Document.model.js';

const studentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
    },
    abcID: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    document: 
      {
        type: mongoose.Schema.ObjectId,
        ref: "Document",
      },
  },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
