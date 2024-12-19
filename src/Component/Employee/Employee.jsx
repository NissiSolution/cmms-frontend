import React, { useState } from 'react';
import './Employee.css';
import SidebarComponent from '../sidebar/SidebarComponent';

const Employee = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Doe',
      dept: 'IT',
      skillset: 'React, Node.js',
      recentWorkOrder: 'Fix server issue',
    },
    {
      id: 2,
      name: 'Jane Smith',
      dept: 'HR',
      skillset: 'Recruitment, Employee Engagement',
      recentWorkOrder: 'Onboard new hires',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({});
  const [editIndex, setEditIndex] = useState(null); // Track index for editing

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

  const handleSaveEmployee = () => {
    const updatedEmployees = [...employees];

    if (editIndex !== null) {
      // Update existing employee
      updatedEmployees[editIndex] = currentEmployee;
    } else {
      // Add new employee
      updatedEmployees.push({ ...currentEmployee, id: employees.length + 1 });
    }

    setEmployees(updatedEmployees);
    closeModal();
  };



  return (
    <div className="employee-page">
      <SidebarComponent />
      <div className="main-content">
        <header className="header">
          <h1>Employee</h1>
          <button className="add-btn" onClick={() => openModal()}>
            + Add Employee
          </button>
        </header>

        <div className="employee-table">
          <table>
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Name</th>
                <th>Department</th>
                <th>Skillset</th>
                <th>Recent Work Order</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{employee.id}</td>
                  <td>{employee.name}</td>
                  <td>{employee.dept}</td>
                  <td>{employee.skillset}</td>
                  <td>{employee.recentWorkOrder}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => openModal(employee, index)}
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editIndex !== null ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={(e) => e.preventDefault()}>
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
                Department:
                <input
                  type="text"
                  name="dept"
                  value={currentEmployee.dept || ''}
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

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="save-btn"
                  onClick={handleSaveEmployee}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
