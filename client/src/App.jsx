import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Navbar from './Components/Navbar';
import Feed from './Pages/Feed';
import Events from './Pages/Events';
import Academics from './Pages/Academics';
import Notices from './Pages/Notices';
import Account from './Pages/Account';
import AddPostForm from './Pages/AddPost';
import EventForm from './Components/EventForm';
import MessageSection from './Pages/MessageSection/Message';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content relative">
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/events" element={<Events />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/notices" element={<Notices />} />
            <Route path="/account/:id" element={<Account />} />
            <Route path="/addpost" element={<AddPostForm />} />
            <Route path="/addEvent" element={<EventForm />} />
            <Route path="/message/:recieverId" element={<MessageSection />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
