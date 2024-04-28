import express from 'express';
import Like from '../models/Like.js';
import Post from '../models/Post.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { postId, userEmail } = req.body;

    const existingLike = await Like.findOne({ postId, userEmail });
    if (existingLike) {
      return res.status(400).json({ message: 'Like already exists' });
    }

    const like = new Like({ postId, userEmail });
    await like.save();

    // Update the like count in the Post model
    await Post.findByIdAndUpdate(postId, { $inc: { likes: 1 } });

    res.status(201).json({ message: 'Like added successfully' });
  } catch (error) {
    console.error('Error adding like:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/toggle', async (req, res) => {
  try {
    const { postId, userEmail } = req.body;

    const existingLike = await Like.findOne({ postId, userEmail });
    if (!existingLike) {
      return res.status(400).json({ message: 'Like does not exist' });
    }

    await existingLike.deleteOne();

    // Update the like count in the Post model
    await Post.findByIdAndUpdate(postId, { $inc: { likes: -1 } });

    res.status(200).json({ message: 'Like removed successfully' });
  } catch (error) {
    console.error('Error removing like:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ postId });

    res.status(200).json(likes);
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
