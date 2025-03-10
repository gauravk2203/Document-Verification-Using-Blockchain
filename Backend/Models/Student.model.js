import mongoose from 'mongoose';


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
        ref: "SelectedDocument",
      },
  },
  { timestamps: true }
);

export const Student = mongoose.model('Student', studentSchema);
