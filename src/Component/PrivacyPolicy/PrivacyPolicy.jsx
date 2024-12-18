import React from 'react';
import '../Login/Login.css'
import logoImage from '../img/logo.png'
import './PrivacyPolicy.css'
import '../Login/Login.css'
import { Link } from 'react-router-dom';
const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
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
      <main className="privacy-content">
        <h1>Privacy Policy</h1>
        <p>CMMSGO values your privacy and is committed to protecting your personal data. Below, we outline how we collect, use, and protect your information.</p>
        
        <section>
          <h2>1. Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>Personal Information: Name, email address, contact number, and company information.</li>
            <li>Usage Data: Information on how you interact with our website and services.</li>
            <li>Cookies: Small data files used to improve user experience.</li>
          </ul>
        </section>
        
        <section>
          <h2>2. How We Use Your Information</h2>
          <p>Your data is used to:</p>
          <ul>
            <li>Provide and improve our services.</li>
            <li>Communicate with you regarding your inquiries or account.</li>
            <li>Personalize your experience on our platform.</li>
          </ul>
        </section>
        
        <section>
          <h2>3. Sharing of Information</h2>
          <p>We do not sell or rent your personal information to third parties. However, we may share data with trusted partners for:</p>
          <ul>
            <li>Analytical purposes.</li>
            <li>Improving our services.</li>
          </ul>
        </section>
        
        <section>
          <h2>4. Data Retention</h2>
          <p>We retain your information for as long as necessary to provide our services or as required by law.</p>
        </section>
        
        <section>
          <h2>5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your data.</li>
            <li>Correct inaccuracies in your information.</li>
            <li>Delete your data (subject to certain conditions).</li>
          </ul>
        </section>
        
        <section>
          <h2>6. Security</h2>
          <p>We take appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, misuse, or alteration.</p>
        </section>
        
        <section>
          <h2>7. Changes to Privacy Policy</h2>
          <p>CMMSGO reserves the right to update this privacy policy. Users will be notified of significant changes through email or by updating this page.</p>
        </section>
        
        <section>
          <h2>8. Governing Law</h2>
          <p>This privacy policy is governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in the courts of [Insert Location].</p>
        </section>
        
        <section>
          <h2>9. Contact Us</h2>
          <p>If you have any questions about our privacy practices or this policy, please contact us at:</p>
          <p>Email: support@cmmsgo.com</p>
          <p>Phone: +91-XXXX-XXXXXX</p>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
