import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './DashboardComponent.css';
import logo from '../img/logo.png';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardComponent = () => {
  const [isStaffMenuOpen, setIsStaffMenuOpen] = useState(false); // State to manage Staff menu dropdown
  const [isProfileOpen,setIsProfileOpen]=useState(false)
  const [role, setRole] = useState('');
  const lineChartData = {
    labels: ['April', 'May', 'June', 'July', 'August', 'September'],
    datasets: [
      {
        label: 'Work Order Overview',
        data: [10, 30, 20, 40, 50, 30],
        borderColor: 'rgba(255, 223, 90, 1)', // Bright gold for the line
        backgroundColor: 'rgb(255, 223, 90)', // Transparent gold fill
        tension: 0.4,
      },
    ],
  };
  useEffect(() => {
    const userRole = localStorage.getItem('userRole'); // Assuming role is stored as 'role'
    setRole(userRole);
  }, []);
  
  const doughnutChartData = {
    labels: ['Pending', 'Complete'],
    datasets: [
      {
        label: 'Total Work Order',
        data: [40, 60],
        backgroundColor: ['rgba(255, 69, 0, 0.6)', 'rgba(0, 128, 0, 0.6)'], // Adjusted Red for Pending, Green for Complete
        borderColor: ['rgba(255, 69, 0, 1)', 'rgba(0, 128, 0, 1)'], // Border color matches the background
        borderWidth: 1,
      },
    ],
  };
  
  
  const navigate = useNavigate(); // React Router's navigation function

  const handleLogout = () => {
    // Clear user session (e.g., clear tokens or local storage)
    localStorage.clear();
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <aside className="sidebar">
  <div className="sidebar-logo">
    <img src={logo} alt="NissiLogo" />
  </div>
  <nav className="sidebar-nav">
    <NavLink to="/dashboard" activeClassName="active" className="nav-item">
      Dashboard
    </NavLink>
 
    <div>
      <div
        className={`nav-item ${isStaffMenuOpen ? 'active' : ''}`}
        onClick={() => setIsStaffMenuOpen(!isStaffMenuOpen)}
        activeClassName="active" >
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
      <header className="dashboard-header">
      <h1>Dashboard </h1>
      <div className="user-menu">
  <div className="user-profile">
    <FontAwesomeIcon icon={faUserCircle} size="2x" className="profile-icon" />
    <div
      className="company-dropdown"
      onClick={() => setIsProfileOpen(!isProfileOpen)}
      style={{ cursor: 'pointer' }}
    >
      {role} ▽
    </div>
    {isProfileOpen && (
      <ul className="dropdown-menu">
        <li onClick={() => navigate('/profile')} className="dropdown-item">
          <FontAwesomeIcon icon={faUserCircle} /> Profile
        </li>
        <li onClick={handleLogout} className="dropdown-item">
          <FontAwesomeIcon icon={faPowerOff} /> Logout
        </li>
      </ul>
    )}
  </div>
</div>

    </header>
    {role === 'superAdmin' ? (
          <>
            <section className="dashboard-stats">
              <div className="stat-card">
                <h3>Total Users</h3>
                <p>3 Users</p>
              </div>
              <div className="stat-card">
                <h3>Total Orders</h3>
                <p>72 Orders</p>
              </div>
              <div className="stat-card">
                <h3>Most Purchased Plan</h3>
                <p>Gold</p>
              </div>
            </section>
            <section className="chart-section">
              <h3>Recent Orders</h3>
              <Line data={lineChartData} />
            </section>
          </>
        ) : (<>

        {/* Dashboard Stats */}
        <section className="dashboard-stats">
          <div className="stat-card blue">
            <h3>Total Open Work Order</h3>
            <p>3</p>
          </div>
          <div className="stat-card blue">
            <h3>Total Complete Work Order</h3>
            <p>2</p>
          </div>
          <div className="stat-card blue">
            <h3>Total Assets</h3>
            <p>5</p>
          </div>
       
        </section>

        {/* Charts Section */}
        <section className="dashboard-charts">
          <div className="chart-card">
            <h3>Work Order Overview</h3>
            <Line data={lineChartData} />
          </div>
          <div className="chart-card">
            <h3>Total Work Order</h3>
            <Doughnut data={doughnutChartData} />
          </div>
        </section>

        {/* Recent Work Orders */}

        <section className="recent-work-orders">
          <h3>Work Orders</h3>
          <table className="work-order-table">
            <thead>
              <tr>
                <th>Due Date</th>
                <th>Status</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2021-11-16</td>
                <td>Pending</td>
                <td>Jolene Ray</td>
              </tr>
              <tr>
                <td>2022-03-03</td>
                <td>Completed</td>
                <td>Water System Flush</td>
              </tr>
            </tbody>
          </table>
        </section></>)}
      </main>
    </div>
  );
};

export default DashboardComponent;
