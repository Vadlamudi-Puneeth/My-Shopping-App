const placeOrderValidator = (req, res, next) => {
    try{
        console.log("--------inside placeValidator dto---------");
        const {address} = req.body;
        
        
        if(address == "" || address === undefined || address === null){
            return res.status(400).json({
                isSuccess: false,
                message: "products and address are required",
            })
        }
        
        // for(let product of products){
        //     const {productId, quantity} = products;
        //     if(!productId || !quantity || quantity < 1){
        //         return res.status(400).json({
        //             isSuccess: false,
        //             message: "Product Validation failed either productid or quantity is missing",
        //         })
        //     }   
        // }

        //   if(!isValidObjectId(productId)){
        //     return res.status(400).json({
        //         isSuccess: false,
        //         message: "Product Id Invalid"
        //     })
        // }



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
    placeOrderValidator
}