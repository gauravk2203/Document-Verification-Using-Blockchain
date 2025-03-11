import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";

import documentRoute from './Routes/DocumentRoute.js';
import authRoute from './Routes/authRoute.js';
import vault from './Routes/vaultRoute.js';
import student from './Routes/studentRoute.js';


dotenv.config();
const app = express();
app.use(cookieParser())

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const connectToDatabase = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit the process if unable to connect
    }
  };

connectToDatabase();


app.use('/api/document', documentRoute);
app.use('/api/auth', authRoute);
app.use('/api/vault', vault);
app.use('/api/Institute', student);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });