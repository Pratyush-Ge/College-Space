import mongoose from 'mongoose';

const { Schema } = mongoose;

const commentSchema = new Schema({
  commentId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxLength: 500,
  },
  author: {
    type: String, 
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profilePicUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
