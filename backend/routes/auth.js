const express = require('express');
const { registerUser, verifyOtp, loginUser } = require('../services/authService.js');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Registration error:', error.message); // Improved error logging
        res.status(400).json({ message: error.message });
    }
});


router.post('/verify-otp', async (req, res, next) => {
    try {
        const result = await verifyOtp(req.body.email, req.body.otp);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const result = await loginUser(req.body.email, req.body.password);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
