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
    maxLength: 300,
  },
  image: {
    type: String,
    default: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg',
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
    default: () => new Date().toISOString().slice(0, 10),
  },
  time: {
    type: String,
    default: () => {
      const date = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      return date.split(", ")[1];
    }
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
