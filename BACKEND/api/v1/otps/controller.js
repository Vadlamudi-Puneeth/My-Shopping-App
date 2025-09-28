const { otpModel } = require("../../../models/otpSchema");
const { customAlphabet } = require("nanoid"); // <-- import customAlphabet
const { sendOtpEmail } = require("../../../utils/emailHelper");

// generate a 6-digit OTP using only numbers 1–9
const nanoid = customAlphabet("123456789", 6);

const sendOtpController = async (req, res, next) => {
    try {
        const { email } = req.body;

        const otp = nanoid();

        await sendOtpEmail(email, otp);

        await otpModel.create({ email, otp });

        res.status(201).json({
            isSuccess: true,
            message: "Otp Sent",
            otp  
        });

    } catch (err) {
        res.status(500).json({
            isSuccess: false,
            message: "Otp Verification failed",
            error: err.message
        });
    }
};

module.exports = { sendOtpController };
