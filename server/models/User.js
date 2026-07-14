const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // Standard User Fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    
    // Nutrition Specific Fields
    weight: { type: Number, required: true }, // e.g., in kg or lbs
    height: { type: Number, required: true }, // e.g., in cm or inches
    gender: { type: String, enum: ['Male', 'Female', 'Other', 'Prefer not to say'] },
    activityLevel: { 
        type: String, 
        enum: ['Sedentary', 'Lightly Active', 'Moderately Active', 'Very Active', 'Extra Active'] 
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
