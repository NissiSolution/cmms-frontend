// SidebarComponent.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';
import './SidebarComponent.css'; // Styles specific to Sidebar

const SidebarComponent = () => {

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Company Logo" />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" activeClassName="active" className="nav-item">
          Dashboard
        </NavLink>

        <NavLink to="/employee" activeClassName="active" className="nav-item">
          Employee
        </NavLink>

        <NavLink to="/location" activeClassName="active" className="nav-item">
          Location
        </NavLink>
        <NavLink to="/work-order" activeClassName="active" className="nav-item">
          Work Order
        </NavLink>
        <div className="inventory">
          Inventory
        </div>
        <NavLink to="/assets" activeClassName="active" className="nav-item">
          View
        </NavLink>
        <NavLink to="/parts" activeClassName="active" className="nav-item">
          Parts
        </NavLink>
       <div></div>
        <NavLink to="/vendor" activeClassName="active" className="nav-item">
          Vendor
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarComponent;
