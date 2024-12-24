import React, { useState, useEffect } from 'react';
import './Employee.css';
import SidebarComponent from '../sidebar/SidebarComponent';
import axios from 'axios';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
const [selectedDate, setSelectedDate] = useState('');

  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [workOrders, setWorkOrders] = useState([]);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [attendance,setAttendance]=useState()
  const [isAttendancePopupOpen, setIsAttendancePopupOpen] = useState(false);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeResponse = await axios.get('https://cmms-backend-1.onrender.com/api/emp/get', {
          withCredentials: true,
        });
        setEmployees(employeeResponse.data);

        await fetchRecentWorkOrders();
        await getAttendance()
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
  }, [employees]);
 
  const fetchRecentWorkOrders = async () => {
    try {
      const workResponse = await axios.get('https://cmms-backend-1.onrender.com/api/work/get', {
        withCredentials: true,
      });
      setWorkOrders(workResponse.data);
    } catch (err) {
      console.error('Error fetching recent work orders:', err);
    }
  };

  const openModal = (employee = {}, index = null) => {
    setCurrentEmployee(employee);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee({});
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        const response = await axios.put(
          `https://cmms-backend-1.onrender.com/api/emp/${currentEmployee.id}`,
          currentEmployee,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        const updatedEmployees = [...employees];
        updatedEmployees[editIndex] = response.data;
        setEmployees(updatedEmployees);
      } else {
        const response = await axios.post(
          'https://cmms-backend-1.onrender.com/api/emp/post',
          currentEmployee,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );
        setEmployees((prev) => [...prev, response.data]);
      }
      closeModal();
    } catch (err) {
      console.error('Error saving employee:', err);
    }
  };

  const openAttendanceModal = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setIsAttendanceModalOpen(true);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceModalOpen(false);
    setSelectedEmployeeId(null);
    setAttendanceStatus('Present');
  };

  const markAttendance = async () => {
    try {
      const response = await axios.post(
        'https://cmms-backend-1.onrender.com/api/emp/atd',
        { employee_Id: selectedEmployeeId, status: attendanceStatus },
        { withCredentials: true }

      );
      if (response.status === 200) {
        console.log('Attendance marked successfully');
      }
      closeAttendanceModal();
    } catch (error) {
      console.error('Error marking attendance:', error);
    }
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
  }   ; 
  
  const openAttendancePopup = () => {
    setIsAttendancePopupOpen(true);
  };


  

  return (
    <div className="employee-page">
      <SidebarComponent />
      <div className="main-content">
        <header className="header">
          <h1>Employee</h1>
          <div>
          <button className="add-btn" onClick={() => openModal()}>
            + Add Employee
          </button>
          <button className="add-btn att-btn" onClick={() => openAttendancePopup()}>
          View Attendance

          </button>
          </div>
        </header>

        <div className="employee-table">
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th>Name</th>
                <th>EmployeeID</th>
                <th>Department</th>
                <th>Today Attendance</th>
                <th>Skillset</th>
                <th>Recent Work Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {employees?.map((employee, index) => {
  const assignedWorkOrder = workOrders.find(work => work.assigned === employee.name);
  const recentWorkOrder = assignedWorkOrder ? assignedWorkOrder.name : 'N/A';

  // Get today's date in the same format as your attendance records
  const todayDate = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD

  // Filter attendance records for the current employee
  const att = attendance?.filter(att => att.employee_id === employee.id);
   
  // Find today's attendance record
  const todayAttendance = att?.find(record => formatDate (record.date) === todayDate);

  // Determine the status based on today's attendance record
  const sta = todayAttendance ? todayAttendance.status : 'absent';

  return (
    <tr key={employee.id}>
      <td>{employee.id}</td>
      <td>{employee.name}</td>
      <td>{employee.emp_id}</td>

      <td>{employee.department}</td>
      <td>{sta}</td>
      <td>{employee.skillset}</td>
      <td>{recentWorkOrder}</td>
      <td>
        <button
          className="edit-btn"
          onClick={() => openModal(employee, index)}
        >
          Edit
        </button>
        <button
          className="attendance-btn"
          onClick={() => openAttendanceModal(employee.id)}
        >
          Mark Attendance
        </button>
      </td>
    </tr>
  );
})}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editIndex !== null ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentEmployee.name || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                EmployeeID
                <input
                  type="text"
                  name="emp_id"
                  value={currentEmployee.emp_id || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Department:
                <input
                  type="text"
                  name="department"
                  value={currentEmployee.department || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
  Date of Join:
  <input
    type="date"
    name="dateofjoin"
    value={
      currentEmployee.dateofjoin
        ? new Date(currentEmployee.dateofjoin).toISOString().split('T')[0]
        :'' }
    onChange={handleInputChange}
    required
  />
</label>
              <label>
                Skillset:
                <input
                  type="text"
                  name="skillset"
                  value={currentEmployee.skillset || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={currentEmployee.email || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={currentEmployee.phone || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAttendanceModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Mark Attendance</h2>
            <p>Select attendance status for this employee:</p>
            <div className="attendance-options">
              <label>
                <input
                  type="radio"
                  name="attendanceStatus"
                  value="Present"
                  checked={attendanceStatus === 'Present'}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                />
                Present
              </label>
              <label>
                <input
                  type="radio"
                  name="attendanceStatus"
                  value="Absent"
                  checked={attendanceStatus === 'Absent'}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                />
                Absent
              </label>
            </div>
            <div className="modal-actions">
              <button type="button" className="cancel-btn" onClick={closeAttendanceModal}>
                Cancel
              </button>
              <button type="button" className="save-btn" onClick={markAttendance}>
                Save Attendance
              </button>
            </div>
          </div>
        </div>
      )}
            {isAttendancePopupOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <h2>View Attendance</h2>
      <p>Select an employee to view their attendance details.</p>
      
      <label>
        Select Employee:
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Select Employee --</option>
          {employees?.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        Filter by Date:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <table className="attendance-popup-table">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance
            ?.filter((record) => {
              const isEmployeeMatch = selectedEmployee
                ? record.employee_id === parseInt(selectedEmployee)
                : true;
              const isDateMatch = selectedDate
                ? new Date(record.date).toISOString().split('T')[0] === selectedDate
                : true;
              return isEmployeeMatch && isDateMatch;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((record, index) => {
              const trimmedDate = new Date(record.date)?.toISOString()?.split('T')[0];
              const employeeName = employees.find((emp) => emp.id === record.employee_id)?.name || "Unknown";
              return (
                <tr key={index}>
                  <td>{employeeName}</td>
                  <td>{trimmedDate}</td>
                  <td>{record.status}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className="modal-actions">
        <button onClick={() => setIsAttendancePopupOpen(false)}>Close</button>
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default Employee;
