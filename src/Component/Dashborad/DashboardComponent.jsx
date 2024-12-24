import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import {  useNavigate } from 'react-router-dom';
import './DashboardComponent.css';
import {  useDispatch, useSelector } from "react-redux";
import { clearUsers,setAuth,setRole } from '../../store/slice';
import { Line, Doughnut } from 'react-chartjs-2';

import axios from 'axios';
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
    const role = localStorage.getItem('role') || null; 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [employees,setEmp]=useState()
  const [assets,setAssets]=useState()
  const [workOrders,setWorkOrders]=useState()
  const [attendance,setAttendance]=useState()
  const today = new Date();
  const userValue = useSelector((state) => state.user?.users)
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0'); 

const formattedDate = `${day}-${month}-${year}`;
console.log(`Formatted date: ${formattedDate}`); 
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

 const attendanceToday=attendance?.filter(att=>(
  formatDate(att.date)===formattedDate
 ))


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
  const getAttendance= async()=>{
    try {
      const response= await axios.get('https://cmms-backend-1.onrender.com/api/emp/atd/get', {
        withCredentials: true,
      });
      setAttendance(response.data);
    } catch (err) {
      console.error('Error fetching recent work orders:', err);
    }
  }  
  
  useEffect(()=>{
    const fetchEmp=async()=>{
      try {
        const employeeResponse = await axios.get('https://cmms-backend-1.onrender.com/api/emp/get', {
          withCredentials: true,
        });
        setEmp(employeeResponse.data);
  
        await getAttendance()
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    }
    fetchEmp()
    const fetchAssets = async () => {
      try {
        const response = await axios.get(
          "https://cmms-backend-1.onrender.com/api/assets/get"
        );
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
    const fetchWorkOrders = async () => {
      try {
        const response = await axios.get('https://cmms-backend-1.onrender.com/api/work/get');
        setWorkOrders(response.data);
      } catch (error) {
        console.error('Error fetching work orders:', error);
      }
    };    fetchWorkOrders();
    

  },[])
 // Ensure it updates when userValue changes

  const handleLogout = () => {
    localStorage.removeItem('auth'); // Clear auth state
    localStorage.removeItem('role'); // Clear role state
    dispatch(clearUsers());
    dispatch(setAuth(false)); // Set auth to false on logout
    dispatch(setRole(null));
    navigate('/');
  };
 const Pending=workOrders?.filter(work=>work.status==='Open')
 const Complete=workOrders?.filter(work=>work.status==='Complete')
 const getEmail=employees?.find(user=>user.email === userValue?.email)?.name 
 const getUserDetails=workOrders?.filter(user=>user.assigned === getEmail)
 
 
  return (
    <div className="dashboard-page">
      <SidebarComponent />

      {/* Main Content */}
      <main className="main-content">
        <header className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-menu">
            <div className="user-profile">
              <FontAwesomeIcon icon={faUserCircle} size="2x" className="profile-icon" />
              <div
                className="company-dropdown"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                style={{ cursor: 'pointer' }}
              >
                {userValue?.name || `user`} ▽
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

        {role === 'admin' ? (
          <>
            <section className="dashboard-stats">
            
              <div className="stat-card">
                <h3>Total Employee</h3>
                <p>{employees?.length||20}</p>
              </div>
              <div className="stat-card">
                <h3>Total Employee Present Today</h3>
                <p>{attendanceToday?.length||20}</p>
              </div>
            </section>
            <section className="chart-section">
              <h3>Recent Orders</h3>
              <Line data={lineChartData} />
            </section>
          </>
        ) : role==='user'?(<>
        <section className="dashboard-stats">
              <div className="stat-card blue">
               <h3>Total Assign Work Order</h3>
               <p>{getUserDetails?.length}</p>
              </div>
              <div className="stat-card blue">
                <h3>Total Open Work Order</h3>
                <p>{getUserDetails?.filter(user=>user.status === 'Open').length||2}</p>
              </div>
              <div className="stat-card blue">
                <h3>Total Complete Work Order</h3>
                <p>{getUserDetails?.filter(user=>user.status ==='Complete').length||2}</p>
              </div>
            </section>
        </>): (
          <>
            {/* Dashboard Stats */}
            <section className="dashboard-stats">
              <div className="stat-card blue">
                <h3>Total Open Work Order</h3>
                <p>{Pending?.length||2}</p>
              </div>
              <div className="stat-card blue">
                <h3>Total Complete Work Order</h3>
                <p>{Complete?.length||3}</p>
              </div>
              <div className="stat-card blue">
                <h3>Total Assets</h3>
                <p>{assets?.length||5}</p>
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

          </>
        )}
      </main>
    </div>
  );
};

export default DashboardComponent;
