import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.mongo_connection)
  .then(() => console.log("connection to database successfull"))
  .catch("database connection failed");

app.listen(8000, () => {
  console.log("server started");
});
