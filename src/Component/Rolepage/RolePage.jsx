import React, { useState } from 'react';
import SidebarComponent from '../sidebar/SidebarComponent';
import './RolePage.css';

const RolesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([
    {
      name: 'Role-1',
      permissions: [
        'manage assets',
        'create assets',
        'edit assets',
        'manage parts',
        'create parts',
        'edit parts',
        'manage pms',
        'manage vendor',
        'manage pos',
        'manage wos',
        'manage logtime',
      ],
    },
  ]);

  const [newRole, setNewRole] = useState({
    name: '',
    permissions: [],
  });

  const [permissionInput, setPermissionInput] = useState('');

  // Modal Control
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle Role Input
  const handleInputChange = (e) => {
    setNewRole({ ...newRole, name: e.target.value });
  };

  // Handle Permission Addition
  const addPermission = () => {
    if (permissionInput.trim()) {
      setNewRole((prev) => ({
        ...prev,
        permissions: [...prev.permissions, permissionInput],
      }));
      setPermissionInput('');
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRole.name && newRole.permissions.length > 0) {
      setRoles([...roles, newRole]);
      setNewRole({ name: '', permissions: [] }); // Reset form
      setIsModalOpen(false);
    }
  };

  // Delete Role
  const deleteRole = (index) => {
    const updatedRoles = roles.filter((_, i) => i !== index);
    setRoles(updatedRoles);
  };

  return (
    <div className="roles-page">
      <SidebarComponent />

      <div className="main-content">
        <header className="header">
          <h1>Manage Roles</h1>
        </header>

        {/* Roles List as a Table */}
        <section className="roles-list">
          <table>
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={index}>
                  <td>{role.name}</td>
                  <td>
                    {role.permissions.map((perm, i) => (
                      <span key={i} className="permission-tag">
                        {perm}
                      </span>
                    ))}
                  </td>
                  <td className="actions">
                    <button className="delete-btn" onClick={() => deleteRole(index)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="new-role-card" onClick={openModal}>
            <p>+ New Role</p>
          </div>
        </section>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create New Role</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Role Name*
                <input
                  type="text"
                  value={newRole.name}
                  onChange={handleInputChange}
                  placeholder="Enter Role Name"
                  required
                />
              </label>
              <label>
                Add Permission
                <div className="permission-input">
                  <input
                    type="text"
                    value={permissionInput}
                    onChange={(e) => setPermissionInput(e.target.value)}
                    placeholder="Enter Permission"
                  />
                  <button type="button" onClick={addPermission}>
                    Add
                  </button>
                </div>
              </label>
              <div className="permissions-list">
                {newRole.permissions.map((perm, i) => (
                  <span key={i} className="permission-tag">
                    {perm}
                  </span>
                ))}
              </div>
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

export default RolesPage;