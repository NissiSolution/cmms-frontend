import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarComponent from "../sidebar/SidebarComponent";
import './Add.css';

const Add = () => {
  const [asset, setAsset] = useState({
    name: "",
    sku: "",
    assetTag: "",
    category: "",
    model: "",
    brand: "",
    serialNumber: "",
    quantity: "",
    thumbnail: "",
    vendor: "", // Add vendorId to the asset state
  });
  const [vendors, setVendors] = useState([]); // State to hold vendors
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch vendors data
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axios.get("https://cmms-backend-1.onrender.com/api/vendors/get"); // Update with your actual API URL
        setVendors(response.data); // Assuming the response data is an array of vendors
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchVendors();
  }, []);

  // Check if editing existing asset
  useEffect(() => {
    if (location.state && location.state.asset) {
      setAsset(location.state.asset);
      setIsEditing(true);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAsset((prevAsset) => ({
      ...prevAsset,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAsset((prevAsset) => ({
      ...prevAsset,
      thumbnail: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    const formData = new FormData();
    if (isEditing) {
      formData.append("id", asset.id);
    }
    Object.entries(asset).forEach(([key, value]) => {
      formData.append(key, value);
    });
    try {
      const response = await axios.post(
        `https://nissicmms.digidiary.in/api/assets_api.php`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage(
          isEditing ? "Asset updated successfully!" : "Asset added successfully!"
        );
        setTimeout(() => navigate("/stock"), 1000);
      } else {
        setErrorMessage(response.data.error || "An unknown error occurred.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || error.message || "An unknown error occurred."
      );
    }
  };

  const handleCancel = () => {
    navigate("/stock");
  };

  return (
    <div className="AddEditAssetPage">
      <SidebarComponent />
      <div className="main-content">
        <header className="header">
          <h1>{isEditing ? "Edit Asset" : "Add New Asset"}</h1>
        </header>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <form className="asset-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={asset.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="sku">SKU:</label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={asset.sku}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="assetTag">Asset Tag:</label>
            <input
              type="text"
              id="assetTag"
              name="assetTag"
              value={asset.assetTag}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={asset.category}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={asset.model}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={asset.brand}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="serialNumber">Serial Number:</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={asset.serialNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vendorId">Vendor:</label>
            <select
              id="vendorId"
              name="vendorId"
              value={asset.vendorId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor.id} value={vendor.name}>
                  {vendor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={asset.quantity}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="thumbnail">Thumbnail:</label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleFileChange}
            />
          </div>

        

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {isEditing ? "Update Asset" : "Add Asset"}
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;