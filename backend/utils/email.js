const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 587, // or 465 for secure
    secure: false, // true for 465, false for other ports
    auth: {
       user:'pranavmhargude@gmail.com',
        pass: 'xywqtmboulcvvjgx'
    }
});

const sendOtp = async (email, otp) => {
    const mailOptions = {
        from: 'pranavmhargude@gmail.com', 
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOtp };
