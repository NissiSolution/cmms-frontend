import React from 'react';
import '../Login/Login.css'
import './About.css'
import logoImage from '../img/logo.png'
import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div>
      {/* Shared Header */}
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
      {/* Main Content */}
      <main className="about-us-main">
        <div className="about-us-container">
          <h2>About Us</h2>
          <p>
            Welcome to Nissi CMMS! At CMMS, we strive to provide robust solutions for 
            modern facility and maintenance management needs. 
            Our mission is to empower organizations to efficiently manage 
            operations with innovative and user-friendly tools.
          </p>
          <p>
            With a team of highly dedicated professionals, we focus on delivering 
            reliable solutions that help streamline processes, improve productivity, 
            and enable organizations to meet their goals effectively.
          </p>
          <p>
            Our software is designed with simplicity and scalability in mind, ensuring 
            that it meets the requirements of businesses both small and large.
          </p>
          <h3>Our Vision</h3>
          <p>
            To revolutionize the way organizations handle operations through 
            cutting-edge technology and excellent support.
          </p>
          <h3>Our Values</h3>
          <ul>
            <li>Innovation</li>
            <li>Reliability</li>
            <li>Customer Focus</li>
            <li>Collaboration</li>
            <li>Integrity</li>
          </ul>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
