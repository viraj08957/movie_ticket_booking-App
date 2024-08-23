const otpStore = new Map();

export const storeOtp = (email, otp, userData) => {
    const expirationTime = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    otpStore.set(email, { otp, userData, expirationTime });
};

export const getOtpData = (email) => {
    const otpData = otpStore.get(email);
    if (otpData && otpData.expirationTime > Date.now()) {
        return otpData;
    }
    otpStore.delete(email); // Remove expired OTP data
    return null;
};

export const deleteOtpData = (email) => {
    otpStore.delete(email);
};
