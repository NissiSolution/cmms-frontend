// SidebarComponent.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';
import './SidebarComponent.css'; // Styles specific to Sidebar

const SidebarComponent = () => {
  const [isStaffMenuOpen, setIsStaffMenuOpen] = useState(false); // Dropdown menu state

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Company Logo" />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" activeClassName="active" className="nav-item">
          Dashboard
        </NavLink>

        <div>
          <div
            className={`nav-item nav-staff${isStaffMenuOpen ? 'active' : ''}`}
            onClick={() => setIsStaffMenuOpen(!isStaffMenuOpen)}
            activeClassName="active"   >
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
  );
};

export default SidebarComponent;
