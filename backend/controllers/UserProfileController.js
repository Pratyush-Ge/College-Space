import User from '../models/User.js';

export const uploadProfilePic = async (req, res) => {
  try {
    const { usn } = req.body; 
    const user = await User.findOneAndUpdate({ usn }, { profilePicUrl: req.file.filename }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ profilePicUrl: req.file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload profile picture' });
  }
};

export const deleteProfilePic = async (req, res) => {
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
  };



