import React, { useState, useEffect } from 'react';
import SidebarComponent from '../sidebar/SidebarComponent';
import './WorkOrderPage.css';
import { FaEye, FaEdit } from 'react-icons/fa';
import axios from 'axios';

const WorkOrderPage = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [currentOrder, setCurrentOrder] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('All');
  const [employees, setEmployees] = useState([]);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  useEffect(() => {
    fetchWorkOrders();
    fetchEmployees();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get('https://cmms-backend-1.onrender.com/api/work/get');
      setWorkOrders(response.data);
    } catch (error) {
      console.error('Error fetching work orders:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('https://cmms-backend-1.onrender.com/api/emp/get');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const openModal = (order = {}, index = null, viewMode = false) => {
    setCurrentOrder(order);
    setEditIndex(index);
    setIsViewMode(viewMode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentOrder({});
    setEditIndex(null);
    setIsViewMode(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editIndex !== null) {
        await axios.put('https://cmms-backend-1.onrender.com/api/work/update', currentOrder);
      } else {
        await axios.post('https://cmms-backend-1.onrender.com/api/work/post', currentOrder);
      }
      fetchWorkOrders();
      closeModal();
    } catch (error) {
      console.error('Error submitting work order:', error);
    }
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
          <button className="add-btn" onClick={() => openModal()}>
            + Add Work Order
          </button>
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
              <th>ORDER ID</th>
              <th>ORDER NAME</th>
              <th>PRIORITY</th>
              <th>INSTRUCTIONS</th>
              <th>STATUS</th>
              <th>START DATE</th>
              <th>DEADLINE</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
          {filteredOrders.map((order, index) => (
  <tr key={order.id}>
    <td>{index + 1}</td>
    <td>{order.name}</td>
    <td>
      <span className={`priority ${order.priority}`}>
        {order.priority} Priority
      </span>
    </td>
    <td>{order.instructions}</td>
    <td>{order.status}</td>
    <td>{formatDate(order.start_date)}</td>
    <td>{formatDate(order.deadline)}</td>
    <td>
      <button className="action-btn view" onClick={() => openModal(order, index, true)}>
        <FaEye />
      </button>
      <button className="action-btn edit" onClick={() => openModal(order, index)}>
        <FaEdit />
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
                  <p><strong>Name:</strong> {currentOrder.name}</p>
                  <p><strong>Priority:</strong> {currentOrder.priority}</p>
                  <p><strong>Instructions:</strong> {currentOrder.instructions}</p>
                  <p><strong>Status:</strong> {currentOrder.status}</p>
                  <p><strong>Assigned:</strong> {currentOrder.assigned}</p>
                  <p><strong>Start Date:</strong> {currentOrder.start_date}</p>
                  <p><strong>Deadline:</strong> {currentOrder.deadline}</p>
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
                      Assigned:
                      <select
                        value={currentOrder.assigned || ''}
                        onChange={(e) => setCurrentOrder({ ...currentOrder, assigned: e.target.value })}
                        required
                      >
                        <option value="" disabled>
                          Select Employee
                        </option>
                        {employees.map(emp => (
                          <option key={emp.id} value={emp.name}>
                            {emp.name}
                          </option>
                        ))}
                      </select>
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
                      Start Date:
                      <input
                        type="date"
                        value={currentOrder.start_date || ''}
                        onChange={(e) => setCurrentOrder({ ...currentOrder, start_date: e.target.value })}
                        required
                      />
                    </label>
                    <label>
                      Deadline:
                      <input
                        type="date"
                        value={currentOrder.deadline || ''}
                        onChange={(e) => setCurrentOrder({ ...currentOrder, deadline: e.target.value })}
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
