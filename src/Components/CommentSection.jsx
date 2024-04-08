/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const CommentSection = ({ postId, key, onCommentSubmit }) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/getComments/${postId}`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  if (comments.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg border">
        <p className="text-center text-gray-400 p-3">No Discussion</p>
      </div>
    );
  }

  return (
    <div className="max-h-97 overflow-y-auto right">
      {comments.map((comment, index) => (
        <div key={index} className="flex justify-between border rounded-md m-1">
          <div className="p-3">
            <div className="flex gap-3 items-center cursor-pointer" onClick={() => { navigate('/account', { state: { userEmail: comment.author } }) }}>
              <img src={`../backend/profilePic/${comment.profilePicUrl}`} className="object-cover w-6 h-6 rounded-full" alt="User Avatar" />
              <h2 className="text-black text-sm">
                {comment.username}
              </h2>
            </div>
            <p className="text-gray-600 mt-2 text-sm">
              {comment.content}
            </p>
            <span className="text-gray-400 text-xs mt-1 mr-2">
              {timeAgo(comment.createdAt)}
            </span>
            <span className="text-gray-400 text-xs mt-1">
              {formatDateTime(comment.createdAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
