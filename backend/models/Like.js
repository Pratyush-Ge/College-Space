import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
});

const Like = mongoose.model('Like', likeSchema);

export default Like;
