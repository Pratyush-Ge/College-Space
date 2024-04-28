/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaTrash, FaHeart } from 'react-icons/fa';
import {toast} from 'react-toastify';

const formatDateTime = (dateTime) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amOrPm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
  return `${formattedHours}:${minutes} ${amOrPm}`;
};

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

const CommentSection = ({ postId, onCommentSubmit }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userData = jwtDecode(token);
  const author = userData.email;

  useEffect(() => {
    axios.get(`http://localhost:5000/getComments/${postId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  

  const handleDelete = async (commentId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteComment/${commentId}`);
      toast.success("Comment deleted successfully");
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
                <img src={`../backend/profilePic/${comment.profilePicUrl}`} className="object-cover w-6 h-6 rounded-full" alt="User Avatar" />
                <h2 className="text-black text-sm">
                  {comment.username}
                </h2>
                <div className="text-gray-400 text-xs mt-1">
                  {formatDateTime(comment.createdAt)}
                </div>
                <div className="text-gray-400 text-xs mt-1 mr-2">
                  {timeAgo(comment.createdAt)}
                </div>
              </div>

            </div>
            <p className="text-gray-600 mt-2 text-sm">
              {comment.content}
            </p>
            <div className="flex justify-end w-full mt-2">
              {/* {!isLiked ? (
                <div className="cursor-pointer like" onClick={() => setIsLiked(prev => !prev)}>
                  <FaHeart />
                </div>
              ) : (
                <div className="cursor-pointer like" onClick={() => setIsLiked(prev => !prev)}>
                  <FaHeart style={{ color: 'red' }} />
                </div>
              )} */}

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
