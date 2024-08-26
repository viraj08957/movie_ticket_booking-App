const sendOtp = async (email, otp) => {
    // Implement your email sending logic here, such as using Nodemailer or an external service like SendGrid.
    console.log(`Sending OTP ${otp} to email ${email}`);
};

module.exports = { sendOtp };
