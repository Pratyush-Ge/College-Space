import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_API from '../api';
import { jwtDecode } from 'jwt-decode';

const FriendsList = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem('token');
    const userData = token ? jwtDecode(token) : null;

    useEffect(() => {
        if (userData && userData.email) {
            axios.get(`${BASE_API}/auth/getAllUsers`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    const filteredUsers = response.data.filter(user => user.email !== userData.email);
                    setUsers(filteredUsers);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                });
        }
    }, [token, userData]);

    return (
        <div className="people-list w-full">
            <div className="listHeader flex items-end gap-3 border-b-2 border-gray-700 h-11">
                <p className="text-xl font-bold text-white pb-3">Friends</p>
                <p className="text-sm text-gray-500 pb-3">Total: {users.length}</p>
                <p className="text-sm text-gray-500 pb-3">Online: </p>
            </div>
            <div className="peopleList flex flex-col mt-5 overflow-y-auto ">
                {users.map(user => (
                    <div key={user.usn} className="user-item flex gap-2 items-center border-b-2 pb-3 pt-3 border-gray-800 hover:bg-gray-950 cursor-pointer px-2"
                        onClick={()=>{navigate(`/message/${user.email}`)}}
                    >
                        <img src={user.profilePicUrl} alt={user.username} className="object-cover w-8 h-8 rounded-full"/>
                        <p className="username">{user.username}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsList;
