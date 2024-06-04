import { Server } from 'socket.io';
import Message from '../models/Messages.js'; 

const socketConfig = (server) => {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    // console.log('A user connected');

    socket.on('join', ({ userId }) => {
      socket.join(userId);
      // console.log(`User with ID: ${userId} joined the room`); 
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
      const newMessage = new Message({ senderId, receiverId, message });
      await newMessage.save();
      io.to(receiverId).emit('receiveMessage', newMessage);
      io.to(senderId).emit('receiveMessage', newMessage);
    });

    socket.on('disconnect', () => {
      // console.log('User disconnected');
    });
  });
};

export default socketConfig;