const otpStore = new Map();

const storeOtp = (email, otp, userData) => {
    otpStore.set(email, { otp, userData });
};

const getOtpData = (email) => otpStore.get(email);

const deleteOtpData = (email) => otpStore.delete(email);

module.exports = { storeOtp, getOtpData, deleteOtpData };
