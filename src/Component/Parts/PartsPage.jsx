import React, { useState, useEffect } from "react";
import axios from "axios";
import './PartsPage.css';
import SidebarComponent from "../sidebar/SidebarComponent";

const PartsPage = () => {
  const [assets, setAssets] = useState([]);
  const [recentStockOuts, setRecentStockOuts] = useState([]); // State for recent stock-outs
  const [remark, setRemark] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [subtractQuantity, setSubtractQuantity] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Fetching assets data
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get('https://cmms-backend-1.onrender.com/api/assets/get');
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  // Fetch recent stock-out data
  useEffect(() => {
    const fetchRecentStockOuts = async () => {
      try {
        const response = await axios.get('https://cmms-backend-1.onrender.com/api/remark/get');
        setRecentStockOuts(response.data); // Assuming the response data is an array of stock-out records
      } catch (error) {
        console.error("Error fetching recent stock outs:", error);
      }
    };

    fetchRecentStockOuts();
  }, []);

  const handleSubtractQuantity = async () => {
    if (!selectedAsset || subtractQuantity <= 0) {
      setErrorMessage("Please select a valid asset and enter a positive quantity.");
      return;
    }

    if (subtractQuantity > selectedAsset.quantity) {
      setErrorMessage("Cannot subtract more than the available quantity.");
      return;
    }

    try {
      const updatedQuantity = parseInt(selectedAsset.quantity) - parseInt(subtractQuantity);

      // Update asset quantity
      await axios.put(
        `https://cmms-backend-1.onrender.com/api/assets/update/${selectedAsset.id}`,
        { quantity: updatedQuantity }
      );

      // Add remark
      if (remark) {
        await axios.post("https://cmms-backend-1.onrender.com/api/remark", {
          asset_id: selectedAsset.id,
          stock: parseInt(subtractQuantity),
          remark,
        });
      }

      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset.id === selectedAsset.id
            ? { ...asset, quantity: updatedQuantity }
            : asset
        )
      );

      setSuccessMessage(`Stock updated successfully for ${selectedAsset.name}.`);
      setSelectedAsset(null);
      setSubtractQuantity(0);
      setRemark("");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error || error.message || "An unknown error occurred"
      );
    }
  };

  return (
    <div className="StockOut-page">
      <SidebarComponent />
      <div className="main-content">
        <header className="header">
          <h1>Stock Out Management</h1>
        </header>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="stock-out-form">
          <label>
            <span>Select Asset:</span>
            <select
              value={selectedAsset?.id || ""}
              onChange={(e) => {
                const asset = assets.find((a) => a.id === parseInt(e.target.value));
                setSelectedAsset(asset || null);
              }}
            >
              <option value="">-- Select Asset --</option>
              {assets
                .filter((asset) => asset.quantity > 0)
                .map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} (In Stock: {asset.quantity})
                  </ option>
                ))}
            </select>
          </label>

          <label>
            <span>Quantity:</span>
            <input
              type="number"
              value={subtractQuantity}
              onChange={(e) => setSubtractQuantity(parseInt(e.target.value))}
              min="1"
              placeholder="Enter quantity to subtract"
            />
          </label>
          <label>
            <span>Remarks:</span>
            <textarea
              placeholder="Info about stock out"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            ></textarea>
          </label>

          <button className="subtract-btn" onClick={handleSubtractQuantity}>
            Update Stock
          </button>
        </div>

        <div className="recent-stock-outs">
          <h2>Recent Stock-Outs</h2>
          <div className="stock-out-cards">
            {recentStockOuts.map((stockOut) => (
              <div className="stock-out-card" key={stockOut.id}>
                <h3>{stockOut.asset_name}</h3>
                <p>Quantity: {stockOut.stock}</p>
                <p>Remark: {stockOut.remark}</p>
                <p>Date: {new Date(stockOut.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsPage;