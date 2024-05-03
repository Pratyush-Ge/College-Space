/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { jwtDecode } from "jwt-decode";
import BASE_API from '../api.js'


const FeedCard = ({ title, content, image, author, username, createdAt, time, onRemove }) => {

  const token = localStorage.getItem('token');
  const userData = token ? jwtDecode(token) : null;


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

  const handleRemove = () => {
    onRemove();
  };

  return (
    <div className="w-full p-2 relative">
      <div className="border rounded-lg shadow bg-white dark:border-gray-700 h-auto flex flex-col overflow-y-auto myposts" style={{ maxHeight: '560px' }}>
        {image && (
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full">
                <img
                  className="object-cover w-full h-full"
                  src={`${BASE_API}/uploadsLocation/${image}`}
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