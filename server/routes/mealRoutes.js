const express = require('express');
const router = express.Router();
const { searchFood, logMeal } = require('../controllers/mealController');
const { protect } = require('../middleware/authMiddleware');

// Routes (all protected)
router.get('/search', protect, searchFood);
router.post('/log', protect, logMeal);

module.exports = router;
