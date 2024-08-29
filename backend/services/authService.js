const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { generateOTP, sendOtpEmail } = require('../utils/otp');

// Validate email format
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@(gmail\.com|numetry\.in)$/;
    return emailRegex.test(email);
};

// Validate phone number format
const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[7-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
};

// Register user
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

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine the role based on email domain
    const role = email.endsWith('@numetry.in') ? 'admin' : 'user';


    // Generate OTP
    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    // Create a new user
    const newUser = new User({
        firstName,
        lastName,
        username,
        phoneNumber,
        email,
        password: hashedPassword,
        role, // Ensure this is correctly defined
        otp,
        otpExpires
    });

    // Save the user
    await newUser.save();

    // Send OTP email
    await sendOtpEmail(email, otp);

    return { message: 'Registration successful. Please verify your OTP.' };
};





// Verify OTP
const verifyOtp = async (email, otp) => {
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error('User not found');
    }

    if (user.isVerified) {
        throw new Error('User is already verified');
    }

    if (user.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    if (user.otpExpires < Date.now()) {
        throw new Error('OTP has expired');
    }

    user.isVerified = true;
    user.otp = undefined; // Clear OTP after verification
    user.otpExpires = undefined;
    
    await user.save();

    return { message: 'OTP verified successfully' };
};

// Login user
const loginUser = async (email, password) => {
    // Admin login check (if you still want this functionality)
    if (email === 'admin123@gmail.com' && password === 'adminpassword123') {
        return { role: 'admin', message: 'Admin logged in successfully' };
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    return { message: 'User logged in successfully' };
};

module.exports = { registerUser, loginUser, verifyOtp };
