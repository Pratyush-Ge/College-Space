import { useEffect, useState } from 'react';
import PostCard from './PostCard';
const Feed = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const dummyData = [
            { id: 1, name: 'User 1', post: 'This is my first post!' },
            { id: 2, name: 'User 2', post: 'Hello, world!' },
            { id: 3, name: 'User 3', post: 'Just another day.' },
        ];
        setPosts(dummyData);
    }, []);
    return (
        <div className="flex flex-col items-center">
            {posts.map(data => (
                <PostCard key={data.id} name={data.name} post={data.post} />
            ))}
        </div>
    );
};
export default Feed;    