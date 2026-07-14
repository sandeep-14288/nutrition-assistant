import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/dietplans/`;

// Create a new diet plan
const createPlan = async (planData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL, planData, config);
    return response.data;
};

// Get all diet plans for the logged-in user
const getPlans = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL, config);
    return response.data;
};

// Update a diet plan
const updatePlan = async (id, planData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(API_URL + id, planData, config);
    return response.data;
};

// Delete a diet plan
const deletePlan = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const dietPlanService = {
    createPlan,
    getPlans,
    updatePlan,
    deletePlan
};

export default dietPlanService;
