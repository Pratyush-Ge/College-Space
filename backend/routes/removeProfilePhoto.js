import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { usn } = req.body;

    const user = await User.findOne({ usn });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.profilePicUrl = 'default.avif'; 
    await user.save();

    res.json({ message: 'Profile photo removed successfully' });
  } catch (error) {
    console.error('Error removing profile photo:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
