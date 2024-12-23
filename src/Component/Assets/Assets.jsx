import React, { useState, useEffect } from "react";
import "./Assets.css";
import axios from "axios";
import SidebarComponent from "../sidebar/SidebarComponent";
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const Assets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [currentAsset, setCurrentAsset] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [selectedName, setSelectedName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetching assets data
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://cmms-backend-1.onrender.com/api/assets/get');
        setAssets(response.data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };

    fetchAssets();
  }, [currentAsset,assets]);

  const openModal = (asset={}, index=null) => {
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
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCurrentAsset((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    Object.entries(currentAsset).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    try {
      if (editIndex !== null) {
        // Update existing asset
        const response = await axios.post(
          `https://nissicmms.digidiary.in/api/assets_api.php`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      
        if (response.status === 200) {
          const updatedAsset = response.data;
          setAssets((prevAssets) => {
            const newAssets = [...prevAssets];
            newAssets[editIndex] = updatedAsset;
            return newAssets;
          });
          closeModal();
        } else {
          console.log(response.data);
          
          setErrorMessage(response.data.error || 'Failed to update asset.');
        }
      }
      
    } catch (error) {
      console.log(error);
      
      setErrorMessage(
        error.response?.data?.error || error.message || 'An unknown error occurred'
      );
    }
  };
  
  const handleDelete = async (index) => {
    const assetToDelete = assets[index];
    if (window.confirm(`Are you sure you want to delete the asset: ${assetToDelete.name}?`)) {
      try {
        const response = await axios.delete(`https://cmms-backend-1.onrender.com/api/assets/delete/${assetToDelete.id}`);
        if (response.status === 200) {
          const updatedAssets = assets.filter((_, i) => i !== index); // Remove the deleted asset from the array
          setAssets(updatedAssets);
        } else {
          setErrorMessage(response.data.error || 'Failed to delete asset.');
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.error || error.message || 'An unknown error occurred');
      }
    }
  };

  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
  };

  const filteredAssets = selectedName
    ? assets.filter(asset => asset.name === selectedName)
    : assets;

  return (
    <div className="Assets-page">
      <SidebarComponent />
      <div className="main-content">
        <header className="header">
          <h1>Inventory Management</h1>
          <button className="add-btn" onClick={() => openModal()}>+ Add Asset</button>
        </header>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <select value={selectedName} onChange={handleNameChange}>
          <option value="">All Assets</option>
          {assets.map(asset => (
            <option key={asset.id} value={asset.name}>{asset.name}</option>
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset, index) => (
                <tr key={asset.id}>
                  <td>
                    <img
                      src={asset.thumbnail ? `https://nissicmms.digidiary.in/api/${asset.thumbnail}` : '/default-thumbnail.jpg'}
                      alt={asset.name}
                      style={{ width: '50px', height: '50px', borderRadius: '5px' }}
                    />
                  </td>
                  <td>{asset.sku}</td>
                  <td>{asset.name}</td>
                  <td>{asset.quantity}</td>
                  <td>
                    <button className="action-btn view" onClick={() => openViewModal(asset)}>
                      <FaEye />
                    </button>
                    <button className="action-btn edit" onClick={() => openModal(asset, index)}>
                      <FaEdit />
                    </button>
                    <button className="action-btn delete" onClick={() => handleDelete(index)}>
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                    value={currentAsset.name}
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
                    value={currentAsset.sku }
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Asset Tag:
                  <input
                    type="text"
                    name="assetTag"
                    value={currentAsset.assetTag }
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Category:
                  <input
                    type="text"
                    name="category"
                    value={currentAsset.category }
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Model:
                  <input
                    type="text"
                    name="model"
                    value={currentAsset.model }
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Brand:
                  <input
                    type="text"
                    name="brand"
                    value={currentAsset.brand }
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Serial Number:
                  <input
                    type="text"
                    name="serialNumber"
                    value={currentAsset.serialNumber }
                    onChange={handleInputChange}
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="number"
                    name="quantity"
                    value={currentAsset.quantity}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <div className="modal-actions">
                  <button type="button" onClick={closeModal}>Close</button>
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
                src={currentAsset.thumbnail ? `https://nissicmms.digidiary.in/api/${currentAsset.thumbnail}` : '/default-thumbnail.jpg'}
                alt={currentAsset.name}
                style={{ width: '150px', borderRadius: '5px' }}
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