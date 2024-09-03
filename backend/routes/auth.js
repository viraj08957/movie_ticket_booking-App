const { body, validationResult } = require('express-validator');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const router = express.Router();

// Validation Functions
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhoneNumber = (phone) => /^[7-9]\d{9}$/.test(phone);

const JWT_SECRET = "edad77087f2bb65e523e3acce393c4daf097a3488fdd1731ec8179f418750b860c01f051909061209f30fd0f532a97eafc4fb05a6b8d8557d73484910ffceb23"

// Helper Function to Send OTP Email
const sendOtpEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    };

    return transporter.sendMail(mailOptions);
};

// User Registration
router.post('/register', [
    // Validation middleware...
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, username, phoneNumber, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

        const newUser = new User({
            firstName,
            lastName,
            username,
            phoneNumber,
            email,
            password: hashedPassword,
            role,
            otp,
            otpExpires,
            isVerified: false
        });

        await newUser.save();

        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'User registered successfully. Please verify your email with the OTP sent to you.' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        console.error(error.stack); // Detailed error stack trace
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// OTP Verification
router.post('/verify-otp', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('otp').isNumeric().withMessage('Please provide a valid OTP')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Invalid email or OTP' });

        // Check if the OTP has expired
        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Compare OTPs as strings to avoid type issues
        if (String(user.otp) !== String(otp)) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Mark user as verified and clear OTP fields
        user.isVerified = true;
        user.otp = null;
        user.otpExpires = null;
        await user.save();

        res.status(200).json({ message: 'OTP verified successfully, registration complete' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login
router.post('/login', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });

        if (!user.isVerified) {
            return res.status(400).json({ message: 'Email not verified. Please verify your email to log in.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// User Logout
router.post('/logout', [
    body('email').isEmail().withMessage('Please provide a valid email')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email' });

        const lastLoginIndex = user.timestamps.length - 1;
        if (lastLoginIndex >= 0 && !user.timestamps[lastLoginIndex].logout) {
            user.timestamps[lastLoginIndex].logout = new Date().toISOString();
            await user.save();
        }

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Middleware to Verify Token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

// Protected Route Example
router.get('/protected-route', verifyToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// Resend OTP
router.post('/resend-otp', [
    body('email').isEmail().withMessage('Please provide a valid email')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        if (user.isVerified) return res.status(400).json({ message: 'User is already verified' });

        const otp = crypto.randomInt(100000, 999999); // Generate new OTP
        const otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

        user.otp = otp;
        user.otpExpires = otpExpires;
        await user.save();

        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'OTP has been resent' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
