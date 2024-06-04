import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import http from 'http';
import socketConfig from './config/Socket.js';

dotenv.config();

// Routes
import AuthRoute from './routes/AuthRoute.js';
import BookmarkRoute from './routes/BookmarkRoute.js';
import CommentRoute from './routes/CommentRoute.js';
import LikePostRoute from './routes/LikePostRoute.js';
import PostRoute from './routes/PostRoute.js';
import UserProfileRoute from './routes/UserProfileRoute.js';
import MessageRoute from './routes/MessageRoute.js';
import NotesRoute from './routes/NotesRoute.js';
import EventRoute from './routes/EventRoute.js';

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'https://uni-verse-college.vercel.app'], 
  credentials: true,
}));

app.use(express.json());

const mongoURL = process.env.MONGODB_URI;
mongoose.connect(mongoURL);

app.use('/auth', AuthRoute);
app.use('/bookmark', BookmarkRoute);
app.use('/comment', CommentRoute);
app.use('/likePost', LikePostRoute);
app.use('/post', PostRoute);
app.use('/user', UserProfileRoute);
app.use('/messages', MessageRoute);
app.use('/notes', NotesRoute);
app.use('/events', EventRoute);

const server = http.createServer(app);
socketConfig(server);

server.listen(7071, () => {
  console.log("Server is running on port 7071");
});
