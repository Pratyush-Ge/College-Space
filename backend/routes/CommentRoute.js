import express from 'express';
import { postRoute, deleteRoute, getRoute } from '../controllers/CommentController.js';

const router = express.Router()


router.post('/post', postRoute)
router.get('/get/:postId', getRoute)
router.delete('/delete/:commentId', deleteRoute)

export default router