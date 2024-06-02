import { useState, useEffect } from 'react';
import LoginForm from './Login';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { IoMdChatbubbles } from 'react-icons/io';
// import { toast } from 'react-toastify';
import axios from 'axios'; 
import {jwtDecode} from 'jwt-decode';
import BASE_API from '../api.js'
import defaultImage from '../assets/default.avif';
import logo from '../assets/logo.png'


const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [email, setEmail] = useState('');
  const [admin, setAdminControl] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(null);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = jwtDecode(token);
      const emailToken = userData.email;
      setEmail(userData.email);
      axios.get(`${BASE_API}/auth/getUserDetails`, {
        headers: {
          'Authorization': `Bearer ${emailToken}`
        }
      })
      .then(response => {
        setProfilePicUrl(response.data.profilePicUrl);
        setAdminControl(response.data.admin);
      })
      .catch(error => {
        console.error('Error fetching user details:', error);
      });
    }
  }, [email]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="navbar bg-white text-black top-0 left-0 fixed z-50 mb-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
            <li><a onClick={() => navigate('/')}>Feed</a></li>
            <li>
              <a onClick={() => navigate('/academics')}>Academics</a>
              <ul className="p-2">
                <li><a>Notes</a></li>
                <li><a>Notices</a></li>
              </ul>
              <a onClick={() => navigate('/events')}>Events</a>
              <ul className="p-3">
                <li><a>College</a></li>
                <li><a>Club</a></li>
              </ul>
            </li>
          </ul>
        </div>

        <div className="logoTitle flex items-center">
          <img src={logo} alt="Logo" className='w-14' />
        <h1 className="text-xl font-bold">UniVerse</h1>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Feed</Link></li>
          <li><Link to="/academics" className={location.pathname === '/academics' ? 'active' : ''}>Academics</Link></li>
          <li><Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link></li>
          {/* <li>
            <a onClick={() => isLoggedIn ? navigate('/post') : handleAddPostClick()} className={location.pathname === '/post' ? 'active' : ''}>
              {isLoggedIn ? 'My Posts' : 'Add Post'}
            </a>
          </li> */}
        </ul>
      </div>

      <div className="navbar-end">
        {isLoggedIn ? (
          <>
            <div className="btn btn-ghost btn-circle m-1 text-lg"
              onClick={()=>{navigate(`/message/${email}`)}}
            >
                  <IoMdChatbubbles/>
            </div>
            <div className="dropdown dropdown-end flex">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img src={profilePicUrl || defaultImage} alt="Profile" className="profile-picture" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-16 z-[1] p-2 shadow bg-white rounded-box w-52">
                <li onClick={() => { navigate(`/account/${email}`, { state: { userEmail: email } }) }}> 

                  <a className="justify-between">
                    Profile
                  </a>
                </li>
                <li onClick={() => { navigate('/addpost') }}>
                  <a className="justify-between">
                    Add Post
                  </a>
                </li>
                {admin && 
                <li onClick={() => {navigate('/addEvent')}}>
                <a className="justify-between">
                  Add Event
                </a>
              </li>}
                <li><a onClick={handleLogout} >Logout</a></li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <button className="btn btn-sm btn-outline mx-2 text-black" onClick={() => document.getElementById('my_modal_1').showModal()}>
              Sign-Up
            </button>
            <button className="btn btn-sm btn-outline text-black" onClick={() => document.getElementById('my_modal_2').showModal()}>
              Login
            </button>
          </>
        )}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box bg-white modal-content">
            <div className="btns flex justify-between">
              <button className="btn btn-sm" onClick={() => {
                document.getElementById('my_modal_1').close();
                document.getElementById('my_modal_2').showModal();
              }}>
                Login here
              </button>
              <button onClick={() => {
                document.getElementById('my_modal_1').close();
              }} className="p-1 bg-white rounded-full text-black focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <h3 className="font-bold text-lg mb-4 text-center">
              Sign-Up
            </h3>
            <SignupForm />
          </div>
        </dialog>

        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-white">
            <div className="btns flex justify-between">
              <button className="btn btn-sm" onClick={() => {
                document.getElementById('my_modal_2').close();
                document.getElementById('my_modal_1').showModal();
              }}>
                Create an account
              </button>
              <button onClick={() => {
                document.getElementById('my_modal_2').close();
              }} className="p-1 bg-white rounded-full text-black focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <h3 className="font-bold text-lg my-4 text-center">
              Login
            </h3>
            <LoginForm />
          </div>
        </dialog>

      </div>
    </div>
  );
};

export default Navbar;
