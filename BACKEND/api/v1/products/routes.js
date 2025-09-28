const express = require("express");
const { ProductController, getAllProductController, updateProductController, deleteProductController, listProductController, viewproductController} = require("./controller");
const { createProductValidator, validateViewProduct, updateProductValidator } = require("./dto");
const { validateLoggedInUserMiddleware } = require("../middleware");
const productRouter = express.Router();

// console.log("checking for the validation and proceed further");

// productRouter.use(validateLoggedInUserMiddleware); // router level middleware

productRouter.get("/all", validateLoggedInUserMiddleware, getAllProductController );
productRouter.get("/list", listProductController);

// --------- admin functionalities
productRouter.post("/", validateLoggedInUserMiddleware, ProductController);
productRouter.patch("/:productId",validateLoggedInUserMiddleware, updateProductValidator, updateProductController);
productRouter.delete("/:productId",validateLoggedInUserMiddleware, deleteProductController);
productRouter.get("/view/:productId", validateViewProduct, viewproductController);


module.exports = {productRouter};
