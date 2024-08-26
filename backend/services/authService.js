const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const { sendOtp } = require('../utils/email.js');
const { storeOtp, getOtpData, deleteOtpData } = require('../utils/otpStore.js');

// Function to validate email format
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@(gmail\.com|numetry\.in)$/;
    return emailRegex.test(email);
};

// Function to validate phone number format
const validatePhoneNumber = (phoneNumber) => {
    console.log('Phone number received:', phoneNumber); // Debug logging
    const phoneRegex = /^[7-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
};

// Function to register a new user
const registerUser = async ({ firstName, lastName, username, phoneNumber, email, password }) => {
    if (!validateEmail(email)) {
        throw new Error('Email should end with @gmail.com or @numetry.in');
    }

    if (!validatePhoneNumber(phoneNumber)) {
        throw new Error('Phone number should be in Indian format');
    }

    if (firstName.length < 3 || /[^a-zA-Z]/.test(firstName)) {
        throw new Error('First name should be at least 3 letters long and contain only letters');
    }

    if (lastName && /[^a-zA-Z]/.test(lastName)) {
        throw new Error('Last name should contain only letters');
    }

    if (/[^a-zA-Z0-9]/.test(username)) {
        throw new Error('Username should contain only letters and numbers');
    }

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email.endsWith('@numetry.in') ? 'admin' : 'user';

    // Generate OTP and store it in-memory
    const otp = crypto.randomInt(100000, 999999).toString();
    storeOtp(email, otp, { firstName, lastName, username, phoneNumber, email, password: hashedPassword, role });

    // Send OTP
    await sendOtp(email, otp);

    return { message: 'OTP sent to email' };
};

// Function to verify OTP and create user
const verifyOtp = async (email, otp) => {
    const otpData = getOtpData(email);
    if (!otpData || otpData.otp !== otp) throw new Error('Invalid OTP');

    // Create and save the user after successful OTP verification
    const newUser = new User(otpData.userData);
    await newUser.save();

    // Remove OTP data from the in-memory store
    deleteOtpData(email);

    return { message: 'User verified successfully' };
};

// Function to log in a user
const loginUser = async (email, password) => {
    // Check if email and password match admin credentials
    if (email === 'admin123@gmail.com' && password === 'adminpassword123') {
        return { role: 'admin' }; // Return admin role directly
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
        throw new Error('Invalid email or password');
    }

    // Generate and return token if not admin
    const token = 'your_jwt_token_here'; // Replace with actual token generation
    return { token };
};



module.exports = { registerUser, verifyOtp, loginUser };
