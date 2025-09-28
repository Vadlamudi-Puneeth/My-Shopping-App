const express = require("express");
const { validateLoggedInUserMiddleware } = require("../middleware");
const { sendUserInfoController } = require("./controllers");

const usersRouter = express.Router();

usersRouter.get("/me", validateLoggedInUserMiddleware, sendUserInfoController);

module.exports = {
    usersRouter
}

