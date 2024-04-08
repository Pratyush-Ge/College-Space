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
        setPosts(response.data.reverse());
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="w-3/5 flex flex-col justify-center items-center gap-4 my-4">
      {posts.map((post) => (
        <FeedCard
          key={post._id}
          postId={post._id} 
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
  );
};

export default Feed;
