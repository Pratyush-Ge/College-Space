/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import SavedPostCard from "./FeedCardLeft2.jsx";
import BASE_API from '../api.js'

const SavedPosts = (props) => {
    const { userEmail } = props;
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(`${BASE_API}/bookmark/${userEmail}`);
                const bookmarks = response.data;
                setSavedPosts(bookmarks);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarks();
    }, [userEmail]);

    return (
        <div className="w-96 flex flex-col justify-center items-center gap-4 my-4">
            {savedPosts.length > 0 ? (
                savedPosts.map((post) => (
                    <SavedPostCard
                        key={post._id}
                        title={post.title}
                        content={post.content}
                        username={post.username}
                        image={post.image}
                        author={post.author}
                        createdAt={post.createdAt}
                        myprofile={0}
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-full my-8">
                    <div>No saved post.</div>
                </div>
            )}
        </div>
    );
};

export default SavedPosts;
