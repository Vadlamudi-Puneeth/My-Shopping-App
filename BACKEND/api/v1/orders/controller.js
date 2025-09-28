const { CartModel } = require("../../../models/cartSchema");
const { productModel } = require("../../../models/productSchema");

const placeOrderController = async(req, res) => {
    try{
        console.log("--------Inside placeOrderController-------")

        const {address} = req.body;
        const {_id:userId} = req.currentUser;

        const cartItems = await CartModel.find({
            user: userId
        })

        let allItemsAreInStock = true;

        for(let product of cartItems){
            const {product:productId, cartQuantity:quantity} = product;
            const updatedProduct = await productModel.findByIdAndUpdate(product.productId, {
                $inc: {quantity: quantity-1 * quantity},
            });
            if(updatedProduct && updatedProduct.quantity < 0){
                allItemsAreInStock = false;
            }
        }

        if(!allItemsAreInStock){
            for(let product of cartItems){
                const {product:productId, cartQuantity:quantity} = product;
                await productModel.findByIdAndUpdate(product.productId, {
                    $inc: {quantity: quantity},
                });
            }

            return res.status(500).json({
            isSuccess: false,
            message: "Some Items are not in stock",
        })

        }



        res.status(201).json({
            isSuccess: true,
            message: "Order Placed",
        })


    }catch(err){
        console.log(err.code);
        console.log(err.name);
        if(err.name == "ValidationError" || err.code == 11000){
            return res.status(400).json({
                isSuccess: false,
                message: err.message
            })
        }

        res.status(500).json({
            isSuccess: false,
            message: "Error in placeOrderController"
        })
    }
}

module.exports = {
    placeOrderController
}