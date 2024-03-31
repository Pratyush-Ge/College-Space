import express from 'express';
import multer from 'multer';
import path from 'path';
import Post from '../models/Post.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, email, username } = req.body;
    const image = req.file ? req.file.filename : null; 

    const newPost = new Post({
      title,
      content,
      image,
      author: email,
      username,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
