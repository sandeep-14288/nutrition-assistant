const mongoose = require('mongoose');

const MealSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    date: { 
        type: Date, 
        default: Date.now,
        required: true 
    },
    // Implicit relationship mentioned in architecture: a meal consists of foods
    foods: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Food' 
    }]
}, { timestamps: true });

module.exports = mongoose.model('Meal', MealSchema);
