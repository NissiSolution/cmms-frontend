import React, { useState } from 'react';
import SidebarComponent from '../sidebar/SidebarComponent';
import './LocationPage.css';
import { FaEdit } from 'react-icons/fa'; // Edit icon
import { FaTrashAlt } from 'react-icons/fa'; // Delete icon

const LocationPage = () => {
  const [locations, setLocations] = useState([
    { name: 'location1', address: 'First Location' },
    { name: 'location 2', address: 'location 2' },
    { name: 'location2', address: 'location2' },
    { name: 'location3', address: 'location3' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ name: '', address: '' });
  const [editIndex, setEditIndex] = useState(null);

  // Modal Handlers
  const openModal = (location = { name: '', address: '' }, index = null) => {
    setCurrentLocation(location);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentLocation({ name: '', address: '' });
    setEditIndex(null);
  };

  // Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedLocations = [...locations];

    if (editIndex !== null) {
      updatedLocations[editIndex] = currentLocation; // Edit location
    } else {
      updatedLocations.push(currentLocation); // Add new location
    }

    setLocations(updatedLocations);
    closeModal();
  };

  // Delete Action
  const handleDelete = (index) => {
    const updatedLocations = locations.filter((_, i) => i !== index);
    setLocations(updatedLocations);
  };

  return (
    <div className="location-page">
      <SidebarComponent />

      <div className="main-content">
        <header className="header">
          <h1>Manage Locations</h1>
          <button className="add-btn" onClick={() => openModal()}>
            + Create Location
          </button>
        </header>

        {/* Location Table */}
        <table className="location-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index}>
                <td>{location.name}</td>
                <td>{location.address}</td>
                <td>
                  <button className="action-btn edit" onClick={() => openModal(location, index)}>
                    <FaEdit /> Edit
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(index)}>
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editIndex !== null ? 'Edit Location' : 'Create Location'}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  value={currentLocation.name}
                  onChange={(e) => setCurrentLocation({ ...currentLocation, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Address:
                <input
                  type="text"
                  value={currentLocation.address}
                  onChange={(e) =>
                    setCurrentLocation({ ...currentLocation, address: e.target.value })
                  }
                  required
                />
              </label>
              <div className="modal-actions">
                <button type="button" onClick={closeModal}>
                  Close
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPage;
