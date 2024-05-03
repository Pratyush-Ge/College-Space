/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import FeedCardRight from './CommentSection';
import FeedCardLeft from './FeedCardLeft.jsx';
import BASE_API from '../api.js';

const FeedCard = ({ postId, title, content, image, author, username, createdAt }) => {
  const navigate = useNavigate();
  const [authorPic, setAuthorPic] = useState('');
  const [comment, setComment] = useState('');
  const [key, setKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You need to be logged in to like a post');
      return;
    }
    const data = jwtDecode(token);
    const userEmail = data.email;
    try {
      await axios.post(`${BASE_API}/likePost`, { postId, userEmail: userEmail });
      setIsLiked(true);
      setLikes(prevLikes => prevLikes + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You need to be logged in to unlike a post');
      return;
    }
    const data = jwtDecode(token);
    const userEmail = data.email;
    try {
      await axios.delete(`${BASE_API}/likePost/toggle`, { data: { postId, userEmail: userEmail } });
      setIsLiked(false);
      setLikes(prevLikes => prevLikes - 1);
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const handleBookmark = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You need to be logged in to bookmark a post');
      return;
    }
    const data = jwtDecode(token);
    const userEmail = data.email;
    try {
      const bookmarks = await axios.get(`${BASE_API}/bookmark/check/${postId}?userEmail=${userEmail}`);
      const bookmarkedPost = bookmarks.data.bookmarked;
      if (bookmarkedPost) {
        await axios.delete(`${BASE_API}/bookmark/remove/${postId}/${userEmail}`);
        setIsBookmarked(false);
      } else {
        await axios.post(`${BASE_API}/bookmark/add`, { postId, userEmail: userEmail });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Error bookmarking:', error);
    }
  };

  useEffect(() => {
    const checkLikeStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const data = jwtDecode(token);
      const userEmail = data.email;
      try {
        const likes = await axios.get(`${BASE_API}/likePost/${postId}`);
        const isLikedByUser = likes.data.some(like => like.userEmail === userEmail);
        setIsLiked(isLikedByUser);
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    checkLikeStatus();

    const fetchLikes = async () => {
      try {
        const response = await axios.get(`${BASE_API}/likePost/${postId}`);
        setLikes(response.data.length);
        const token = localStorage.getItem('token');
        if (token) {
          const data = jwtDecode(token);
          const userEmail = data.email;
          setIsLiked(response.data.some(like => like.userEmail === userEmail));
        }
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };
    fetchLikes();

    const bookmarkStatus = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const data = jwtDecode(token);
      const userEmail = data.email;
      try {
        const bookmarks = await axios.get(`${BASE_API}/bookmark/check/${postId}?userEmail=${userEmail}`);
        const bookmarkedPost = bookmarks.data.bookmarked;
        setIsBookmarked(bookmarkedPost);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
      }
    };
    bookmarkStatus();
  }, [postId]);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`${BASE_API}/comment/post`, {
        postId: postId,
        content: comment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('Comment posted');
      setComment('');
      setKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  useEffect(() => {
    axios.get(`${BASE_API}/auth/getUserDetails`, {
      headers: {
        'Authorization': `Bearer ${author}`
      }
    })
      .then(response => {
        setAuthorPic(response.data.profilePicUrl);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
  }, [author]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="w-full p-4 border rounded-lg shadow bg-gray-50 flex h-97" style={{ maxHeight: '600px' }}>
      <FeedCardLeft
        postId={postId}
        title={title}
        content={content}
        image={image}
        author={author}
        username={username}
        createdAt={createdAt}
        authorPic={authorPic}
        isLoggedIn={isLoggedIn}
        isLiked={isLiked}
        likes={likes}
        isBookmarked={isBookmarked}
        handleLike={handleLike}
        handleUnlike={handleUnlike}
        handleBookmark={handleBookmark}
        BASE_API={BASE_API}
      />
      <div className="w-1/2 flex flex-col px-3 m-1">
        <h3 className="font-semibold p-1 text-gray-700">Discussion</h3>
        {isLoggedIn ? (
          <FeedCardRight postId={postId} key={key} onCommentSubmit={handleCommentSubmit} />
        ) : (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Login or Signup</h3>
            <p className="mb-4">You need to be logged in to comment. Please login or signup to continue.</p>
            <div className="flex justify-start">
              <button className="btn btn-accent mr-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Login</button>
              <button className="btn btn-accent" onClick={() => document.getElementById('my_modal_1').showModal()}>Signup</button>
            </div>
          </div>
        )}

        {isLoggedIn && (
          <>
            <div className="w-full px-3 mb-2 mt-6">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 text-black placeholder-gray-400 focus:outline-none focus:bg-white"
                name="body" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
            </div>
            <div className="w-full flex justify-end px-3 my-3">
              <button onClick={handleCommentSubmit} className="rounded-md text-white text-sm btn-accent btn btn-sm">Post Comment</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
