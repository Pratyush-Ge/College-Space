import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  content: {
    type: String,
    required: true,
    maxLength: 800,
  },
  image: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    default: () => {
      const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      return date.split(", ")[1];
    }
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
