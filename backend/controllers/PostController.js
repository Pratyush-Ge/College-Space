import Post from '../models/Post.js';

export const postRoute = async (req, res) => {
  try {
    const { title, content, email, username } = req.body;
    const image = req.file ? req.file.filename : null; 

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
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

