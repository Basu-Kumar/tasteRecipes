import express from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (username === "" || !username || password === "" || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const checkUser = await userModel.findOne({ username });

  if (checkUser) {
    return res.status(400).json({ message: "user already exist" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "password length must be 6 at least" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    username,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    return res.status(200).json({ message: "user registration successfull" });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "" || !username || password === "" || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const validUser = await userModel.findOne({ username });

  if (!validUser) {
    return res.status(400).json({ message: "user doesn't exist" });
  }

  const validPassword = await bcrypt.compare(password, validUser.password);
  if (!validPassword) {
    return res.status(400).json({ message: "wrong password" });
  }

  const token = jwt.sign(
    {
      id: validUser._id,
    },
    process.env.JWT_SECRET
  );

  try {
    return res.status(200).json({
      message: "login successfull",
      access_token: token,
      userId: validUser._id,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

export default router;

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, "unplaced", (err) => {
      if (err) return res.sendStatus(403);
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
