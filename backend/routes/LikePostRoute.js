import express from 'express';
import { LikeRoute, UnlikeRoute, getRoute } from '../controllers/LikePostController.js';

const router = express.Router()


router.post('', LikeRoute)
router.delete('/toggle', UnlikeRoute)
router.get('/:postId', getRoute)

export default router