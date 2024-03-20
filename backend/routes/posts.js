import express from 'express';
import Post from '../models/Posts.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { content, author } = req.body;

  try {
    const post = new Post({
      content,
      author,
    });
    await post.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

export default router;
