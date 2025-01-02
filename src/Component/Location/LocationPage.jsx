import axios from 'axios'; // Import Axios
import React, { useState, useEffect } from 'react';
import SidebarComponent from '../sidebar/SidebarComponent';
import './LocationPage.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const LocationPage = () => {
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({ name: '', address: '' });
  const [editIndex, setEditIndex] = useState(null);
  const role=localStorage.getItem('role')
  // Fetch Locations from API
  useEffect(() => {
    axios
      .get('https://cmms-backend-1.onrender.com/api/location')
      .then((response) => setLocations(response.data))
      .catch((err) => console.error('Error fetching locations:', err));
  }, []);

  // Open Modal
  const openModal = (location = { name: '', address: '' }, index = null) => {
    setCurrentLocation(location);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentLocation({ name: '', address: '' });
    setEditIndex(null);
  };

  // Add or Edit Location
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex !== null) {
      // Update Existing Location
      const locationId = locations[editIndex].id;
      axios
        .put(`https://cmms-backend-1.onrender.com/api/locations/${locationId}`, currentLocation)
        .then(() => {
          const updatedLocations = [...locations];
          updatedLocations[editIndex] = { ...currentLocation, id: locationId };
          setLocations(updatedLocations);
          closeModal();
        })
        .catch((err) => console.error('Error updating location:', err));
    } else {
      // Add New Location
      axios
        .post('https://cmms-backend-1.onrender.com/api/location/post', currentLocation)
        .then((response) => {
          setLocations([...locations, { ...currentLocation, id: response.data.id }]);
          closeModal();
        })
        .catch((err) => console.error('Error adding location:', err));
    }
  };

  // Delete Location
  const handleDelete = (index) => {
    const locationId = locations[index].id;

    axios
      .delete(`https://cmms-backend-1.onrender.com/api/locations/dlt/${locationId}`)
      .then(() => {
        const updatedLocations = locations.filter((_, i) => i !== index);
        setLocations(updatedLocations);
      })
      .catch((err) => console.error('Error deleting location:', err));
  };

  return (
    <div className="location-page">
      <SidebarComponent />

      <div className="main-content">
        <header className="header">
          <h1>Manage Locations</h1>
          {role!=='user'&&(
  <button className="add-btn" onClick={() => openModal()}>
  + Create Location
</button>
          )}
        
        </header>

        {/* Location Table */}
        <table className="location-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>ADDRESS</th>
              {role!=='user'&&
              (
                <th>ACTION</th>

              )}
            </tr>
          </thead>
          <tbody>
            {locations.map((location, index) => (
              <tr key={index}>
                <td>{location.name}</td>
                <td>{location.address}</td>
                {role!=='user'&&(
                   <td>
              
                   <button className="action-btn edit" onClick={() => openModal(location, index)}>
                     <FaEdit /> Edit
                   </button>
                   <button className="action-btn delete" onClick={() => handleDelete(index)}>
                     <FaTrashAlt /> Delete
                   </button>
                 </td>
                )}
               
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
