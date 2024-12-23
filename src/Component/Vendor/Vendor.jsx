import React, { useState, useEffect } from "react";
import axios from "axios"; // For API calls
import SidebarComponent from "../sidebar/SidebarComponent";
import "./Vendor.css";
import { FaEye,  FaTrashAlt } from 'react-icons/fa'; // Icons

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentVendor, setCurrentVendor] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  // Fetch vendors on component mount
  useEffect(() => {
    fetchVendors();
  }, []);

  const fetchVendors = async () => {
    try {
      const response = await axios.get('https://cmms-backend-1.onrender.com/api/vendors/get');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };
  
  const openModal = (vendor = {}, index = null) => {
    setCurrentVendor(vendor);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const openViewModal = (vendor) => {
    setCurrentVendor(vendor);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setCurrentVendor({});
    setEditIndex(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentVendor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        // Update vendor logic
        // Assuming updateVendor API exists
        await axios.put(`https://cmms-backend-1.onrender.com/api/vendors/${currentVendor.id}`, currentVendor);
      } else {
        // Add new vendor
        await axios.post('https://cmms-backend-1.onrender.com/api/vendors/post', currentVendor);
      }
      fetchVendors(); // Refresh the list
      closeModal();
    } catch (error) {
      console.error('Error saving vendor:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://cmms-backend-1.onrender.com/api/vendors/dlt/${id}`);
      fetchVendors(); // Refresh the list
    } catch (error) {
      console.error('Error deleting vendor:', error);
    }
  };

  return (
    <div className="Vendor-page">
      <SidebarComponent />
      <div className="main-content">
        <header className="header">
          <h1>Vendors</h1>
          <button className="add-btn" onClick={() => openModal()}>
            + Add Vendor
          </button>
        </header>

        <div className="vendor-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor.id}>
                  <td>{vendor.name}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.phone}</td>
                  <td>
                    <button className="action-btn view" onClick={() => openViewModal(vendor)}>
                      <FaEye />
                    </button>

                    <button className="action-btn delete" onClick={() => handleDelete(vendor.id)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editIndex !== null ? "Edit Vendor" : "Add Vendor"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentVendor.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={currentVendor.email || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="text"
                  name="phone"
                  value={currentVendor.phone || ""}
                  onChange={handleInputChange}
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

      {/* View Modal */}
      {isViewModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Vendor Details</h2>
            <p><strong>Name:</strong> {currentVendor.name}</p>
            <p><strong>Email:</strong> {currentVendor.email}</p>
            <p><strong>Phone:</strong> {currentVendor.phone}</p>
            <div className="modal-actions">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vendor;
