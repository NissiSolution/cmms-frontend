import React from 'react';
import './TermsAndConditions.css' 
import '../Login/Login.css';
import '../Login/Login.css'
import logoImage from '../img/logo.png'
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  return (
    <div className="terms-conditions-page">
       <header className="login-header">
        <div className="logo">
          <img src={logoImage} alt="CMMSGO Logo" />
        </div>
        <nav className="header-links">
          <Link to="/about">About Us</Link>
        <Link to="/terms">Terms and Conditions</Link>
        <Link to="/privacy">Privacy Policy</Link>
        </nav>
        
      </header>
      <main className="terms-content">
        <h1>Terms and Conditions</h1>
        <p>Welcome to Nissi CMMS. Below are the terms and conditions governing your use of our services and website. By accessing or using our services, you agree to these terms.</p>
        
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By using Nissi CMMS, you agree to comply with and be bound by the following terms and conditions. If you do not agree, please refrain from using our services.</p>
        </section>
        
        <section>
          <h2>2. Changes to Terms</h2>
          <p>CMMSGO reserves the right to modify these terms at any time. Continued use of the platform after updates implies acceptance of the revised terms.</p>
        </section>
        
        <section>
          <h2>3. User Responsibilities</h2>
          <p>You agree to use the services for lawful purposes only. You are responsible for maintaining the confidentiality of your account credentials. CMMSGO is not responsible for any misuse or unauthorized access to your account.</p>
        </section>
        
        <section>
          <h2>4. Limitation of Liability</h2>
          <p>Nissi CMMS is not liable for any indirect or consequential damages resulting from the use of our services. We do not guarantee uninterrupted or error-free service.</p>
        </section>
        
        <section>
          <h2>5. Termination</h2>
          <p>CMMSGO may terminate or suspend your account at any time for violating these Terms and Conditions or engaging in harmful or unauthorized activities.</p>
        </section>
        
        <section>
          <h2>6. Governing Law</h2>
          <p>These terms are governed by the laws of [Insert Jurisdiction]. Any disputes will be resolved in the courts of [Insert Location].</p>
        </section>
        
        <section>
          <h2>7. Contact Us</h2>
          <p>If you have any questions or concerns regarding these terms, please contact us at:</p>
          <p>Email: nissicmms@nissi.co.in</p>
        </section>
      </main>
    </div>
  );
};

export default TermsAndConditions;
