import express from 'express';
import multer from 'multer';
import path from 'path';
import { postRoute, getRoute, deleteRoute} from '../controllers/PostController.js';

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

router.post('', upload.single('image'), postRoute);
router.get('/getposts', getRoute);
router.delete('/deletepost/:id', deleteRoute);

export default router;
