import express from 'express';
import { getMessages } from '../controllers/MessageController.js';


const router = express.Router();
router.get('/getMessages/:senderId/:receiverId', getMessages);

export default router