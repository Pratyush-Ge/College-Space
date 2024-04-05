import express from 'express';
import multer from 'multer';
import User from "../models/User.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'profilePic/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async (req, res) => {
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
});

export default router;
