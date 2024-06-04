import { Server } from 'socket.io';
import Message from '../models/Messages.js'; 

const socketConfig = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'https://uni-verse-college.vercel.app'], 
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('join', ({ userId, receiverId }) => {
      const roomId = [userId, receiverId].sort().join('_');
      socket.join(roomId);
      // console.log(`User with ID: ${userId} joined room: ${roomId}`); 
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
      const newMessage = new Message({ senderId, receiverId, message });
      await newMessage.save();
      const roomId = [senderId, receiverId].sort().join('_');
      io.to(roomId).emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
      // console.log('User disconnected');
    });
  });
};

export default socketConfig;
