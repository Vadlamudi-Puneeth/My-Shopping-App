const { otpModel } = require("../../../models/otpSchema");
const bcrypt = require("bcrypt");

const validateOtpMiddleWare = async(req, res, next) => {
    try{
        const {email, otp} = req.body;
        
        const otpDoc = await otpModel.findOne().where("email").equals(email).sort("-createdAt");

        if(otpDoc == null){
            return res.status(400).json({
                isSuccess: false,
                message: "User doesnot exist"
            })
        }

        const {otp: hashedOtp} = otpDoc;

        const isCorrect = await bcrypt.compare(otp.toString(), hashedOtp);

        if(!isCorrect){
            return res.status(400).json({
                isSuccess: false,
                message: "Invalid otp"
            })
        }
        
        next();
    }catch(err){
        res.status(500).json({
            isSuccess: false,
            message: "Otp Verification failed"
        })
    }
}

module.exports = {
    validateOtpMiddleWare
}