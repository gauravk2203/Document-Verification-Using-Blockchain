import mongoose from 'mongoose';

const instituteSchema = new mongoose.Schema(
  {
    instituteName: {
      type: String,
      required: true,
    },
    instituteCode: {
      type: Number,
      required: true,
      unique: true,
    },
    universityName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required : true ,
    },
    email: {
      type: String,
      required : true ,
    },
    createdStudents: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'InstituteStudent'
     }]
  },
  { timestamps: true }
);

// Create an index on the instituteCode field
// instituteSchema.index({ instituteCode: 1 });

export default mongoose.model('Institute', instituteSchema);
