const express = require("express");
const { validateOtpMiddleWare } = require("./middlewares");
const { sendOtpController } = require("./controller");

const otpRouter = express.Router();
 
otpRouter.post("/", sendOtpController);

module.exports = {
    otpRouter
}
