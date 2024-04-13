import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import MyPostsFeedCard from './MyPostsFeedCard';

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  const token = localStorage.getItem('token');
  const userData = jwtDecode(token);
  const email = userData.email;

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts.filter(post => post.author === email));
    setLoading(false);
  }, [posts, email]);

  const fetchPosts = async () => {
    axios.get('http://localhost:5000/getposts')
      .then(response => {
        setPosts(response.data.reverse());
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleRemovePost = (postId) => {
    axios.delete(`http://localhost:5000/deletepost/${postId}`)
      .then(() => {
        setPosts(posts.filter(post => post._id !== postId));
        setShowDeleteModal(false);
      })
      .catch(error => {
        console.error(error);
      });
  }; 

  const openDeleteModal = (postId) => {
    setPostIdToDelete(postId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-1/3">
      <h1 className="text-2xl font-bold my-4 text-center ">My Posts</h1>
      {filteredPosts.length > 0 ? (
        <div className= "flex flex-col justify-center items-center pt-2">
          {filteredPosts.map((post) => (  
            <MyPostsFeedCard
              key={post._id}
              title={post.title}
              content={post.content}
              image={post.image}
              onRemove={() => openDeleteModal(post._id)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <div>No activity yet.</div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <p className="text-lg mb-4 ">Are you sure you want to delete this post?</p>
            <div className="flex justify-end">
              <button className="btn btn-accent mr-2" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={() => handleRemovePost(postIdToDelete)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPost;
