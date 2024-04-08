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

const app = express();
app.use(cors());
app.use(express.json());

const mongoURL = `mongodb+srv://pratyushghatole2003:s6A6QH5LY8OMvrmD@cluster0.sq5kjcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoURL);

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/posts", postsRoute);
app.use("/getposts", getPostsRoute);
app.use("/deletepost", deletePostRoute);
app.use("/uploadProfilePic", uploadProfilePicRoute);
app.use("/getUserDetails", getUserDetailsRoute);
app.use("/removeProfilePhoto", removeProfilePhotoRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
