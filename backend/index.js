import express from "express";
import cors from "cors";
import mongoose from "mongoose";

//Routes
import AuthRoute from './routes/AuthRoute.js'
import BookmarkRoute from './routes/BookmarkRoute.js'
import CommentRoute from './routes/CommentRoute.js'
import LikePostRoute from './routes/LikePostRoute.js'
import PostRoute from './routes/PostRoute.js'
import UserProfileRoute from './routes/UserProfileRoute.js'


const app = express();
app.use(cors());
app.use(express.json());

const mongoURL = `mongodb+srv://pratyushghatole2003:puAMH4SUrBVNdFjX@cluster0.sq5kjcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoURL);

app.use('/auth', AuthRoute);
app.use('/bookmark', BookmarkRoute);
app.use('/comment', CommentRoute);
app.use('/likePost', LikePostRoute);
app.use('/post', PostRoute);
app.use('/user', UserProfileRoute);





app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
