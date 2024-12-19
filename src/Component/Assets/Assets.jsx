import React, { useState } from "react";
import "./Assets.css";
import SidebarComponent from "../sidebar/SidebarComponent";
import Carengine from '../img/car-engine-isolated-on-white-600nw-2189196519.webp'
import tire from '../img/istockphoto-507072838-612x612.jpg'
import Hydraulic from '../img/51FpJEd9CAL._SX679_.jpg'
const Assets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal for add/edit
  const [isViewModalOpen, setIsViewModalOpen] = useState(false); // Modal for view
  const [assets, setAssets] = useState([
    {
      id: 1,
      name: "Car Engine",
      thumbnail:Carengine,
      sku: "CE12345",
      assetTag: "TAG001",
      category: "Vehicle Parts",
      model: "V8 Turbo",
      brand: "Toyota",
      serialNumber: "SN123456789",
    },
    {
      id: 2,
      name: "Truck Tires",
      thumbnail: tire,
      sku: "TT67890",
      assetTag: "TAG002",
      category: "Maintenance",
      model: "All-Terrain",
      brand: "Michelin",
      serialNumber: "SN987654321",
    },
    {
      id: 3,
      name: "Hydraulic Jack",
      thumbnail: Hydraulic,
      sku: "HJ54321",
      assetTag: "TAG003",
      category: "Tools",
      model: "HJ-200",
      brand: "Snap-On",
      serialNumber: "SN1122334455",
    },
  ]);

  const [currentAsset, setCurrentAsset] = useState({}); // Current asset data
  const [editIndex, setEditIndex] = useState(null); // Index for editing

  const openModal = (asset = {}, index = null) => {
    setCurrentAsset(asset);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const openViewModal = (asset) => {
    setCurrentAsset(asset);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsViewModalOpen(false);
    setCurrentAsset({});
    setEditIndex(null);
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    // For file input (image upload)
    if (name === "thumbnail" && files && files[0]) {
      const file = files[0];
      const fileURL = URL.createObjectURL(file); // Generate a temporary URL
      setCurrentAsset((prev) => ({
        ...prev,
        thumbnail: fileURL,
      }));
    } else {
      // For other inputs
      setCurrentAsset((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAssets = [...assets];

    if (editIndex !== null) {
      // Edit existing asset
      updatedAssets[editIndex] = currentAsset;
    } else {
      // Add new asset
      updatedAssets.push({
        ...currentAsset,
        id: Date.now(),
      });
    }

    setAssets(updatedAssets);
    closeModal();
  };

  const handleDelete = (index) => {
    const updatedAssets = assets.filter((_, i) => i !== index);
    setAssets(updatedAssets);
  };

  return (
    <div className="Assets-page">
      <SidebarComponent />

      <div className="main-content">
        <header className="header">
          <h1>Assets</h1>
          <button className="add-btn" onClick={() => openModal()}>
            + Add Asset
          </button>
        </header>

        {/* Table */}
        <div className="assets-list">
          <table>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset, index) => (
                <tr key={asset.id}>
                  <td>
                    <img
                      src={asset.thumbnail}
                      alt={asset.name}
                      style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                    />
                  </td>
                  <td>{asset.sku}</td>
                  <td>{asset.name}</td>
                  <td>
                    <button
                      className="action-btn view"
                      onClick={() => openViewModal(asset)}
                    >
                      👁️ View
                    </button>
                    <button
                      className="action-btn edit"
                      onClick={() => openModal(asset, index)}
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

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editIndex !== null ? "Edit Asset" : "Add Asset"}</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={currentAsset.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
  Thumbnail:
  <input
    type="file"
    name="thumbnail"
    accept="image/png, image/gif, image/jpg, image/jpeg"
    onChange={handleInputChange}
  />
</label>

              <label>
                SKU:
                <input
                  type="text"
                  name="sku"
                  value={currentAsset.sku || ""}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Asset Tag:
                <input
                  type="text"
                  name="assetTag"
                  value={currentAsset.assetTag || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Category:
                <input
                  type="text"
                  name="category"
                  value={currentAsset.category || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Model:
                <input
                  type="text"
                  name="model"
                  value={currentAsset.model || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Brand:
                <input
                  type="text"
                  name="brand"
                  value={currentAsset.brand || ""}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Serial Number:
                <input
                  type="text"
                  name="serialNumber"
                  value={currentAsset.serialNumber || ""}
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
            <h2>Asset Details</h2>
            <p>
              <strong>Name:</strong> {currentAsset.name}
            </p>
            <p>
              <strong>SKU:</strong> {currentAsset.sku}
            </p>
            <p>
              <strong>Asset Tag:</strong> {currentAsset.assetTag}
            </p>
            <p>
              <strong>Category:</strong> {currentAsset.category}
            </p>
            <p>
              <strong>Model:</strong> {currentAsset.model}
            </p>
            <p>
              <strong>Brand:</strong> {currentAsset.brand}
            </p>
            <p>
              <strong>Serial Number:</strong> {currentAsset.serialNumber}
            </p>
            <p>
              <strong>Thumbnail:</strong>
            </p>
            <img
              src={currentAsset.thumbnail}
              alt={currentAsset.name}
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

export default Assets;
