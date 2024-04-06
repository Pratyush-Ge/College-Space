/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

const FeedCard = ({ title, content, image, author, username, createdAt, time, onRemove }) => {
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
    <div className="w-full p-4">
      <div className="border rounded-lg shadow bg-white dark:border-gray-700 h-auto flex flex-col">
        {image && (
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <img
              className="absolute object-cover w-full h-full rounded-t-lg"
              src={`../backend/uploads/${image}`}
              alt="Post Image"
            />
          </div>
        )}
        <div className="flex-grow p-4 items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-800">{content}</p>
          <div className="flex justify-center mt-4">
            <button className="text-xs btn-sm text-red-500 btn btn-ghost" onClick={handleRemove}>Remove Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
