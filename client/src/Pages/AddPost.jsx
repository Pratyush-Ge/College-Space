import { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { toast } from 'react-toastify';
import BASE_API from '../api.js';
import { useNavigate } from 'react-router-dom';

const AddPostForm = () => 
{
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const token = localStorage.getItem('token');
  const userData = jwtDecode(token);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('email', userData.email);
      formData.append('username', userData.username);

      await axios.post(`${BASE_API}/post`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Posted Successfully');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error posting:', error);
      toast.error('Error posting. Please try again.');
    }
  };

  return (
<div className="flex justify-center mt-8 w-full p-8 rounded-lg shadow-lg">
  <div className="flex justify-center gap-8 flex-wrap items-center w-full max-w-screen-lg bg-white p-8 rounded-lg shadow-lg">
    <div className="w-1/2 min-w-[400px] p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add Post</h2>
      <form className="space-y-6" onSubmit={handlePost}>
        <label className="block">
          <span className="text-lg font-semibold text-gray-700">Title </span>
          <span className="text-gray-500">(max 50 words):</span>
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-gray-800 bg-white p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            required
          />
        </label>
        <label className="block">
          <span className="text-lg font-semibold text-gray-700">Content </span>
          <span className="text-gray-500">(max 800 words):</span>
          <textarea
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-purple-300 focus:ring focus:ring-purple-200 focus:ring-opacity-50 text-gray-800 bg-white p-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength="800"
            minLength="30"
            required
          ></textarea>
        </label>
        <label className="block">
          <span className="text-lg font-semibold text-gray-700">Image </span>
          <span className="text-gray-500">(optional)</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-gray-800 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-teal-500 hover:file:bg-purple-100 p-2"
          />
        </label>
        <button
          type="submit"
          className="mt-6 w-full btn btn-sm btn-accent text-white font-semibold py-2 rounded-mdtransition duration-200"
        >
          Post
        </button>
      </form>
    </div>
    <div className="w-2/5 min-w-[400px] p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="border border-gray-300 rounded-lg p-4">
        <h3 className="text-lg font-bold mb-2 text-center text-gray-800">Preview:</h3>
        {title && <h4 className="text-xl font-semibold mb-2 text-gray-700">{title}</h4>}
        {image && <img src={previewImage} alt="Preview" className="max-w-full h-auto mb-4 rounded-lg shadow-lg" />}
        {content && (
          <p className="text-gray-700">
            {content.substring(0, 300)}{content.length > 300 && '...'}
          </p>
        )}
      </div>
    </div>
  </div>
</div>


  );
};

export default AddPostForm;
