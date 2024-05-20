import User from '../models/User.js';
import cloudinary from '../config/cloudinary.js';
import { extractPublicId } from 'cloudinary-build-url'


export const uploadProfilePic = async (req, res) => {
  try {
    const { usn } = req.body;
    const profilePicUrl = req.file.path?req.file.path:null;

    const user = await User.findOneAndUpdate(
      { usn },
      { profilePicUrl },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ profilePicUrl: user.profilePicUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProfilePic = async (req, res) => {
  try {
    const { usn } = req.body;

    const user = await User.findOne({ usn });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.profilePicUrl) {
      const publicId = extractPublicId(user.profilePicUrl);
      // console.log(publicId)
      await cloudinary.uploader.destroy(publicId);
    }

    user.profilePicUrl = null;
    await user.save();

    res.status(200).json({ message: 'Profile picture deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

