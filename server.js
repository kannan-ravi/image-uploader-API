import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/dbConnection.js';
import corsOptions from './config/corsOptions.js';
import MulterError from "./controller/mutlerError.js";
import router from "./router/upload.js";
const app = express();


const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/upload', router);

app.use(MulterError);

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Your server is running on ${PORT}`))
});

