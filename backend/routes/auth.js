const express = require('express');
const { registerUser, loginUser } = require('../services/authService.js');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(201).json(result); // Use 201 Created status code for successful registration
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(400).json({ message: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await loginUser(email, password);
        if (result.role === 'admin') {
            res.status(200).json({ role: 'admin' }); // Return 200 OK status for successful login
        } else {
            res.status(200).json({ token: result.token }); // Return token for non-admin users
        }
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
});

module.exports = router;
