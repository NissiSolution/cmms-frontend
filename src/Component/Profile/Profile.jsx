import React, { useState } from 'react';
import './Profile.css'; // Assuming you have a CSS file for styles
 import { useSelector } from "react-redux";
import axios from 'axios';
import SidebarComponent from '../sidebar/SidebarComponent';
const Profile = () => {
  const [view, setView] = useState('personalInfo'); // 'personalInfo' or 'changePassword'
  const userValue = useSelector((state) => state?.user.users)
  const [current,setCurrent]=useState()
  const [newPassword,setNewPassword]=useState()
  const [confirmPassword,setConfirmPassword]=useState()
  console.log(userValue.id)

  const handlePasswordChange = async (e)   => {
    e.preventDefault();
  const currentPasswords=userValue?.password
   if(currentPasswords!==current){
alert('incorrect current password')
return;
   }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

   try{
    const response= await axios.put(`https://cmms-backend-1.onrender.com/api/pass/${userValue?.id}`, {newPassword}, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    });
    console.log(response.data);
    setCurrent('')
    setConfirmPassword('')
    setNewPassword('')
   }catch(err){
    console.log(err);
    
   }
  };

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
                  <input type="text" id="name" value={userValue?.name||""} readOnly />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" value={userValue?.email||""} readOnly/>
                </div>
               
              </form>
            </div>
          )}

          {view === 'changePassword' && (
            <div className="tab-content">
              <h2>Change Password</h2>
              <form  onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label htmlFor="current-password">Current Password</label>
                  <input type="password" id="current-password" value={current} onChange={(e)=>setCurrent(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="new-password">New Password</label>
                  <input type="password" id="new-password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="confirm-password">Confirm New Password</label>
                  <input type="password" id="confirm-password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
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
