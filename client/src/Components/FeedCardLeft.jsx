/* eslint-disable react/prop-types */
import { FaHeart } from 'react-icons/fa';
import { MdBookmark } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import TimeAgo from 'react-timeago';
// import BASE_API from '../api.js';
import defaultImage from '../assets/default.avif';


const FeedCardPost = ({ title, content, image, author, username, createdAt, authorPic, isLoggedIn, isLiked, likes, isBookmarked, handleLike, handleUnlike, handleBookmark }) => {
    const navigate = useNavigate();

    return (
        <div className="w-1/2 h-full flex flex-col rounded-lg shadow-2xl overflow-y-auto left bg-white" style={{ maxHeight: '560px' }}>
            <div className="flex gap-5 items-center w-80 my-2">
                <div className="flex items-center cursor-pointer" onClick={() => { navigate(`/account/${author}`, { state: { userEmail: author } }) }}>
                    <img
                        className="w-8 h-8 rounded-full mx-2"
                        src={authorPic || defaultImage} 
                        alt={`${username}'s Profile`}
                    />
                    <p className="text-xs font-medium text-gray-700">
                        {username}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-400">
                        <TimeAgo date={createdAt} />
                    </p>
                </div>
            </div>

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
            <div className="flex-grow p-4 relative">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{title}</h5>
                <p className="mb-3 font-normal text-sm text-gray-700 dark:text-gray-800">{content}</p>
                {isLoggedIn && (
                    <div className="flex justify-between">
                        <div className="like flex items-center justify-center gap-1">
                            {isLiked ? (
                                <FaHeart
                                    onClick={handleUnlike}
                                    style={{ color: 'red', cursor: 'pointer' }}
                                />
                            ) : (
                                <FaHeart
                                    onClick={handleLike}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                            <div className="text-xs text-gray-400">{likes}</div>
                        </div>
                        <div className="bookmark">
                            {isBookmarked ? (
                                <MdBookmark
                                    onClick={handleBookmark}
                                    style={{ color: 'gold', cursor: 'pointer' }}
                                />
                            ) : (
                                <MdBookmark
                                    onClick={handleBookmark}
                                    style={{ cursor: 'pointer' }}
                                />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeedCardPost;
