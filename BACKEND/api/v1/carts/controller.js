const { CartModel } = require("../../../models/cartSchema");

const getCartItemsController = async (req, res) => {
  try {
    console.log("--------- getCartItemsController ------------");
    const { _id } = req.currentUser; // Make sure req.currentUser is set by auth middleware

    const cartItems = await CartModel.find({
      user: _id,
    }).populate("product").lean();

    res.status(200).json({
      isSuccess: true,
      message: "Products fetched successfully",
      data: {
        cart: cartItems,
      },
    });
  } catch (err) {
    console.error("Error in getCartItemsController:", err);
    res.status(500).json({
      isSuccess: false,
      message: "Failed to fetch cart items",
      error: err.message,
    });
  }
};


const addItemToCartController = async(req, res) =>{

    console.log("------------ Inside addItemToCartController ----------------")
    try{
        const {productId} = req.params;
        const {_id} = req.currentUser;

        const cartItem = await CartModel.findOne({
            user: _id,
            product: productId,
        });

        if(cartItem){
            await CartModel.findByIdAndUpdate(cartItem._id, {
                cartQuantity: cartItem.cartQuantity + 1,
                // $inc: {cartQuantity: 1},
            })
        }else{
            await CartModel.create({
                user: _id,
                product: productId,
            });
        }

    const cartItems = await CartModel.find({
      user: _id,
    }).populate("product").lean();

        res.status(201).json({
            isSuccess: true,
            message: "product added to cart successfully",
            data:{
              cart: cartItems,
            }
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
            message: "Error in create addItemToCartController"
        })
    }

}

const removeItemFromCartController = async (req, res) => {
  console.log("------------ Inside removeItemFromCartController ----------------");
  try {
    const { productId } = req.params;
    const { _id } = req.currentUser;

    // Find the cart item
    const cartItem = await CartModel.findOne({
      user: _id,
      product: productId,
    });

    if (!cartItem) {
      return res.status(404).json({
        isSuccess: false,
        message: "Item not found in cart",
      });
    }

    if (cartItem.cartQuantity > 1) {
      // Decrease quantity
      await CartModel.findByIdAndUpdate(cartItem._id, {
        cartQuantity: cartItem.cartQuantity - 1,
      });
    } else {
      // If only 1 item left, remove it completely
      await CartModel.findByIdAndDelete(cartItem._id);
    }

    const cartItems = await CartModel.find({
      user: _id,
    }).populate("product").lean();

    res.status(200).json({
      isSuccess: true,
      message: "Item removed from cart successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      isSuccess: false,
      message: "Error in removeItemFromCartController",
      data: {
        cart: cartItems,
      }
    });
  }
};

module.exports = {
    addItemToCartController, getCartItemsController, removeItemFromCartController
}