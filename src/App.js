import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardComponent from './Component/Dashborad/DashboardComponent';
import Login from './Component/Login/Login';
import Profile from './Component/Profile/Profile';
import Employee from './Component/Employee/Employee';
import Register from './Component/Login/Register';
import UsersPage from './Component/UserPage/UserPage';
import RolesPage from './Component/Rolepage/RolePage';
import LocationPage from './Component/Location/LocationPage';
import WorkOrderPage from './Component/Work/WorkOrderPage';
import Assets from './Component/Assets/Assets';
import PartsPage from './Component/Parts/PartsPage';
import Vendor from './Component/Vendor/Vendor';
import AboutUs from './Component/About/AboutUs';
import PrivacyPolicy from './Component/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './Component/TermsAndConditions/TermsAndConditions';
import Add from './Component/AddStock/Add';
function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" index element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path='/employee' element={<Employee/>}/>
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path='/terms' element={<TermsAndConditions/>}/>
        <Route path="/dashboard/*" element={<DashboardComponent />} />
        <Route path='/about' element={<AboutUs/>}/>
        <Route path="/register" element={<Register />} />
        <Route path='/staff/users' element={<UsersPage/>}/>
        <Route path='/profile' element={<Profile/> }/>
        <Route path='/staff/roles' element={<RolesPage/>}/>
        <Route path='/location' element={<LocationPage/>}></Route>
        <Route path='/work-order' element={<WorkOrderPage/>}/>
      <Route path='/stock' element={<Assets/>}/>
      <Route path='/add-stock' element={<Add/>}/>
      <Route path='/stock-out' element={<PartsPage/>}/>
      <Route path='/vendor' element={<Vendor/>}/>
      </Routes>
    </Router>
  );
}

export default App;
