import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const Account = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);  
  
  let token, userData;
  if (isLoggedIn) {
    token = localStorage.getItem('token');
    userData = jwtDecode(token);
  }
 
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
          <div className="stat-value">Count</div>
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
