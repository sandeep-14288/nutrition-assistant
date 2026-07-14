const express = require('express');
const router = express.Router();
const {
    createDietPlan,
    getDietPlans,
    updateDietPlan,
    deleteDietPlan
} = require('../controllers/dietPlanController');
const { protect } = require('../middleware/authMiddleware');

// Routes (all protected)
router.post('/', protect, createDietPlan);
router.get('/', protect, getDietPlans);
router.put('/:id', protect, updateDietPlan);
router.delete('/:id', protect, deleteDietPlan);

module.exports = router;
