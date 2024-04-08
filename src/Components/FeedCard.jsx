/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import CommentSection from './CommentSection';
import { jwtDecode } from 'jwt-decode';

const FeedCard = ({ postId, title, content, image, author, username, createdAt, time }) => {
  const navigate = useNavigate();
  const [authorPic, setAuthorPic] = useState('');
  const [comment, setComment] = useState('');
  const [key, setKey] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/postComment', {
        postId: postId,
        content: comment,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      console.log(response.data.message);

      setKey(prevKey => prevKey + 1);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  useEffect(() => {
    axios.get('http://localhost:5000/getUserDetails', {
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
        // Token is expired
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const timeAgo = (createdAt) => {
    const now = new Date();
    const createdAtDate = new Date(createdAt);
    const diffTime = Math.abs(now - createdAtDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else {
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${amOrPm}`;
  };

  return (
    <div className="w-full p-4 border rounded-lg shadow bg-white dark:border-gray-700 flex h-97" style={{ maxHeight: '600px' }}>
      <div className="w-1/2 h-full flex flex-col rounded-lg shadow-lg overflow-y-auto left" style={{ maxHeight: '560px' }}>
        {image && (
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full">
                <img
                  className="object-cover w-full h-full rounded-t-lg"
                  src={`../backend/uploads/${image}`}
                  alt="Post Image"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex-grow p-4 relative">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{title}</h5>
          <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-800">{content}</p>

          <div className="flex justify-between items-center">
            <div className="flex items-center cursor-pointer" onClick={() => { navigate('/account', { state: { userEmail: author } }) }}>
              {authorPic ? (
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={`../backend/profilePic/${authorPic}`}
                  alt={`${username}'s Profile`}
                />
              ) : (
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={`../backend/profilePic/default.avif`}
                  alt={`${username}'s Profile`}
                />)}
              <p className="text-xs font-medium text-gray-400">
                {`Posted by ${username}`}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">
                {timeAgo(createdAt)}
              </p>
              <p className="text-xs text-gray-400">
                {formatDateTime(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col px-3 m-1">
        <h3 className="font-semibold p-1">Discussion</h3>

        {isLoggedIn ? (
          <CommentSection postId={postId} key={key} onCommentSubmit={handleCommentSubmit} />
        ) : (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Login or Signup</h3>
            <p className="mb-4">You need to be logged in to comment. Please login or signup to continue.</p>
            <div className="flex justify-end">
              <button className="btn btn-accent mr-2" onClick={() => document.getElementById('my_modal_2').showModal()}>Login</button>
              <button className="btn btn-accent" onClick={() => document.getElementById('my_modal_1').showModal()}>Signup</button>
            </div>
          </div>
        )}

        {isLoggedIn ? (
          <>
            <div className="w-full px-3 mb-2 mt-6">
              <textarea
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                name="body" placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
            </div>
            <div className="w-full flex justify-end px-3 my-3">
              <button onClick={handleCommentSubmit} className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500">Post Comment</button>
            </div></>
        ) : null}
      </div>
    </div>
  );
};

export default FeedCard;

