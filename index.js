// external imports
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// internal imports
import connectionToDb from './config/dbConnection.js';
import userHandler from './handler/userHandler.js';

// environment setup || database connection function
dotenv.config();
connectionToDb();

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));

app.use(express.static('./public/Uploads/'));
app.use('/Uploads', express.static('Uploads'));

app.use(express.urlencoded({ extended: true }));

app.use('/user', userHandler);

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next();
  }
  res.status(500).json({ error: 'There was a server side error!' });
});

// listening server

app.listen(process.env.PORT, process.env.HOST_NAME, () => {
  console.log(
    `Your server is running successfully at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});
