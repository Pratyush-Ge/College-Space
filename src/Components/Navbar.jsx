import { useState, useEffect } from 'react';
import LoginForm from './Login';
import SignupForm from './SignupForm';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);



  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    window.location.reload();
  };


  return (
    <div className="navbar bg-white text-black">
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
            <li><a onClick={() => navigate('/sex')}>Sex</a></li>
          </ul>
        </div>

        <h1 className="ml-3 text-xl font-bold">Uni-Verse</h1>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
        <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Feed</Link></li>
          <li><Link to="/academics" className={location.pathname === '/academics' ? 'active' : ''}>Academics</Link></li>
          <li><Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link></li>
          <li><Link to="/post" className={location.pathname === '/post' ? 'active' : ''}>Post</Link></li>
        </ul>
      </div>

      <div className="navbar-end">
        {isLoggedIn ? (
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-sm btn-outline mx-2 text-black">Profile</div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-52 bg-black text-white">
              <li><a onClick={() => navigate('/account')}>Account</a></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
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
