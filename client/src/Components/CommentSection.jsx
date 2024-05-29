/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaTrash, FaHeart } from 'react-icons/fa';
import {toast} from 'react-toastify';
import BASE_API from '../api.js'
import TimeAgo from 'react-timeago';
import defaultImage from '../assets/default.avif';



const CommentSection = ({ postId, onCommentSubmit }) => {
  const [userProfilePics, setUserProfilePics] = useState({});
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userData = jwtDecode(token);
  const author = userData.email;

  useEffect(() => {
    axios.get(`${BASE_API}/comment/get/${postId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  useEffect(() => {
    comments.forEach(comment => {
      axios.get(`${BASE_API}/auth/getUserDetails`, {
        headers: {
          'Authorization': `Bearer ${comment.author}`
        }
      })
        .then(response => {
          const profilePicUrl = response.data.profilePicUrl;
          setUserProfilePics(prevState => ({
            ...prevState,
            [comment.author]: profilePicUrl
          }));
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });
    });
  }, [comments]);
  
  

  const handleDelete = async (commentId) => {
    try {
      const response = await axios.delete(`${BASE_API}/comment/delete/${commentId}`);
      toast.warning("Comment deleted");
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (comments.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg border">
        <p className="text-center text-gray-400 p-3">No Discussion</p>
      </div>
    );
  }

  return (
<div className="max-h-90 overflow-y-auto right">
      {comments.map((comment, index) => (
        <div key={index} className="flex justify-between border border-gray-400 rounded-md m-1">
          <div className="p-3 relative w-full">
            <div className="flex items-center gap-3">
              <div className="flex gap-3 items-center cursor-pointer" onClick={() => { navigate(`/account/${comment.author}`, { state: { userEmail: comment.author } }) }}>
                <img src={userProfilePics[comment.author] || defaultImage} className="object-cover w-6 h-6 rounded-full" alt="User Avatar" />
                <h2 className="text-black text-sm">
                  {comment.username}
                </h2>
                <div className="text-gray-400 text-xs mr-2">
                  {<TimeAgo date={comment.createdAt} />}
                </div>
              </div>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              {comment.content}
            </p>
            <div className="flex justify-end w-full mt-2">
              {(comment.author === author) && (
                <div className="deleteComment cursor-pointer"  onClick={() => handleDelete(comment._id)}><FaTrash /></div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
