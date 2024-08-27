const bcrypt = require('bcryptjs');
const User = require('../models/User.js');

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

    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(password, 10);
    const role = email.endsWith('@numetry.in') ? 'admin' : 'user';

    const newUser = new User({
        firstName,
        lastName,
        username,
        phoneNumber,
        email,
        password: hashedPassword,
        role
    });

    await newUser.save();

    return { message: 'Registration successful' };
};

// Login user
const loginUser = async (email, password) => {
    // Admin login check
    if (email === 'admin123@gmail.com' && password === 'adminpassword123') {
        return { role: 'admin' }; 
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id, role: user.role },
        'your_jwt_secret', // Replace with your actual JWT secret
        { expiresIn: '1h' } // Adjust token expiration as needed
    );

    return { token };
};

module.exports = { registerUser, loginUser };
