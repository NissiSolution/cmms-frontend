import React, { useState } from 'react';
import SidebarComponent from '../sidebar/SidebarComponent';
import './WorkOrderPage.css';

const WorkOrderPage = () => {
  const [workOrders, setWorkOrders] = useState([
    { id: '1659326419', name: 'Car Testing', priority: 'low', instructions: 'Road test the vehicle to ensure smooth operation and performance.', status: 'Open', image: 'https://via.placeholder.com/150?text=Car' },
    { id: '1659328464', name: 'Car Checking', priority: 'high', instructions: 'Check battery health and clean terminals.', status: 'Complete', image: 'https://via.placeholder.com/150?text=Battery' },
    { id: '1659329970', name: 'Truck Maintenance', priority: 'medium', instructions: 'Check the condition and tread depth of all tires, including the spare.', status: 'Open', image: 'https://via.placeholder.com/150?text=Truck' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [filter, setFilter] = useState('All');

  const openModal = (order = {}, index = null, viewMode = false) => {
    setCurrentOrder(order);
    setEditIndex(index);
    setIsViewMode(viewMode);
    setImagePreview(order.image || '');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOrder({});
    setEditIndex(null);
    setIsViewMode(false);
    setImagePreview('');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setCurrentOrder({ ...currentOrder, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedOrders = [...workOrders];

    if (editIndex !== null) {
      updatedOrders[editIndex] = currentOrder;
    } else {
      updatedOrders.push({ ...currentOrder, id: Date.now().toString(), status: 'Open' });
    }

    setWorkOrders(updatedOrders);
    closeModal();
  };

  const handleDelete = (index) => {
    const updatedOrders = workOrders.filter((_, i) => i !== index);
    setWorkOrders(updatedOrders);
  };

  const filterOrders = () => {
    if (filter === 'Pending') return workOrders.filter(order => order.status === 'Open');
    if (filter === 'Complete') return workOrders.filter(order => order.status === 'Complete');
    return workOrders;
  };

  const filteredOrders = filterOrders();

  return (
    <div className="work-order-container">
      <SidebarComponent />

      <div className="work-order-content">
        <header className="header">
          <h1>Work Orders</h1>
          <div>
            <button className="add-btn" onClick={() => openModal()}>
              + Add Work Order
            </button>
          </div>
        </header>

        <div className="filter">
          <button
            className={`add-btn filter-btn ${filter === 'Pending' ? 'active' : ''}`}
            onClick={() => setFilter('Pending')}
          >
            Pending
          </button>
          <button
            className={`add-btn filter-btn ${filter === 'Complete' ? 'active' : ''}`}
            onClick={() => setFilter('Complete')}
          >
            Complete
          </button>
          <button
            className={`add-btn filter-btn ${filter === 'All' ? 'active' : ''}`}
            onClick={() => setFilter('All')}
          >
            All
          </button>
        </div>

        <table className="work-order-table">
          <thead>
            <tr>
              <th>WORK ORDER ID</th>
              <th>WORK ORDER NAME</th>
              <th>PRIORITY</th>
              <th>INSTRUCTIONS</th>
              <th>STATUS</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>
                  <span className={`priority ${order.priority}`}>
                    {order.priority} Priority
                  </span>
                </td>
                <td>{order.instructions}</td>
                <td>{order.status}</td>
                <td>
                  <button className="action-btn view" onClick={() => openModal(order, index, true)}>
                    👁️
                  </button>
                  <button className="action-btn edit" onClick={() => openModal(order, index)}>
                    ✏️
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(index)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              {isViewMode ? (
                <>
                  <h2>Work Order Details</h2>
                  <img src={currentOrder.image} alt={currentOrder.name} style={{ width: '100%', height: 'auto' }} />
                  <p><strong>Name:</strong> {currentOrder.name}</p>
                  <p><strong>Priority:</strong> {currentOrder.priority}</p>
                  <p><strong>Instructions:</strong> {currentOrder.instructions}</p>
                  <p><strong>Status:</strong> {currentOrder.status}</p>
                  <div className="modal-actions">
                    <button onClick={closeModal}>Close</button>
                  </div>
                </>
              ) : (
                <>
                  <h2>{editIndex !== null ? 'Edit Work Order' : 'Add Work Order'}</h2>
                  <form onSubmit={handleSubmit}>
                    <label>
                      Name:
                      <input
                        type="text"
                        value={currentOrder.name || ''}
                        onChange={(e) => setCurrentOrder({ ...currentOrder, name: e.target.value })}
                        required
                      />
                    </label>
                    <label>
                      Priority:
                      <select
                        value={currentOrder.priority || 'low'}
                        onChange={(e) => setCurrentOrder({ ...currentOrder, priority: e.target.value })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </label>
                    <label>
                      Instructions:
                      <textarea
                        value={currentOrder.instructions || ''}
                        onChange={(e) => setCurrentOrder({ ...currentOrder, instructions: e.target.value })}
                        required
                      />
                    </label>
                    <label>
                      Status:
                      <select
                        value={currentOrder.status || 'Open'}
                        onChange={(e) => setCurrentOrder({ ...currentOrder, status: e.target.value })}
                      >
                        <option value="Open">Pending</option>
                        <option value="Complete">Complete</option>
                      </select>
                    </label>
                    <label>
                      Upload Image:
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                    {imagePreview && (
                      <div className="image-preview">
                        <img src={imagePreview} alt="Preview" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
                      </div>
                    )}
                    <div className="modal-actions">
                      <button type="button" onClick={closeModal}>
                        Close
                      </button>
                      <button type="submit">Save</button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkOrderPage;
