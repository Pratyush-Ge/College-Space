import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import FeedCard from './FeedCard';

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div  className="w-1/3 flex flex-col justify-center items-center gap-4 my-4">
      <h1 className="text-2xl font-bold my-4 text-center">My Posts</h1>
      {filteredPosts.length > 0 ? (
        <div>
          {filteredPosts.map((post) => (  
            <FeedCard
              key={post._id}
              title={post.title}
              content={post.content}
              image={post.image}
              author={post.author}
              username={post.username}
              createdAt={post.createdAt}
              time={post.time}
            />
          ))}
        </div>
      ) : (
        <div>No activity yet.</div>
      )}
    </div>
  );
};

export default MyPost;
