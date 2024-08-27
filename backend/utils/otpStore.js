const otpStore = new Map();

/**
 * Stores OTP and associated user data in memory.
 * @param {string} email - The email address of the user.
 * @param {string} otp 
 * @param {object} userData 
 */
const storeOtp = (email, otp, userData) => {
    otpStore.set(email, { otp, userData });
    
    setTimeout(() => otpStore.delete(email), 5 * 60 * 1000);
};

/**
 * Retrieves OTP data associated with an email address.
 * @param {string} email - The email address of the user.
 * @returns {object|null} - The OTP data if available, otherwise null.
 */
const getOtpData = (email) => otpStore.get(email) || null;

/**
 * Deletes OTP data associated with an email address.
 * @param {string} email - The email address of the user.
 */
const deleteOtpData = (email) => otpStore.delete(email);

module.exports = { storeOtp, getOtpData, deleteOtpData };
