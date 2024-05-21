import express from 'express';
import { createMessage, getMessages } from '../controllers/MessageController.js';


const router = express.Router();
router.post('/sendMessage', createMessage);
router.get('/getMessages/:senderId/:receiverId', getMessages);

export default router