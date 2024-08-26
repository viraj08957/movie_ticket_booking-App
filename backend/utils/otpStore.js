const otpStore = new Map();

const storeOtp = (email, otp, userData) => {
    otpStore.set(email, { otp, userData });
    setTimeout(() => otpStore.delete(email), 5 * 60 * 1000); // Delete OTP after 5 minutes
};

const getOtpData = (email) => otpStore.get(email);

const deleteOtpData = (email) => otpStore.delete(email);

module.exports = { storeOtp, getOtpData, deleteOtpData };
