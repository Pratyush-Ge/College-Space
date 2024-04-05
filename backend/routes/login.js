import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { usn, password } = req.body;

  try {
    const user = await User.findOne({ usn });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const tokenPayload = { usn: user.usn, email: user.email, username: user.username, profilePicUrl: user.profilePicUrl };

    const token = jwt.sign(tokenPayload, "your-secret-key", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to login" });
  }
});

export default router;
