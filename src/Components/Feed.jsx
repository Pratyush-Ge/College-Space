import FeedCard from "./FeedCard";

const Feed = () => {
  return (
    <div className="feedContainer">
      <FeedCard thread="Life hack" username="User123" />
      <FeedCard thread="Life hack" username="User123" />
      <FeedCard thread="Life hack" username="User123" />
      <FeedCard thread="Life hack" username="User123" />
    </div>
  );
};  

export default Feed;