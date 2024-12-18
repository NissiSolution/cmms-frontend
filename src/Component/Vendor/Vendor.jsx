import React, { useState } from "react";
import SidebarComponent from "../sidebar/SidebarComponent";
import "./Vendor.css";

const Vendor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "William",
      email: "nibefa6957@chimpad.com",
      phone: "9876320145",
      image: "https://i.pravatar.cc/52?img=18",
    },
    {
      id: 2,
      name: "Keneth",
      email: "tepac35577@galotv.com",
      phone: "+1 (361) 717-1194",
      image: "https://i.pravatar.cc/50?img=33",
    },
    {
      id: 3,
      name: "Juliet Cunningham",
      email: "Juliet@example.com",
      phone: "+1 (122) 622-1039",
      image: "https://i.pravatar.cc/50?img=48",
    },
  ]);

  const [currentVendor, setCurrentVendor] = useState({});
  const [editIndex, setEditIndex] = useState(null);

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
    const { name, value, files } = e.target;
  
    // For file input (image upload)
    if (name === "thumbnail" && files && files[0]) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file); // Generate a temporary URL
      setCurrentVendor((prev) => ({
        ...prev,
        thumbnail: fileURL,
      }));
    } else {
      // For other inputs
      setCurrentVendor((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedVendors = [...vendors];

    if (editIndex !== null) {
      updatedVendors[editIndex] = currentVendor;
    } else {
      updatedVendors.push({
        ...currentVendor,
        id: Date.now(),
      });
    }

    setVendors(updatedVendors);
    closeModal();
  };

  const handleDelete = (index) => {
    const updatedVendors = vendors.filter((_, i) => i !== index);
    setVendors(updatedVendors);
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

        {/* Table */}
        <div className="vendor-list">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor.id}>
                  <td>
                    <img
                      src={vendor.image}
                      alt={vendor.name}
                      style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                    />
                  </td>
                  <td>{vendor.name}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.phone}</td>
                  <td>
                    <button
                      className="action-btn view"
                      onClick={() => openViewModal(vendor)}
                    >
                      👁️ View
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => openModal(vendor, index)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(index)}
                    >
                      🗑️ Delete
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
             
              <label>
  Image
  <input
    type="file"
    name="image"
    accept="image/png, image/gif, image/jpg, image/jpeg"
    onChange={handleInputChange}
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
            <p>
              <strong>Name:</strong> {currentVendor.name}
            </p>
            <p>
              <strong>Email:</strong> {currentVendor.email}
            </p>
            <p>
              <strong>Phone:</strong> {currentVendor.phone}
            </p>
            <img
              src={currentVendor.image}
              alt={currentVendor.name}
              style={{ width: "150px", borderRadius: "5px" }}
            />
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
