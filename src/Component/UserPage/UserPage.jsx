import React, { useState } from 'react';
import SidebarComponent from '../sidebar/SidebarComponent';
import './UserPage.css';
const UserPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    { name: 'Paul', email: 'paul@example.com', role: 'Member' },
    { name: 'Phillip', email: 'xosywimok@mailinator.com', role: 'Member' },
    { name: 'User', email: 'user@example.com', role: 'Member' },
  ]);
  // Form input state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Role-1',
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
    };
    setUsers([...users, newUser]); // Add new user to the state
    setIsModalOpen(false); // Close the modal
    setFormData({ firstName: '', lastName: '', email: '', role: 'Role-1' }); // Reset form
  };

  return (
    <div className="users-page">
      {/* Sidebar */}
      <SidebarComponent />

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>Manage Users</h1>
        </header>

        {/* User Cards */}
        <section className="user-cards">
          {users.map((user, index) => (
            <div className="user-card" key={index}>
              <p className="user-role">{user.role}</p>
              <p className="user-name">{user.name}</p>
              <p className="user-email">{user.email}</p>
            </div>
          ))}
          <div className="new-user-card" onClick={openModal}>
            <p>+ New User</p>
          </div>
        </section>
      </div>

      {/* Modal for Adding New User */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit}>
              <label>
                First Name*
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                  required
                />
              </label>
              <label>
                Last Name*
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  required
                />
              </label>
              <label>
                Email*
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </label>
              <label>
                User Role*
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option>Role-1</option>
                  <option>Role-2</option>
                </select>
              </label>
              <div className="modal-actions">
                <button type="button" onClick={closeModal}>
                  Close
                </button>
                <button type="submit">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPage;
