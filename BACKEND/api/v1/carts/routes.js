const express = require("express");
const { addItemToCartValidator } = require("./dto");
const { addItemToCartController, getCartItemsController, removeItemFromCartController } = require("./controller");
const { validateLoggedInUserMiddleware } = require("../middleware");


const cartRouter = express.Router();

cartRouter.get("/", validateLoggedInUserMiddleware,getCartItemsController);
cartRouter.post("/:productId", validateLoggedInUserMiddleware, addItemToCartValidator, addItemToCartController);
cartRouter.delete("/:productId", validateLoggedInUserMiddleware, removeItemFromCartController);

module.exports = {
    cartRouter
}
