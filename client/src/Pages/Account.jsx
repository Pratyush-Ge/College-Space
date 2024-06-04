/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import { FaRegComment, FaEdit } from 'react-icons/fa';
// import { FiSend } from 'react-icons/fi';
import { MdBookmark } from 'react-icons/md';
import { IoMdPaper } from 'react-icons/io';
import MyPost from '../Components/MyPost';
import SavedPost from '../Components/SavedPosts';
import BASE_API from '../api';
import defaultImage from '../assets/default.avif';

const Account = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const { userEmail } = location.state || {};
  const [postCount, setPostCount] = useState(0);
  const [username, setUsername] = useState('');
  const [usn, setUsn] = useState('');
  const [activeTab, setActiveTab] = useState('Posts');

  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const token = localStorage.getItem('token');
  const userData = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (userEmail) {
      axios.get(`${BASE_API}/auth/getUserDetails`, {
        headers: {
          'Authorization': `Bearer ${userEmail}`
        }
      })
        .then(response => {
          setProfilePicUrl(response.data.profilePicUrl);
          setUsername(response.data.username);
          setUsn(response.data.usn);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });

      axios
        .get(`${BASE_API}/post/getposts`)
        .then((response) => {
          const userPosts = response.data.filter((post) => post.author === userEmail);
          setPostCount(userPosts.length);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userEmail]);

  const handleUpload = () => {
    const fileInput = document.getElementById('profilePicInput');
    if (!fileInput) {
      console.error('File input element not found');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('usn', usn);
    
    axios
      .post(`${BASE_API}/user/uploadProfilePic`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const newProfilePic = response.data.profilePicUrl;
        setProfilePicUrl(newProfilePic);
        localStorage.setItem('profilePic', newProfilePic);
        toast.success('Profile picture uploaded');
    
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to upload profile picture');
      });
  };
  
  const handleRemovePhoto = () => {
    document.getElementById('confirm_remove_modal').showModal();
  };


  const confirmRemovePhoto = () => {
    axios
      .delete(`${BASE_API}/user/deleteProfilePic`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          usn: usn,
        },
      })
      .then(() => {
        setProfilePicUrl(null);
        toast.warning("Profile picture removed!")
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  

  const renderMessageButton = () => {
    if (userData && userEmail === userData.email) {
      return (
        <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>
          <FaEdit /> Edit Profile
        </button>
      );
    } else if (userData) {
      return (
        <button className="btn" onClick={()=>{navigate(`/message/${id}`)}}>
          <FaRegComment /> Message
        </button>
      );
    } else {
      return (
        <button className="btn" onClick={() => toast("Login first")}>
          <FaRegComment /> Message
        </button>
      );
    }
  };
  

  return (
    <div className="flex h-full mt-4 min-h-screen">
      <div className="p-4 relative flex items-center flex-col">
        <div className="flex gap-8 justify-center items-cente">
          <div className="w-20 h-20 rounded-full overflow-hidden">
          <img src={profilePicUrl || defaultImage} alt="Profile" className="w-full h-full object-cover"/>
          </div>
          <div className="text-center mt-4">
            <h1 className="text-xl font-bold text-white">{username}</h1>
            <p className="text-gray">{userEmail}</p>
          </div>
          {renderMessageButton()}
        </div>

        <div role="tablist" className="tabs tabs-bordered mt-8">
          <a
            role="tab"
            className={`tab ${activeTab === 'Posts' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('Posts')}
          >
            <IoMdPaper className="mr-2" />
            <span>Posts ({postCount})</span>
          </a>
          <a
            role="tab"
            className={`tab ${activeTab === 'Saved' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('Saved')}
          >
            <MdBookmark className="mr-2" />
            <span>Saved</span>
          </a>
        </div>

        <div>
          {activeTab === 'Posts' && (
            <div className="w-full mx-auto flex justify-center">
              <MyPost email={id} />
            </div>
          )}
          {activeTab === 'Saved' && (
            <div className="w-full mx-auto flex justify-center">
              <SavedPost userEmail={id} />
            </div>
          )}
        </div>
      </div>



      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
          <div className="space-y-4">
            {profilePicUrl && (
              <button
                className="btn btn-error mx-5 text-white"
                onClick={() => {
                  handleRemovePhoto();
                  document.getElementById('my_modal_3').close();
                }}
              >
                Remove Photo
              </button>
            )}
            <input
              id="profilePicInput"
              type="file"
              accept="image/*"
              className="file-input file-input-bordered file-input-accent w-full max-w-xs mx-5"
            />
            <button className="btn btn-accent" onClick={handleUpload}>
              Upload
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="confirm_remove_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Confirm Remove Photo</h3>
          <div className="space-y-4">
            <p>Are you sure you want to remove your profile photo?</p>
            <div className="flex justify-end space-x-3">
              <button className="btn" onClick={() => document.getElementById('confirm_remove_modal').close()}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={() => {
                confirmRemovePhoto();
                document.getElementById('confirm_remove_modal').close();
              }}>
                Remove
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Account;
