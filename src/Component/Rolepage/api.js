import axios from 'axios';

const API_BASE_URL = 'https://cmms-backend-1.onrender.com/api';

// Add a new role
export const addRole = async (roleData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/roles/post`, roleData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding role:', error);
    throw error;
  }
};

// Fetch all roles
export const getRoles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/roles`);
    return response.data;
  } catch (error) {
    console.error('Error fetching roles:', error);
    throw error;
  }
};

// Delete a role
export const deleteRole = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting role:', error);
    throw error;
  }
};
