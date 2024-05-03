/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import MyPostsFeedCard from "./MyPostsFeedCard";

const SavedPosts = (props) => {
    const { userEmail } = props;
    const [savedPosts, setSavedPosts] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/bookmark/${userEmail}`);
                const bookmarks = response.data;
                setSavedPosts(bookmarks);
            } catch (error) {
                console.error("Error fetching bookmarks:", error);
            }
        };

        fetchBookmarks();
    }, [userEmail]);

    return (
        <div className="w-96 flex flex-col justify-center items-center gap-4">
            {savedPosts.length > 0 ? (
                savedPosts.map((post) => (
                    <MyPostsFeedCard
                        key={post._id}
                        title={post.title}
                        content={post.content}
                        image={post.image}
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center h-full">
                    <div>No saved post.</div>
                </div>
            )}
        </div>
    );
};

export default SavedPosts;
