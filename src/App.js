import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import DashboardComponent from './Component/Dashborad/DashboardComponent';
import Login from './Component/Login/Login';
import Profile from './Component/Profile/Profile';
import Employee from './Component/Employee/Employee';
import Register from './Component/Login/Register';
import LocationPage from './Component/Location/LocationPage';
import WorkOrderPage from './Component/Work/WorkOrderPage';
import Assets from './Component/Assets/Assets';
import PartsPage from './Component/Parts/PartsPage';
import Vendor from './Component/Vendor/Vendor';
import AboutUs from './Component/About/AboutUs';
import PrivacyPolicy from './Component/PrivacyPolicy/PrivacyPolicy';
import TermsAndConditions from './Component/TermsAndConditions/TermsAndConditions';
import Add from './Component/AddStock/Add';
import RolesPage from './Component/Rolepage/RolePage';
import ExcelImport from './Component/Import-excel/ExcelImport';

function App() {
  const auth = useSelector((state) => state.user?.auth);
  const role = useSelector((state) => state.user?.role);

  const ProtectedRoute = ({ allowedRoles }) => {
    if (!auth) {
      return <Navigate to="/" />;
    }
    if (allowedRoles && !allowedRoles.includes(role)) {
      return <Navigate to="/" />; // Redirect to home or an unauthorized page
    }
    return <Outlet />;
  };

  return (
    <Router>
      <Routes>
        {/* Define routes */}
        <Route path="/" index element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path='/terms' element={<TermsAndConditions />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route element={<ProtectedRoute allowedRoles={['admin', 'user', 'companyAdmin']} />}>
          <Route path="/dashboard/*" element={<DashboardComponent />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/location' element={<LocationPage />} />
          <Route path='/work-order' element={<WorkOrderPage />} />
          <Route path='/stock' element={<Assets />} />
          <Route path='/vendor' element={<Vendor />} />

        </Route>
        <Route element={<ProtectedRoute allowedRoles={['admin', 'user', 'companyAdmin']} />}>
        <Route path='/add-stock' element={<Add />} />
        <Route  path='/excel-add' element={<ExcelImport/>}/>
        <Route path='/stock-out' element={<PartsPage />} />
         </Route>

        {/* Restrict access to specific roles */}
        <Route element={<ProtectedRoute allowedRoles={['admin','companyAdmin']} />}>
          <Route path='/employee' element={<Employee />} />
         
        <Route path="/role" element={<RolesPage/>}/>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;