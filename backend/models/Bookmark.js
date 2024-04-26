import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  userEmail: {
    type: String,
    required: true
  }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);

export default Bookmark;