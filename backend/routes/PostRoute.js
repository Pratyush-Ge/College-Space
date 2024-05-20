import express from 'express';
import multer from 'multer';
import { postRoute, getRoute, deleteRoute } from '../controllers/PostController.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'post_images',
    allowed_formats: ['jpg', 'png', 'avif', 'jpeg'],
  },
});

const upload = multer({ storage });

router.post('', upload.single('image'), postRoute);
router.get('/getposts', getRoute);
router.delete('/deletepost/:id', deleteRoute);

export default router;
