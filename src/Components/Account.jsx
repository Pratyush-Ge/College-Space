import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const Account = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const [postCount, setPostCount] = useState(0); 
  const token = localStorage.getItem('token');
  const userData = jwtDecode(token);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
      axios.get('http://localhost:5000/getposts')
        .then(response => {
          const userPosts = response.data.filter(post => post.author === userData.email);
          setPostCount(userPosts.length);
        })
        .catch(error => {
          console.error(error);
        });
  
  }, [isLoggedIn]);

  return isLoggedIn ? (
    <div className="flex justify-center items-center h-screen flex-col gap-5">

      <div className="p-4">
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img className="w-full h-full object-cover" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="User Avatar" />
          </div>
        </div>
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold text-white">{userData.username}</h1>
          <p className="text-gray">{userData.email}</p>
        </div>
      </div>

      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">Threads</div>
          <div className="stat-value">{postCount}</div> 
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Likes</div>
          <div className="stat-value text-secondary">Count</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Liked</div>
          <div className="stat-value">Count</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Account;
