const express = require('express');
const { registerUser, verifyOtp, loginUser } = require('../services/authService.js');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        console.error('Registration error:', error.message); 
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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginUser(email, password);

        if (result.role === 'admin') {
            
            res.json({ role: 'admin' });
        } else {
          
            res.json({ token: result.token });
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;
