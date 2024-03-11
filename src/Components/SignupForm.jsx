import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usn, setUsn] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usnRegex = /^\d{1}[a-zA-Z]{2}\d{2}[a-zA-Z]{2}\d{3}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsnChange = (e) => {
    setUsn(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usnRegex.test(usn)) {
      toast.error('Invalid USN format. eg.1si21csxxx');
      return;
    } 
    if (!emailRegex.test(email)) {
      toast.error('Invalid email address');
      return;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    try {
      await axios.post('http://localhost:5000/signup', {
        username,
        usn,
        email,
        password,
      });
      toast.success('Signup successful!');
      setTimeout(() => {
        navigate('/');
        document.getElementById('my_modal_1').close();
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="card-body gap-2" onSubmit={handleSubmit}>
      <div className="form-control">
        <input type="text" placeholder="Username" className="input input-bordered border-black" required value={username} onChange={handleUsernameChange} />
      </div>
      <div className="form-control">
        <input type="text" placeholder="USN (1si21csxxx)" className="input input-bordered border-black" required value={usn} onChange={handleUsnChange} />
      </div>
      <div className="form-control">
        <input type="text" placeholder="Email" className="input input-bordered border-black" required value={email} onChange={handleEmailChange} />
      </div>
      <div className="form-control">
        <input type="password" placeholder="Password" className="input input-bordered border-black" required value={password} onChange={handlePasswordChange} />
      </div>
      <div className="form-control mt-4">
        <button type="submit" className="btn btn-success">Submit</button>
      </div>
    </form>
  );
};

export default SignupForm;