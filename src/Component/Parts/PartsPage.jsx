import React, { useState } from "react";
import SidebarComponent from "../sidebar/SidebarComponent";
import './PartsPage.css'
const PartsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for add/edit
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Modal for view
  const [parts, setParts] = useState([
    {
      id: 1,
      name: "Brake Pad",
      thumbnail:
        require('../img/brake-pads-and-brake-discs.jpg'),
      partNumber: "BP12345",
      quantity: 50,
      price: "$25.00",
      category: "Vehicle Parts",
    },
    {
      id: 2,
      name: "Oil Filter",
      thumbnail:
        require('../img/61xFNfD+cFL._AC_UF1000,1000_QL80_.jpg'),
      partNumber: "OF67890",
      quantity: 30,
      price: "$15.00",
      category: "Maintenance",
    },
    {
      id: 3,
      name: "Air Filter",
      thumbnail:
        require('../img/61jeyJugeBL.jpg'),
      partNumber: "AF54321",
      quantity: 100,
      price: "$20.00",
      category: "Engine Components",
    },
  ]);

  const [currentPart, setCurrentPart] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const openModal = (part = {}, index = null) => {
    setCurrentPart(part);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const openViewModal = (part) => {
    setCurrentPart(part);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setCurrentPart({});
    setEditIndex(null);
  };

const handleInputChange = (e) => {
  const { name, value, files } = e.target;

  // For file input (image upload)
  if (name === "thumbnail" && files && files[0]) {
    const file = files[0];
    const fileURL = URL.createObjectURL(file); // Generate a temporary URL
    setCurrentPart((prev) => ({
      ...prev,
      thumbnail: fileURL,
    }));
  } else {
    // For other inputs
    setCurrentPart((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedParts = [...parts];

    if (editIndex !== null) {
      updatedParts[editIndex] = currentPart;
    } else {
      updatedParts.push({
        ...currentPart,
        id: Date.now(),
      });
    }

    setParts(updatedParts);
    closeModal();
  };

  const handleDelete = (index) => {
    const updatedParts = parts.filter((_, i) => i !== index);
    setParts(updatedParts);
  };

  return (
    <div className="Parts-page">
      <SidebarComponent />

      <div className="main-content">
        <header className="header">
          <h1>Parts</h1>
          <button className="add-btn" onClick={() => openModal()}>
            + Add Part
          </button>
        </header>

        {/* Table */}
        <div className="parts-list">
          <table>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>Part Number</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part, index) => (
                <tr key={part.id}>
                  <td>
                    <img
                      src={part.thumbnail}
                      alt={part.name}
                      style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                    />
                  </td>
                  <td>{part.partNumber}</td>
                  <td>{part.name}</td>
                  <td>
                    <button
                      className="action-btn view"
                      onClick={() => openViewModal(part)}
                    >
                      👁️ View
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => openModal(part, index)}
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
            <h2>{editIndex !== null ? "Edit Part" : "Add Part"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentPart.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Part Thumbnail :
              
  <input
    type="file"
    name="thumbnail"
    accept="image/png, image/gif, image/jpg, image/jpeg"
    onChange={handleInputChange}
  />
</label>
              <label>
                Part Number:
                <input
                  type="text"
                  name="partNumber"
                  value={currentPart.partNumber || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Quantity:
                <input
                  type="number"
                  name="quantity"
                  value={currentPart.quantity || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Price:
                <input
                  type="text"
                  name="price"
                  value={currentPart.price || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={currentPart.category || ""}
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
            <h2>Part Details</h2>
            <p>
              <strong>Name:</strong> {currentPart.name}
            </p>
            <p>
              <strong>Part Number:</strong> {currentPart.partNumber}
            </p>
            <p>
              <strong>Quantity:</strong> {currentPart.quantity}
            </p>
            <p>
              <strong>Price:</strong> {currentPart.price}
            </p>
            <p>
              <strong>Category:</strong> {currentPart.category}
            </p>
            <p>
              <strong>Thumbnail:</strong>
            </p>
            <img
              src={currentPart.thumbnail}
              alt={currentPart.name}
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

export default PartsPage;
