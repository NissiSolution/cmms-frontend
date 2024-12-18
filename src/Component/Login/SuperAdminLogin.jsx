// SuperAdminLogin.jsx
import React from 'react';
import './Login.css';

const SuperAdminLogin = () => {
  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <h2>Super Admin Login</h2>
          <form>
            <label htmlFor="email">Email<span>*</span></label>
            <input type="email" id="email" required />
            
            <label htmlFor="password">Password<span>*</span></label>
            <input type="password" id="password" required />
            
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
