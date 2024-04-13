import express from 'express';
import Comment from '../models/Comment.js';
import {jwtDecode} from 'jwt-decode'; 
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { email, username, profilePicUrl } = jwtDecode(token);
    const { postId, content } = req.body;

    const comment = new Comment({
      commentId: new mongoose.Types.ObjectId(),
      postId,
      content,
      author: email,
      username,
      profilePicUrl, 
    });

    await comment.save();

    res.status(201).json({ message: 'Comment posted successfully' });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'Failed to post comment' });
  }
});

export default router;
