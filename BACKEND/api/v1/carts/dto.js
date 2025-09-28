const { isValidObjectId } = require("mongoose");

const addItemToCartValidator = (req, res, next) =>{
    try{
        console.log("---------Inside in addItemToCartValidator----------");

        const { productId } = req.params;

        if( !productId){
            return res.status(400).json({
                isSuccess: false,
                message: "userId and productId are required"
            })
        }

        if(!isValidObjectId(productId)){
            return res.status(400).json({
                isSuccess: false,
                message: "Product Id not found"
            })
        }

        next();
    }catch(err){
        console.log("Err in addItemToCartValidator");
        res.status(500).json({
            isSuccess: false,
            message: "Error in Registering"
        })
    }

}

module.exports = {
    addItemToCartValidator
}