import React, { useState } from 'react'; 
import SidebarComponent from '../sidebar/SidebarComponent';
import './RolePage.css';

const RolesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roles, setRoles] = useState([]);

  const modules = [
    { name: 'stock', permissions: ['view','create', 'edit', 'delete'] },
    { name: 'stock-out', permissions: [ 'view','create', 'edit', 'delete'] },
    { name: 'work', permissions: [ 'view','create', 'edit', 'delete'] },
    { name: 'Vendor', permissions: [ 'view','create', 'edit', 'delete'] },
  ];

  const [newRole, setNewRole] = useState({
    name: '',
    permissions: {},
  });

  // Modal Control
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewRole({ name: '', permissions: {} });
  };

  // Handle Role Name Input
  const handleRoleNameChange = (e) => {
    setNewRole({ ...newRole, name: e.target.value });
  };

  // Handle Permission Toggle
  const togglePermission = (module, permission) => {
    setNewRole((prev) => {
      const updatedPermissions = { ...prev.permissions };
      if (!updatedPermissions[module]) {
        updatedPermissions[module] = [];
      }
      if (updatedPermissions[module].includes(permission)) {
        updatedPermissions[module] = updatedPermissions[module].filter((perm) => perm !== permission);
      } else {
        updatedPermissions[module].push(permission);
      }
      return { ...prev, permissions: updatedPermissions };
    });
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newRole.name) {
      setRoles([...roles, newRole]);
      closeModal();
    }
    console.log(roles);
    
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

        {/* Roles List */}
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
                    {Object.entries(role.permissions).map(([module, perms]) => (
                      <div key={module}>
                        <strong>{module}:</strong> {perms.join(', ')}
                      </div>
                    ))}
                  </td>
                  <td>
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
                  onChange={handleRoleNameChange}
                  placeholder="Enter Role Name"
                  required
                />
              </label>

              <div className="permissions-grid">
                {modules.map((module) => (
                  <div key={module.name} className="module-permissions">
                  <div className='module-first-div'>
                  <h3>{module.name}</h3>

                  </div>
                    {module.permissions.map((perm) => (
                      <label key={perm} className='role-table'>
                        <div>
                        <input
                          type="checkbox"
                          checked={newRole.permissions[module.name]?.includes(perm) || false}
                          onChange={() => togglePermission(module.name, perm)}
                        />
                        </div>
                       
                       <div>{perm}</div> 
                      </label>
                    ))}
                  </div>
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
