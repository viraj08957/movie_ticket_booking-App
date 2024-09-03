// User model (models/User.js)
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user' }, // Default value
    otp: { type: Number },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    timestamps: [{ login: Date, logout: Date }]
});

module.exports = mongoose.model('User', userSchema);
