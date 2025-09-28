const express = require("express");
const { placeOrderValidator } = require("./dto");
const { placeOrderController } = require("./controller");
const { validateLoggedInUserMiddleware } = require("../middleware");

const ordersRouter = express.Router();

ordersRouter.post("/", validateLoggedInUserMiddleware,placeOrderValidator, placeOrderController);

module.exports = {
    ordersRouter
}
