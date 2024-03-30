// Feed.js
import { useEffect, useState } from "react";
import FeedCard from "./FeedCard";
import axios from "axios";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    axios.get('http://localhost:5000/getposts')
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 my-4">
      {posts.map((post) => (
        <FeedCard 
          key={post._id}
          title={post.title}
          content={post.content}
          image={post.image}
          author={post.author}
          createdAt={post.createdAt}
          time={post.time}
        />
      ))}
    </div>
  );
};

export default Feed;
