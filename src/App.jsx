import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Feed from './Components/Feed';
import Events from './Components/Events';
import Academics from './Components/Academics';
import Notices from './Components/Notices';
import { ToastContainer } from 'react-toastify';
import Profile from './Components/Profile';
import Account from './Components/Account';
import Post from './Components/MyPost';
import AddPostForm from './Components/AddPost';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/events" element={<Events />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/account/:id" element={<Account />} />
            <Route path="/addpost" element={<AddPostForm />} />
            <Route path="/post" element={<Post />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
