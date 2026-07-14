const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    calories: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    proteins: { type: Number, required: true },
    fats: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Food', FoodSchema);
