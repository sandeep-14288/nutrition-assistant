import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/api/meals/`;

// Search for food using Edamam API (via our backend)
const searchFood = async (query, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(API_URL + `search?ingr=${encodeURIComponent(query)}`, config);
    return response.data;
};

// Log a new meal to the database
const logMeal = async (mealData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(API_URL + 'log', mealData, config);
    return response.data;
};

const mealService = {
    searchFood,
    logMeal
};

export default mealService;
