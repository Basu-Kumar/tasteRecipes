import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
const app = express();
import userModel from "./models/user.model.js";
import recipeModel from "./models/recipe.model.js";
import userRouter from "./routes/user.route.js";
import recipesRouter from "./routes/recipe.route.js";
import path from "path";

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const _dirname = path.resolve();

app.use(express.static(path.join(_dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "/client/build/index.html"));
});

mongoose
  .connect(process.env.mongo_connection)
  .then(() => console.log("connection to database successfull"))
  .catch("database connection failed");

app.listen(8000, () => {
  console.log("server started");
});
