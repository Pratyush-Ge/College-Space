/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const FeedCard = ({ title, content, image, author, username, createdAt, time }) => {
  const navigate = useNavigate();
  const [authorPic, setAuthorPic] = useState('');

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
            {time}
          </p>
        </div>
      </div>
    </div>
  </div>

  <div className="w-1/2 flex flex-col px-3">
    <div className="h-96 overflow-y-auto right">
      <div className="w-full bg-white rounded-lg border">
        <h3 className="font-semibold p-1">Discussion</h3>
        <div className="flex flex-col gap-5 m-3">
          <div className="flex w-full justify-between border rounded-md">
            <div className="p-3">
              <div className="flex gap-3 items-center">
                <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                  className="object-cover w-8 h-8 rounded-full" alt="User Avatar" />
                <h3 className="font-bold">
                  User 1
                </h3>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                this is sample comment
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between border rounded-md">
            <div className="p-3">
              <div className="flex gap-3 items-center">
                <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                  className="object-cover w-8 h-8 rounded-full" alt="User Avatar" />
                <h3 className="font-bold">
                  User 1
                </h3>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                this is sample comment
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between border rounded-md">
            <div className="p-3">
              <div className="flex gap-3 items-center">
                <img src="https://avatars.githubusercontent.com/u/22263436?v=4"
                  className="object-cover w-8 h-8 rounded-full" alt="User Avatar" />
                <h3 className="font-bold">
                  User 1
                </h3>
              </div>
              <p className="text-gray-600 mt-2 text-sm">
                this is sample comment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="w-full px-3 mb-2 mt-6">
      <textarea
        className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
        name="body" placeholder="Comment" required></textarea>
    </div>
    <div className="w-full flex justify-end px-3 my-3">
      <input type="submit" className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500 " value='Post Comment' />
    </div>
  </div>
</div>




  );
};

export default FeedCard;
