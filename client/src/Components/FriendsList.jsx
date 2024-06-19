import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_API from '../api';
import { jwtDecode } from 'jwt-decode';
import defaultImage from '../assets/default.avif'

const FriendsList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const token = localStorage.getItem('token');
  const userData = token ? jwtDecode(token) : null;

  useEffect(() => {
    if (userData && userData.email) {
      axios.get(`${BASE_API}/auth/getAllUsers`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => {
          const filteredUsers = response.data.filter(
            user => user.email !== userData.email
          );
          setUsers(filteredUsers);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }
  }, [token, userData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
    const filtered = users.filter(user => {
      const usernameLower = user.username.toLowerCase();
      return usernameLower.includes(searchTerm);
    });
    setFilteredUsers(filtered);
  };

  const sortUsersByMatch = (users) => {
    return users.sort((a, b) => {
      const usernameLowerA = a.username.toLowerCase();
      const usernameLowerB = b.username.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();

      if (usernameLowerA === searchTermLower) {
        return -1;
      } else if (usernameLowerB === searchTermLower) {
        return 1;
      }

      let scoreA = 0;
      let scoreB = 0;
      for (let i = 0; i < searchTermLower.length; i++) {
        const char = searchTermLower[i];
        const indexA = usernameLowerA.indexOf(char);
        const indexB = usernameLowerB.indexOf(char);

        if (indexA !== -1) {
          scoreA += (searchTermLower.length - indexA);
        }
        if (indexB !== -1) {
          scoreB += (searchTermLower.length - indexB);
        }
      }

      return scoreB - scoreA;
    });
  };

  return (
    <>
      <div className="listHeader flex flex-col gap-1 border-b-2 border-gray-700">
        <div className="headerDetails flex gap-3 items-center justify-between" >
          <p className="text-xl font-bold text-white pb-3">Friends</p>
          <p className="text-sm text-gray-500 pb-3">Total: {users.length}</p>
        </div>

        <div className="flex mb-3">
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 h-8 text-sm rounded-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-teal-500 focus:border-teal-500 bg-white dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-600 text-black dark:focus:border-teal-500"
              placeholder="Search User"
              required
              onChange={handleSearch}
            />
            <button type="submit" className="absolute top-0 end-0 p-2 text-sm font-medium h-full text-white rounded-e-lg border border-teal-700 hover:bg-teal-800 dark:bg-teal-500 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </div>
      <div className="peopleList flex flex-col mt-5 overflow-y-auto max-h-80">
        {searchTerm ? (
          sortUsersByMatch(filteredUsers).length > 0 ? (
            sortUsersByMatch(filteredUsers).map(user => (
              <div key={user.usn} className="user-item flex gap-2 items-center border-b-2 pb-3 pt-3 border-gray-800 hover:bg-gray-950 cursor-pointer px-2"
                onClick={() => { navigate(`/message/${user.email}`) }}
              >
                <img src={user.profilePicUrl || defaultImage} alt={user.username} className="object-cover w-8 h-8 rounded-full" />
                <p className="username overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{user.username}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-5">No users found</p>
          )
        ) : (
          users.length > 0 ? (
            users.map(user => (
              <div key={user.usn} className="user-item flex gap-2 items-center border-b-2 pb-3 pt-3 border-gray-800 hover:bg-gray-950 cursor-pointer px-2"
                onClick={() => { navigate(`/message/${user.email}`) }}
              >
                <img src={user.profilePicUrl || defaultImage} alt={user.username} className="object-cover w-8 h-8 rounded-full" />
                <p className="username overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{user.username}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center mt-5">No users found</p>
          )
        )}
      </div>
    </>
  );
};

export default FriendsList;
