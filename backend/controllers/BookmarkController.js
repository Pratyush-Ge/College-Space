import express  from 'express';
import Bookmark from '../models/Bookmark.js';
import Post from '../models/Post.js'

const router = express.Router();


export const addRoute =  async (req, res) => {
  const { postId, userEmail } = req.body;
  try {
    const bookmark = new Bookmark({ postId, userEmail });
    await bookmark.save();
    res.status(201).send({ message: 'Bookmark added successfully' });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    res.status(500).send({ message: 'Failed to add bookmark' });
  }
};

export const removeRoute = async (req, res) => {
  const { postId, userEmail } = req.params;
  try {
    await Bookmark.deleteOne({ postId, userEmail });
    res.status(200).send({ message: 'Bookmark removed successfully' });
  } catch (error) {
    console.error('Error removing bookmark:', error);
    res.status(500).send({ message: 'Failed to remove bookmark' });
  }
};


export const checkRoute = async (req, res) => {
  const { postId } = req.params;
  const { userEmail } = req.query;
  try {
    const bookmark = await Bookmark.findOne({ postId, userEmail });
    res.status(200).send({ bookmarked: !!bookmark });
  } catch (error) {
    console.error('Error checking bookmark:', error);
    res.status(500).send({ message: 'Failed to check bookmark' });
  }
};

export const getRoute = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const bookmarks = await Bookmark.find({ userEmail });
    const bookmarkedPostIds = bookmarks.map((bookmark) => bookmark.postId);
    const posts = await Post.find({ _id: { $in: bookmarkedPostIds } });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default router;
