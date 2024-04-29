import Comment from '../models/Comment.js';
import {jwtDecode} from 'jwt-decode'; 
import mongoose from "mongoose";


export const postRoute = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const { email, username, profilePicUrl } = jwtDecode(token);
    const { postId, content } = req.body;

    const comment = new Comment({
      commentId: new mongoose.Types.ObjectId(),
      postId,
      content,
      author: email,
      username,
      profilePicUrl, 
      likes: 0,
      isLiked: false, 
    });

    await comment.save();

    res.status(201).json({ message: 'Comment posted successfully' });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'Failed to post comment' });
  }
};



export const getRoute = async (req, res) => {
    try {
      const { postId } = req.params;
      const comments = await Comment.find({ postId });
      res.json(comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const deleteRoute = async (req, res) => {
    const { commentId } = req.params;
  
    try {
      const deletedComment = await Comment.findByIdAndDelete(commentId);
      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  


