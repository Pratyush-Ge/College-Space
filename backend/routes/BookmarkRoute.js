import express from 'express';
import { addRoute, removeRoute, checkRoute, getRoute } from '../controllers/BookmarkController.js';

const router = express.Router()


router.post('/add', addRoute)
router.delete('/remove/:postId/:userEmail', removeRoute)
router.get('/check/:postId', checkRoute)
router.get('/:userEmail', getRoute)

export default router