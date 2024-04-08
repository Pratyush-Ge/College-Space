import express from 'express';
import Comment from '../models/Comment.js';
import {jwtDecode} from 'jwt-decode';

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email, username, profilePicUrl } = jwtDecode(req.headers.authorization.split(' ')[1]);
    const { postId, content } = req.body;

    const comment = new Comment({
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
