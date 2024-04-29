import express from 'express';
import multer from 'multer';
import { uploadProfilePic, deleteProfilePic } from '../controllers/UserProfileController.js';

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

router.post('/uploadProfilePic', upload.single('file'), uploadProfilePic);
router.delete('/deleteProfilePic', deleteProfilePic);

export default router;
