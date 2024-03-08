import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, usn, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = new User({
      username,
      usn,
      email,
      password: hashedPassword, 
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
});

export default router;
