const express = require("express");
const { userSignUpController, userLoginController, userLogoutController} = require("./controller");
const { userSignUpValidator, userLoginValidator } = require("./dto");
const { validateOtpMiddleWare } = require("../otps/middlewares");

const authRouter = express.Router();
 
authRouter.post("/signup", userSignUpValidator, validateOtpMiddleWare, userSignUpController);
authRouter.post("/login", userLoginValidator, userLoginController);
authRouter.get("/logout", userLogoutController);

module.exports = {
    authRouter
}
