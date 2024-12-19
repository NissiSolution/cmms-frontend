import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './DashboardComponent.css';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearUsers } from '../../store/slice';
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
import SidebarComponent from '../sidebar/SidebarComponent';

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
  const [isProfileOpen,setIsProfileOpen]=useState(false)
  const [role, setRole] = useState('');
  const userValue = useSelector((state) => state.user.users)
  const dispatch =useDispatch()

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
;
  
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
  useEffect(()=>{
    setRole(userValue?.role)

  })
  
  const navigate = useNavigate(); // React Router's navigation function

  const handleLogout = () => {
    // Clear user session (e.g., clear tokens or local storage)
    // Redirect to login page
    dispatch(clearUsers)

    navigate('/');
  };

  return (
    <div className="dashboard-page">
   <SidebarComponent/>

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
      {role||`company`} ▽
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
