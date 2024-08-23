import express from 'express';
import { registerUser, verifyOtp, loginUser } from '../Service/authService.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const result = await verifyOtp(req.body.email, req.body.otp);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const result = await loginUser(req.body.email, req.body.password);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;