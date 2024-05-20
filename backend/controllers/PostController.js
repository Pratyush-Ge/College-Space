import Post from '../models/Post.js';
import cloudinary from '../config/cloudinary.js';
import { extractPublicId } from 'cloudinary-build-url';

export const postRoute = async (req, res) => {
  try {
    const { title, content, email, username } = req.body;
    const image = req.file.path?req.file.path:null;
    
    // if (req.file) {
    //   const result = await cloudinary.uploader.upload(req.file.path);
    //   image = result.secure_url;
    //   imageId = result.public_id;
    // }

    const newPost = new Post({
      title,
      content,
      image,
      author: email,
      username,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getRoute = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteRoute = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (deletedPost.image) {
      const publicId = extractPublicId(deletedPost.image);

      await cloudinary.uploader.destroy(publicId);
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
