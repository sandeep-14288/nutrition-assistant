import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/users/`;

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'register', userData);
    return response.data;
};

// Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    return response.data;
};

const authService = {
    register,
    login,
};

export default authService;
