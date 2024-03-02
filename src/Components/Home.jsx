import Feed from './Feed';

const Home = () => {
    return (
        <div className="bg-gray-100 min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-4">Home Page</h1>
            <Feed />
        </div>
    );
};

export default Home;