import { useEffect, useState, useRef } from 'react';
import { FiSend } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_API from '../../api';
import './Message.css';

const MessageSection = () => {
    const { recieverId } = useParams();
    const [usernameR, setUsernameR] = useState('');
    const [profilePicUrlR, setProfilePicUrlR] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const token = localStorage.getItem('token');
    const userData = token ? jwtDecode(token) : null;
    const userEmail = userData.email;
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    useEffect(() => {
        axios.get(`${BASE_API}/auth/getUserDetails`, {
            headers: {
                'Authorization': `Bearer ${recieverId}`
            }
        })
            .then(response => {
                setProfilePicUrlR(response.data.profilePicUrl);
                setUsernameR(response.data.username);
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
    }, [recieverId]);

    useEffect(() => {
        if (userEmail && recieverId) {
            axios.get(`${BASE_API}/messages/getMessages/${userEmail}/${recieverId}`)
                .then(response => {
                    setMessages(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }
    }, [userEmail, recieverId]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        axios.post(`${BASE_API}/messages/sendMessage`, {
            senderId: userEmail,
            receiverId: recieverId,
            message: newMessage
        })
            .then(response => {
                setMessages([...messages, response.data]);
                setNewMessage('');
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    };

    return (
        <div className="container">
            <div className="row clearfix">
                <div className="col-lg-12">
                    <div className="card chat-app">
                        <div id="plist" className="people-list">
                            <ul className="list-unstyled chat-list mt-2 mb-0">
                                {/* List items */}
                            </ul>
                        </div>
                        <div className="chat flex flex-col">
                            <div className="m-2 flex gap-3 items-center">
                                <div className="w-10 h-10 rounded-full overflow-hidden row">
                                    <img src={profilePicUrlR} alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-center chat-about">
                                    <h1 className="text">{usernameR}</h1>
                                </div>
                            </div>
                            <div className="chat-history border-t-2">
                                <ul className="m-b-0">
                                    {messages.map((msg, index) => (
                                        <li key={index} className={`clearfix flex ${msg.senderId === userEmail ? 'justify-end' : 'justify-start'}`}>
                                            <div className={`message ${msg.senderId === userEmail ? 'my-message' : 'other-message float-right'}`}>
                                                {msg.message}
                                            </div>
                                        </li>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </ul>
                            </div>
                            <div className="chat-message clearfix w-full flex items-center gap-2">
                                <input
                                    type="text"
                                    name="message"
                                    id="message"
                                    className="bg-white block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-white-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                                    placeholder="Type message here..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                />
                                <span className='cursor-pointer' onClick={handleSendMessage}><FiSend /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageSection;
