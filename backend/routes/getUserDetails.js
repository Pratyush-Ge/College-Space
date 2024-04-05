import express from 'express';
import User from '../models/User.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const email = req.headers.authorization.split(' ')[1];
    const user = await User.findOne({ email }).select('profilePicUrl username email usn'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ profilePicUrl: user.profilePicUrl ,username: user.username, usn: user.usn});
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
