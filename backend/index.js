// index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";
import postsRoute from "./routes/posts.js";
import getPostsRoute from "./routes/getposts.js";
import deletePostRoute from "./routes/deletepost.js";
import uploadProfilePicRoute from "./routes/uploadProfilePic.js";
import getUserDetailsRoute from "./routes/getUserDetails.js";
import removeProfilePhotoRoute from "./routes/removeProfilePhoto.js";
import getCommentsRoute from "./routes/getComment.js";
import postCommentRoute from "./routes/postComment.js"; // Add this line

const app = express();
app.use(cors());
app.use(express.json());

const mongoURL = `mongodb+srv://pratyushghatole2003:MdStUp0SWOXu6CPa@cluster0.sq5kjcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoURL);

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/posts", postsRoute);
app.use("/getposts", getPostsRoute);
app.use("/deletepost", deletePostRoute);
app.use("/uploadProfilePic", uploadProfilePicRoute);
app.use("/getUserDetails", getUserDetailsRoute);
app.use("/removeProfilePhoto", removeProfilePhotoRoute);
app.use("/getComments", getCommentsRoute);
app.use("/postComment", postCommentRoute); // Add this line

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
