const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Route Imports
const userRoutes = require('./routes/userRoutes');
const mealRoutes = require('./routes/mealRoutes');
const dietPlanRoutes = require('./routes/dietPlanRoutes');

// Basic Health Check Route
app.get('/', (req, res) => {
    res.send('Nutrition Assistant API is running...');
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/dietplans', dietPlanRoutes);

// Start Server or Export for Vercel
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
}

module.exports = app;
