import { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify'


const AddPostForm = () => {
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
  
      await axios.post('http://localhost:5000/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      toast.success('Posted Successfully');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error posting:', error);
    }
  };  
  

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex justify-between w-full max-w-screen-lg">
        <div className="w-1/2 min-w-[300px] p-4">
          <h2 className="text-2xl font-bold mb-4">Add New Post</h2>
          <form className="space-y-4">
            <label className="block">
              <span className="text-white">Title </span>
              <span className="text-gray-700">(max 50 words):</span>
              <input
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength="50"
                required
              />
            </label>
            <label className="block">
              <span className="text-white">Content </span>
              <span className="text-gray-700">(max 300 words):</span>
              <textarea
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength="300"
                minLength="30"
                required
              ></textarea>
            </label>
            <label className="block">
              <span className="text-white">Image </span>
              <span className="text-gray-700">(optional)</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block file-input file-input-bordered file-input-accent w-full max-w-xs"
              />
            </label>
          </form>
        </div>
        <div className="w-2/5 min-w-[300px] p-4">
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-lg font-bold mb-2">Preview:</h3>
            {title && <h4 className="text-xl font-semibold mb-2">{title}</h4>}
            {image && <img src={previewImage} alt="Preview" className="max-w-full h-auto" />}
            {content && (
              <p className="mb-2">
                {content.substring(0, 300)}{content.length > 300 && '...'}
              </p>
            )}
            <button
              onClick={handlePost}
              className="mt-4 btn btn-accent btn-sm"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostForm;
