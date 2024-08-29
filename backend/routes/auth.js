const express = require('express');
const { registerUser, loginUser, verifyOtp} = require('../services/authService.js');
const User = require('../models/User');
const { generateOTP, sendOtpEmail } = require('../utils/otp');
const router = express.Router();


// Registration endpoint
router.post('/register', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const response = await loginUser(email, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// OTP verification endpoint
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const result = await verifyOtp(email, otp);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});



router.post('/resend-otp', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        if (user.isVerified) {
            return res.status(400).json({ message: 'User is already verified' });
        }

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        await sendOtpEmail(email, otp);

        res.status(200).json({ message: 'OTP has been resent to your email' });
    } catch (error) {
        console.error('Detailed error:', error); // Log the detailed error
        res.status(500).json({ message: 'An error occurred while resending the OTP', error: error.message });
    }
});



module.exports = router;
