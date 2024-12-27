import React, { useState, useEffect } from 'react';
import './Employee.css';
import SidebarComponent from '../sidebar/SidebarComponent';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [editID,setEditId]=useState()
  const [workOrders, setWorkOrders] = useState([]);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [isAttendancePopupOpen, setIsAttendancePopupOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEmployeeDetails, setSelectedEmployeeDetails] = useState({});
  const [empPhoto, setEmpPhoto] = useState(null); // State for employee photo
  const [roles,setRoles]=useState()
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };
  const getRole= async()=>{
    const response=await axios.get('https://cmms-backend-1.onrender.com/api/roles',{
      withCredentials: true,
    })
    const parsedRoles = response.data.map(role => ({
      ...role,
      permissions: typeof role.permissions === "string" ? JSON.parse(role.permissions) : role.permissions,
    }));
    setRoles(parsedRoles);
  }
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format
    setSelectedDate(today);
    const fetchEmployees = async () => {
      try {
        const employeeResponse = await axios.get('https://cmms-backend-1.onrender.com/api/emp/get', {
          withCredentials: true,
        });
        setEmployees(employeeResponse.data);
        await fetchRecentWorkOrders();
        await getAttendance();
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchEmployees();
     getRole()
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

  const openModal = (employee={},index=null) => {
  
    setEditIndex(index);
    setIsModalOpen(true);
    setEmpPhoto(null); // Reset photo state when opening modal
    if (employee) {
      setCurrentEmployee(employee);

      const foundEmployee = employees?.find(emp => emp.emp_id === employee.emp_id);
      if (foundEmployee) {
          setEditId(foundEmployee?.id);
      } else {
          setEditId(null);
      }
  } else {
      setEditId(null); 
  }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEmployee({});
    setEditIndex(null);
    setEmpPhoto(null); // Reset photo state when closing modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'emp_id') {
      checkUniqueEmpId(value);
    }

  };
  const checkUniqueEmpId = (empId) => {
    const isUniqueId = !employees.some((employee) => employee.emp_id === empId);
    setIsUnique(isUniqueId);
  };
  const [isUnique, setIsUnique] = useState(true);

  const handlePhotoChange = (e) => {
    setEmpPhoto(e.target.files[0]); // Set the selected file
  };

console.log(currentEmployee.role);


const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object

    // Check if we are editing or creating
    if (editIndex !== null) {
        // Update existing employee

        if (!editID) {
            console.error("Employee not found");
            return;
        }

        // Append employee data to FormData
        formData.append('_method', 'PUT'); // Simulate PUT request for PHP
        formData.append('id', editID); // Include the employee ID
        formData.append('name', currentEmployee.name);
        formData.append('emp_id', currentEmployee.emp_id);
        formData.append('department', currentEmployee.department);
        formData.append('dateofjoin', currentEmployee.dateofjoin);
        formData.append('skillset', currentEmployee.skillset);
        formData.append('email', currentEmployee.email);
        formData.append('phone', currentEmployee.phone);
        formData.append('password', currentEmployee.password);
        formData.append('role',currentEmployee.role)

        if (empPhoto) {
            formData.append('emp_photo', empPhoto); // Include photo if provided
        }

        try {
            const response = await axios.post(
                'https://nissicmms.digidiary.in/api/emp_api.php',
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );


            if (response.data.message) {
                // Update the employees state with the new data
                const updatedEmployees = [...employees];
                updatedEmployees[editIndex] = { ...editID, ...currentEmployee };
                setEmployees(updatedEmployees);
                console.log("Employee updated successfully");
            } else {
                console.error('Error updating employee:', response.data.error);
            }
        } catch (error) {
            console.error("Error updating employee:", error);
        }
    } else {
        // Create new employee
        // Append employee data to FormData
        formData.append('name', currentEmployee.name);
        formData.append('emp_id', currentEmployee.emp_id);
        formData.append('department', currentEmployee.department);
        formData.append('dateofjoin', currentEmployee.dateofjoin);
        formData.append('skillset', currentEmployee.skillset);
        formData.append('email', currentEmployee.email);
        formData.append('phone', currentEmployee.phone);
        formData.append('password', currentEmployee.password);
        formData.append('role',currentEmployee.role)

        if (empPhoto) {
            formData.append('emp_photo', empPhoto); // Include photo if provided
        }

        try {
            const response = await axios.post(
                'https://nissicmms.digidiary.in/api/emp_api.php',
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );


            console.log(response.data);
              const data={
                name:currentEmployee.name,
                email:currentEmployee.email,
                password:currentEmployee.password,
                role:'user'
              }
            if (response.data.message) {
                // Add the new employee to the state
                setEmployees(prev => [...prev, response.data]);
                console.log("Employee created successfully");


                 await axios.post("https://cmms-backend-1.onrender.com/api/post", data, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  withCredentials: true
                })

            } else {
                console.error('Error creating employee:', response.data.error);
            }
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    }

    // Close the modal after submission
    closeModal();
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

  const getAttendance = async () => {
    try {
      const response = await axios.get('https://cmms-backend-1.onrender.com/api/emp/atd/get', {
        withCredentials: true,
      });
      setAttendance(response.data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
    }
  };


  const openAttendancePopup = () => {
    setIsAttendancePopupOpen(true);
  };

  const openDetailsModal = (employee) => {
    setSelectedEmployeeDetails(employee);
    setIsDetailsModalOpen(true);
  };

  const closeDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedEmployeeDetails({});
  };
const navigate=useNavigate();
  return (
    <div className="employee-page">
      <SidebarComponent />
      <div className="main-content">
        <header className="header">
          <h1>Employee</h1>
          <div>
          <button className="add-btn role-btn" onClick={() => navigate('/role') }>
              + Add Role
            </button>
            <button className="add-btn" onClick={() => openModal()}>
              + Add Employee
            </button>
            <button className="add-btn att-btn" onClick={() => openAttendancePopup()}>
              View Attendance
            </button>
          </div>
        </header>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by Name or Employee ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="employee-table">
          <table>
            <thead>
              <tr>
                <th className='slno'>SLNO</th>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Department</th>
                <th>Today's Status</th>
                <th>Skill Set</th>
                <th>Recent Work Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees
                ?.filter(employee => {
                  const lowerCaseQuery = searchQuery?.toLowerCase();                  
                  return (
                   ( employee.name &&employee.name.toLowerCase()?.includes(lowerCaseQuery)) ||
                    (employee.emp_id &&employee.emp_id.toLowerCase()?.includes(lowerCaseQuery))
                  );
                })
                ?.map((employee, index) => {
                  const assignedWorkOrder = workOrders.find(work => work.assigned === employee.name);
                  const recentWorkOrder = assignedWorkOrder ? assignedWorkOrder.name : 'N/A';

                  const todayDate = new Date().toISOString().split('T')[0];
                  const att = attendance?.filter(att => att.employee_id === employee.id);
                  const todayAttendance = att?.find(record => formatDate(record.date) === todayDate);
                  const sta = todayAttendance ? todayAttendance.status : 'Absent';

                  return (
                    <tr key={employee.id}>
                      <td className='slno'>{index+1}</td>
                      <td className='name'>{employee.name}</td>
                      <td>{employee.emp_id}</td>
                      <td>{employee.department}</td>
                      <td>{sta}</td>
                      <td>{employee.skillset}</td>
                      <td>{recentWorkOrder}</td>
                      <td className='btn-td'>
                        <button className="btn-view" onClick={() => openDetailsModal(employee)}>
                          View Details
                        </button>
                        <button className="edit-btn" onClick={() => openModal(employee, index)}>
                          Edit
                        </button>
                        <button className="attendance-btn" onClick={() => openAttendanceModal(employee.id)}>
                          Attendance
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing Employee */}
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
                Employee ID:
                <input
                  type="text"
                  name="emp_id"
                  value={currentEmployee.emp_id || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>
              {!isUnique && (
        <p style={{ color: 'red' }}>This Employee ID is already in use. Please choose a unique ID.</p>
      )}
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
                  value={currentEmployee.dateofjoin ? new Date(currentEmployee.dateofjoin).toISOString().split('T')[0] : ''}
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
  Set Role:
  <select
    name="role"
    value={currentEmployee.role || ''}
    onChange={handleInputChange}
    required
  >
    <option value="" disabled>
      Select Role
    </option>
    {roles?.map((emp) => (
      <option key={emp.id} value={emp.name}>
        {emp.name}
      </option>
    ))}
  </select>
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
              {editIndex===null && (
          <label>
            Create Password:
            <input
              type="password"
              name="password"
              value={currentEmployee.password || ''}
              onChange={handleInputChange}
              required
            />
          </label>
        )}
              <label>
                Employee Photo:
                <input
                  type="file"
                  name="emp_photo"
                  accept="image/*"
                  onChange={handlePhotoChange} // Handle photo change
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

      {/* Modal for Marking Attendance */}
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

      {/* Modal for Viewing Attendance */}
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
                        <td className={`${record.status==='Present'?'present':'absent'}`}>{record.status}</td>
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

      {/* Modal for Viewing Employee Details */}
      {isDetailsModalOpen && (
  <div className="modal-overlay">
    <div className="modal emp_model">
      <h2>Employee Details</h2>
      <div className="employee-details">
        <div className="details-left">
          <p><strong>Name:</strong> {selectedEmployeeDetails.name}</p>
          <p><strong>Employee ID:</strong> {selectedEmployeeDetails.emp_id}</p>
          <p><strong>Department:</strong> {selectedEmployeeDetails.department}</p>
          <p><strong>Date of Join:</strong> {formatDate(selectedEmployeeDetails.dateofjoin)}</p>
          <p><strong>Skillset:</strong> {selectedEmployeeDetails.skillset}</p>
          <p><strong>Email:</strong> {selectedEmployeeDetails.email}</p>
          <p><strong>Phone:</strong> {selectedEmployeeDetails.phone}</p>
        </div>
        <div className="details-right">
          <figure>
            <img 
              src={selectedEmployeeDetails.emp_photo 
                ? `https://nissicmms.digidiary.in/api/${selectedEmployeeDetails.emp_photo}` 
                : `https://nissicmms.digidiary.in/api/uploads/user.png`} // Path to your default profile icon
              alt={`${selectedEmployeeDetails.name}`} 
              className="employee-photo" 
            />
          </figure>
        </div>
      </div>
      <div className="modal-actions">
        <button onClick={closeDetailsModal}>Close</button>
      </div>
      
    </div>
  </div>
)}
    </div>
  );
}

export default Employee;