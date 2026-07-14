const mongoose = require('mongoose');

const NutritionFactSchema = new mongoose.Schema({
    mealId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Meal',
        required: true
    },
    dietPlanId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'DietPlan',
        required: true
    },
    // Optional: Fields to store the calculated totals at the time of tracking
    totalCalories: { type: Number },
    totalCarbohydrates: { type: Number },
    totalProteins: { type: Number },
    totalFats: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('NutritionFact', NutritionFactSchema);
