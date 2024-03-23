import  { useState } from 'react';

const AddPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostForm;
