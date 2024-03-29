import express from 'express';
import Post from '../models/Post.js'; 

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, content, image, email } = req.body;
    const newPost = new Post({
      title,
      content,
      image,
      author: email,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
