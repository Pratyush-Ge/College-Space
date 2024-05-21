import express from 'express';
import multer from 'multer';
import { createEvent, getEvents, deleteEvent } from '../controllers/EventController.js';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'event_images',
    allowed_formats: ['jpg', 'png', 'avif', 'jpeg'],
  },
});

const upload = multer({ storage });

router.post('/event', upload.single('image'), createEvent);
router.get('/events', getEvents);
router.delete('/event/:id', deleteEvent);

export default router;
