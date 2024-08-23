import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendOtp } from '../utils/email.js';
import { storeOtp, getOtpData, deleteOtpData } from '../utils/otpStore.js';

const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[gmail|numetry]+\.(com|in)$/;
    return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[7-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
};

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

const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    if (!user.isVerified) throw new Error('User not verified');

    // Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return { token };
};

export { registerUser, verifyOtp, loginUser };