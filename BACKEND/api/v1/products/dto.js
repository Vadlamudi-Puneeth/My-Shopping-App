const createProductValidator = (req, res, next) =>{
    console.log("Inside createProductValidator");
    try{

        const {title, price, description, quantity} = req.body;

        if(!quantity || quantity < 0){
            return res.status(400).json({
            isSuccess: false,
            message: "quantity should be > 0"
        })};

        if(!price || price < 0){
            return res.status(400).json({
                isSuccess: false,
                message: "price should be greater > 0"
            })
        }

        if(!title || title.length < 2){
            return res.status(400).json({
                isSuccess: false,
                message: "Title is less"
            })
        }

        if(!description || description.length < 8){
            return res.status(400).json({
                isSuccess: false,
                message: "description is very less"
            })
        }

        console.log("validation successfull");
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: "products verified unsuccessfull"
        })
    }
}

const updateProductValidator = (req, res, next)  =>{
    console.log("Inside updateProductValidator");
    try{

        const {title, price, description, quantity} = req.body;

        if(quantity < 0){
            return res.status(400).json({
            isSuccess: false,
            message: "quantity should be > 0"
        })};

        if(price < 0){
            return res.status(400).json({
                isSuccess: false,
                message: "price should be greater > 0"
            })
        }

        if(title && title.length < 2){
            return res.status(400).json({
                isSuccess: false,
                message: "Title is less"
            })
        }

        if(description && description.length < 8){
            return res.status(400).json({
                isSuccess: false,
                message: "description is very less"
            })
        }

        console.log("validation successfull");
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: "products verified unsuccessfull"
        })
    }
}

const validateProductValidator = (req, res, next) => {
    try{

        const {productId} = req.params;

        if(!productId){
            return res.status(400).json({
                isSuccess: false,
                message: "product id is required",
                data:{

                }
            })
        }

        next();
    }catch(err){
        console.log(err);
        res.status(500).json({
            isSuccess: false,
            message: "products verified unsuccessfull"
        })
    }
}

const validateViewProduct = (req, res, next) =>{
    try{
        console.log("________inside validateview product");
        
        const productId = req.params;
        if(!productId){
            return res.status(400).json({
                isSuccess: false,
                message: "product id is required",
                data: {}
            })
        }

        // validate for product id is in obj id format of mongo db



        next();

    }catch(err){
        console.log("------------err in product validator----------------");
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
            data:{}
        })
    };
}

module.exports = {
    createProductValidator, updateProductValidator, validateProductValidator, validateViewProduct
}