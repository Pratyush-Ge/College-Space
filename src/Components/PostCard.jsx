
const PostCard = ({ name, post }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-lg font-bold mb-2">{name}</h3>
            <p className="text-gray-600">{post}</p>
        </div>
    );
};

export default PostCard;