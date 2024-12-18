import React, { useState } from 'react';
import './Profile.css'; // Assuming you have a CSS file for styles
import { NavLink } from 'react-router-dom';

import logo from '../img/logo.png'
const Profile = () => {
  const [view, setView] = useState('personalInfo'); // 'personalInfo' or 'changePassword'
  const [isStaffMenuOpen, setIsStaffMenuOpen] = useState(false); // State to manage Staff menu dropdown

  return (
    <div className="profile-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header sidebar-logo">
          <img src={logo} alt="Logo" className="sidebar-logo" />
        </div>
        <nav className="sidebar-nav">
    <NavLink to="/dashboard" activeClassName="active" className="nav-item">
      Dashboard
    </NavLink>
 
    <div>
      <div
        className={`nav-item ${isStaffMenuOpen ? 'active' : ''}`}
        onClick={() => setIsStaffMenuOpen(!isStaffMenuOpen)}
      >
        Staff
      </div>
      {isStaffMenuOpen && (
        <div className="submenu">
          <NavLink to="/staff/users" activeClassName="active" className="nav-item">
            Users
          </NavLink>
          <NavLink to="/staff/roles" activeClassName="active" className="nav-item">
            Roles
          </NavLink>
        </div>
      )}
    </div>
    <NavLink to="/location" activeClassName="active" className="nav-item">
      Location
    </NavLink>
    <NavLink to="/work-order" activeClassName="active" className="nav-item">
      Work Order
    </NavLink>
    <NavLink to="/assets" activeClassName="active" className="nav-item">
      Assets
    </NavLink>
    <NavLink to="/parts" activeClassName="active" className="nav-item">
      Parts
    </NavLink>
    <NavLink to="/vendor" activeClassName="active" className="nav-item">
      Vendor
    </NavLink>
    
    
  </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>User Profile</h1>

        <div className="profile-container">
          {/* Navigation Tabs */}
          <div className="profile-tabs">
            <button
              className={view === 'personalInfo' ? 'active-tab' : ''}
              onClick={() => setView('personalInfo')}
            >
              Personal Info
            </button>
            <button
              className={view === 'changePassword' ? 'active-tab' : ''}
              onClick={() => setView('changePassword')}
            >
              Change Password
            </button>
          </div>

          {/* Tab Content */}
          {view === 'personalInfo' && (
            <div className="tab-content">
              <h2>Personal Information</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" defaultValue="" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" defaultValue="" />
                </div>
                <div className="form-group">
                  <label htmlFor="profile-picture">Profile Picture</label>
                  <input type="file" id="profile-picture" />
                </div>
                <button type="submit" className="save-button">Save Changes</button>
              </form>
            </div>
          )}

          {view === 'changePassword' && (
            <div className="tab-content">
              <h2>Change Password</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="current-password">Current Password</label>
                  <input type="password" id="current-password" />
                </div>
                <div className="form-group">
                  <label htmlFor="new-password">New Password</label>
                  <input type="password" id="new-password" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm New Password</label>
                  <input type="password" id="confirm-password" />
                </div>
                <button type="submit" className="save-button">Save Changes</button>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;
