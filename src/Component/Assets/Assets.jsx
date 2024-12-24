import React, { useState, useEffect } from "react";
import "./Assets.css";
import axios from "axios";
import SidebarComponent from "../sidebar/SidebarComponent";
import { FaEye, FaTrashAlt, FaEdit } from 'react-icons/fa'; // Import FaEdit
import { useNavigate } from "react-router-dom";

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentAsset, setCurrentAsset] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const navigate = useNavigate();

  // Fetching assets data
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get(
          "https://cmms-backend-1.onrender.com/api/assets/get"
        );
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  const openViewModal = (asset) => {
    setCurrentAsset(asset);
    setIsViewModalOpen(true);
  };

  const closeModal = () => {
    setIsViewModalOpen(false);
    setCurrentAsset({});
  };
   const role=localStorage.getItem('role')

  const handleDelete = async (index) => {
    const assetToDelete = assets[index];
    if (
      window.confirm(`Are you sure you want to delete the asset: ${assetToDelete.name}?`)
    ) {
      try {
        const response = await axios.delete(
          `https://cmms-backend-1.onrender.com/api/assets/delete/${assetToDelete.id}`
        );
        if (response.status === 200) {
          setAssets((prevAssets) => prevAssets.filter((_, i) => i !== index));
        } else {
          setErrorMessage(response.data.error || "Failed to delete asset.");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.error || error.message || "An unknown error occurred"
        );
      }
    }
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const filteredAssets = selectedName
    ? assets.filter((asset) => asset.name === selectedName)
    : assets;

  return (
    <div className="Assets-page">
      <SidebarComponent />
      <div className="main-content">
        <header className="header">
          <h1>Inventory Management</h1>
          {role!=='user'&&(
          <button className="add-btn" onClick={() => navigate("/add-stock")}>
            + Add Asset
          </button>)}
        </header>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <select value={selectedName} onChange={handleNameChange}>
          <option value="">All Assets</option>
          {assets.map((asset) => (
            <option key={asset.id} value={asset.name}>
              {asset.name}
            </option>
          ))}
        </select>

        <div className="assets-list">
          <table>
            <thead>
              <tr>
                <th>Thumbnail</th>
                <th>SKU</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Availability</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr key={asset.id}>
                  <td>
                    <img
                      src={
                        asset.thumbnail
                          ? `https://nissicmms.digidiary.in/api/${asset.thumbnail}`
                          : "/default-thumbnail.jpg"
                      }
                      alt={asset.name}
                      style={{ width: "50px", height: "50px", borderRadius: "5px" }}
                    />
                  </td>
 <td>{asset.sku}</td>
                  <td>{asset.name}</td>
                  <td>{asset.quantity}</td>
                  <td>
                    {asset.quantity >= 10
                      ? "In Stock"
                      : asset.quantity <= 10 && asset.quantity >= 0
                      ? "Low Stock"
                      : "Out of Stock"}
                  </td>
                  <td>
                    <button
                      className="action-btn view"
                      onClick={() => openViewModal(asset)}
                    >
                      <FaEye />
                    </button>
                    {role!=='user'&&(
                      <>
                    <button
                      className="action-btn edit"
                      onClick={() => navigate("/add-stock", { state: { asset } })} // Navigate to Add page with asset data
                    >
                      <FaEdit />
                    </button> 
                    <button
                      className="action-btn delete"
                      onClick={() => handleDelete(index)}
                    >
                      <FaTrashAlt />
                    </button></>)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* View Modal */}
        {isViewModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Asset Details</h2>
              <p><strong>Name:</strong> {currentAsset.name}</p>
              <p><strong>SKU:</strong> {currentAsset.sku}</p>
              <p><strong>Asset Tag:</strong> {currentAsset.assetTag}</p>
              <p><strong>Category:</strong> {currentAsset.category}</p>
              <p><strong>Model:</strong> {currentAsset.model}</p>
              <p><strong>Brand:</strong> {currentAsset.brand}</p>
              <p><strong>Serial Number:</strong> {currentAsset.serialNumber}</p>
              <p><strong>Quantity:</strong> {currentAsset.quantity}</p>
              <p><strong>Thumbnail:</strong></p>
              <img
                src={
                  currentAsset.thumbnail
                    ? `https://nissicmms.digidiary.in/api/${currentAsset.thumbnail}`
                    : "/default-thumbnail.jpg"
                }
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
    </div>
  );
};

export default Assets;