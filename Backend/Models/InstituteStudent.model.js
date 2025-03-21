import mongoose from 'mongoose';

const instituteStudentSchema = new mongoose.Schema(
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
    course: {
      type: String,
      required: true,
    },
    batch:{
      type: String,
      required: true,
    },
    pid:{
      type: String,
      required: true,
    },
    studentId: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
    },
    instituteId: {
      type: mongoose.Schema.ObjectId,
      ref: "Institute",
      required: true,
    }
  },
  { timestamps: true }
);

export const InstituteStudent = mongoose.model('InstituteStudent', instituteStudentSchema);
