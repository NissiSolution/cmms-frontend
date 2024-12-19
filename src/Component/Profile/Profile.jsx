import React, { useState } from 'react';
import './Profile.css'; // Assuming you have a CSS file for styles
import { useSelector } from "react-redux";

import SidebarComponent from '../sidebar/SidebarComponent';
const Profile = () => {
  const [view, setView] = useState('personalInfo'); // 'personalInfo' or 'changePassword'
  const userValue = useSelector((state) => state.user.users)
  return (
    <div className="profile-page">
      {/* Sidebar */}
    <SidebarComponent/>

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
                  <label htmlFor="name" >Name</label>
                  <input type="text" id="name" value={userValue?.name||""} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" value={userValue?.email||""}/>
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
