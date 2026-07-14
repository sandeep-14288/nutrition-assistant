const DietPlan = require('../models/DietPlan');

// @desc    Create a new Diet Plan
// @route   POST /api/dietplans
// @access  Private
const createDietPlan = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        
        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Please provide both start and end dates' });
        }

        const dietPlan = await DietPlan.create({
            userId: req.user.id,
            startDate,
            endDate
        });

        res.status(201).json(dietPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all Diet Plans for the logged-in user
// @route   GET /api/dietplans
// @access  Private
const getDietPlans = async (req, res) => {
    try {
        const dietPlans = await DietPlan.find({ userId: req.user.id });
        res.status(200).json(dietPlans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a Diet Plan
// @route   PUT /api/dietplans/:id
// @access  Private
const updateDietPlan = async (req, res) => {
    try {
        const dietPlan = await DietPlan.findById(req.params.id);

        if (!dietPlan) {
            return res.status(404).json({ message: 'Diet plan not found' });
        }

        // Make sure the logged in user matches the diet plan user
        if (dietPlan.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this plan' });
        }

        const updatedDietPlan = await DietPlan.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Returns the updated document
        );

        res.status(200).json(updatedDietPlan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a Diet Plan
// @route   DELETE /api/dietplans/:id
// @access  Private
const deleteDietPlan = async (req, res) => {
    try {
        const dietPlan = await DietPlan.findById(req.params.id);

        if (!dietPlan) {
            return res.status(404).json({ message: 'Diet plan not found' });
        }

        // Make sure the logged in user matches the diet plan user
        if (dietPlan.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to delete this plan' });
        }

        await dietPlan.deleteOne();

        res.status(200).json({ id: req.params.id, message: 'Diet plan successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createDietPlan,
    getDietPlans,
    updateDietPlan,
    deleteDietPlan
};
