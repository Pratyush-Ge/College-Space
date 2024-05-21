import Message from '../models/Messages.js';
import User from '../models/User.js';

export const createMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Error saving message' });
    }
};

export const getMessages = async (req, res) => {
    const { senderId, receiverId } = req.params;

    try {
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ timestamp: 1 });

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving messages' });
    }
};

