// SidebarComponent.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../img/logo.png';
import './SidebarComponent.css'; // Styles specific to Sidebar
import { useSelector } from 'react-redux';
const SidebarComponent = () => {
  const role=localStorage.getItem('role')
  const userRole=useSelector((state)=>state?.user.userRole)
  
  const checkAllPermissions = (userRole, module, action) => {
    if (!userRole || !userRole.permissions) return false; // Return false if no permissions
  
    // Check if the module exists and includes the action
    return userRole.permissions[module]?.includes(action) || false;
  };
  ;

  // const canDelete=hasPermissionDelete ||(role ==='admin' || role==='companyAdmin') 
  // const hasPermissionEdit=checkAllPermissionss(userRole,'edit')
  const hasPermissionView=checkAllPermissions(userRole,'stockOut','view')
  
  const hasPermissionAdd=checkAllPermissions(userRole,'stock','add')


  const canAdd = hasPermissionAdd || (role === 'admin' || role === 'companyAdmin');
  const canView=hasPermissionView || (role === 'admin' || role === 'companyAdmin');
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Company Logo" />
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" activeClassName="active" className="nav-item">
          Dashboard
        </NavLink>
      {role!=='user'&&(
 <NavLink to="/employee" activeClassName="active" className="nav-item">
 Employee
</NavLink>
      )
      }
       

        <NavLink to="/location" activeClassName="active" className="nav-item">
          Location
        </NavLink>
        <NavLink to="/work-order" activeClassName="active" className="nav-item">
          Work Order
        </NavLink>
        <div className="inventory">
          Inventory
        </div>
        <NavLink to="/stock" activeClassName="active" className="nav-item">
          Stock
        </NavLink>
        {canAdd&&(<>
 <NavLink to="/add-stock" activeClassName="active" className="nav-item">Add Stock</NavLink>
 </>)}
 {canView&&(<>
 <NavLink to="/stock-out" activeClassName="active" className="nav-item">
   Out-Stock
 </NavLink>
 </>
        )}
       
       <div></div>
        <NavLink to="/vendor" activeClassName="active" className="nav-item">
          Vendor
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarComponent;
