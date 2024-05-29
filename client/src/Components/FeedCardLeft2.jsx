/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import BASE_API from '../api.js';
import TimeAgo from 'react-timeago';
import defaultImage from '../assets/default.avif';


const FeedCard = ({ title, content, image, author, username, createdAt, onRemove, myprofile }) => {
  const token = localStorage.getItem('token');
  const {currAuthor} = useParams();
  const userData = token ? jwtDecode(token) : null;
  const navigate = useNavigate();
  const [ppUrl, setPpUrl] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${BASE_API}/auth/getUserDetails`, {
          headers: {
            'Authorization': `Bearer ${author}`
          }
        });
        setPpUrl(response.data.profilePicUrl);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
  }, [author]);

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <div className="w-full p-2 relative">
      <div className="border rounded-lg shadow bg-white dark:border-gray-700 h-auto flex flex-col overflow-y-auto myposts" style={{ maxHeight: '560px' }}>
        {(myprofile === 0) && (
          <div className="flex gap-5 items-center w-80 my-2">
            <div className="flex items-center cursor-pointer" onClick={() => { navigate(`/account/${author}`, { state: { userEmail: author } }) }}>

              <img
                className="w-8 h-8 rounded-full mx-2"
                src={ppUrl || defaultImage} 
                alt={`${username}'s Profile`}
              />

              <p className="text-xs font-medium text-gray-700">
                {username}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 right-2">
                <TimeAgo date={createdAt} />
              </p>
            </div>
          </div>)}
        {image && (
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full">
                <img
                  className="object-cover w-full h-full"
                  src={image}
                  alt="Post Image"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex-grow p-4 items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-800 pb-5">{content}</p>
        </div>
        {(onRemove && userData && userData.email === author) && (
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button className="text-xs text-white btn btn-sm btn-error m-1" onClick={handleRemove}>Remove Post</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedCard;
