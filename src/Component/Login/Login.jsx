import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import logoImage from './logo.png';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false); // State for loading spinner

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError('');
    setLoading(true); // Show loading spinner
    
    try {

      const user = data.find((user) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('userRole', user.role);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred while logging in.");
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  const getDate = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://cmms-backend-g16v.onrender.com/api/get", {
        headers: { 'Cache-Control': 'no-cache' },
      });
      setData(response.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setData(null); // Clear state on failure
    } finally {
      setLoading(false);
    }
  };
  
console.log(data);

  useEffect(() => {
    getDate();
    
},[]);

  return (
    <div className="login-page">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
      <header className="login-header">
        <div className="logo">
          <img src={logoImage} alt="CMMSGO Logo" />
        </div>
        <nav className="header-links">
          <Link to="/about">About Us</Link>
          <Link to="/terms">Terms and Conditions</Link>
          <Link to="/privacy">Privacy Policy</Link>
        </nav>
        <select className="language-selector">
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
      </header>

      <main className="login-main">
        <div className="login-container">
          <div className="login-box">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">
                Email<span>*</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="password">
                Password<span>*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="forgot-password">
                <p>Forgot Your Password?</p>
              </div>
              <button type="submit" className="login-button">
                Login
              </button>
              <div className="login-options">
              <button className="login-option-button">Super Admin Login</button>
              <button className="login-option-button">Company Login</button>
              <button className="login-option-button">User Login</button>
            </div>
            </form>
           
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
