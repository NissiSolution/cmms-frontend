import React, {  useState } from 'react';
import './Register.css';
import { Link ,useNavigate} from 'react-router-dom';
import logoImage from './logo.png';
import axios from 'axios';

const Register = () => {
  const [data, setData] = useState({
    name: '', email: '', password: '', role: ''
  });
  const [loading, setLoading] = useState(false);  // Loading state
const navigate=useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Start loading

    try {
      const response = await axios.post("https://cmms-backend-1.onrender.com/api/post", data, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      });
      console.log(response.data);
       navigate('/')
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);  // End loading
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  return (
    <div className="register-page">
      <header className="register-header">
        <div className="logo">
          <img src={logoImage} alt="CMMSGO Logo" />
        </div>
        <nav className="header-links">
        <Link to="/about">About Us</Link>
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link>
        </nav>
      </header>

      <main className="register-main">
        <div className="register-container">
          <div className="register-box">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name<span>*</span></label>
              <input type="text" id="name" name='name' value={data.name} onChange={handleChange} required />

              <label htmlFor="email">Email<span>*</span></label>
              <input type="email" id="email" name='email' value={data.email} onChange={handleChange} required />

              <label htmlFor="password">Password<span>*</span></label>
              <input type="password" id="password" name='password' value={data.password} onChange={handleChange} required />

              <label htmlFor="confirmPassword">Confirm Password<span>*</span></label>
              <input type="password" id="confirmPassword" required />

              <label htmlFor="role">Role<span>*</span></label>
              <select id="role" required value={data.role} name='role' onChange={handleChange}>
                <option value="">-- Select Role --</option>
                <option value="superAdmin">Super Admin</option>
                <option value="companyAdmin">Company Admin</option>
                <option value="user">User</option>
              </select>

              <button type="submit" className="register-button">Register</button>
            </form>

            <p>Already have an account? <a href="/">Login</a></p>
          </div>
        </div>
      </main>

      {loading && (
        <div className="loading-popup">
          <div className="popup-content">
          <div className="loading-spinner"></div>
            <p>Loading...</p>
          </div>
        </div>
      )}

      {/* Error Handling */}
     
    </div>
  );
};

export default Register;
