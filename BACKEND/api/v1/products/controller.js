const { productModel } = require("../../../models/productSchema");

const ProductController = async(req, res) =>{

    console.log("------------ Inside product controller ----------------")
    try{
        const body = req.body;
        const newProduct = await productModel.create(body);

        res.status(201).json({
            isSuccess: true,
            message: "product created successfully",
            data: {product: newProduct}
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
            message: "Error in create product controller"
        })
    }

}

const getAllProductController = async(req, res) =>{

    try{      
        const products = await productModel.find();
        
        return res.status(200).json({
            isSuccess: true,
            data:{
                products
            }
        })
    }catch(err){
        return res.status(500).json({
            isSuccess: false
        })
    }
}

const updateProductController = async(req, res) =>{
    try{
        const data = req.body;
        const {productId} = req.params;

        const updatedProducts = await productModel.findByIdAndUpdate(productId, data, {
            new: true,
            runValidators: true // Is we check updatevalidators then it is no need 
        }).lean();

        if(updatedProducts == null){
            return res.status(404).json({
                isSuccess: false,
                message: "Id does not match",
            })
        }

        res.status(200).json({
            isSuccess: true,
            data: {updatedProducts}
        })

    }catch(err){
        res.status(400).json({
            isSuccess: false
        })
        console.log(err);
    }
}

const deleteProductController = async(req, res) =>{
 try{
        const {productId} = req.params;

        const deleteProducts = await productModel.findByIdAndDelete(productId);

        if(!deleteProducts){
            return res.status(404).json({
                isSuccess: false,
                message: "Id not match"
            })
        }

        return res.status(200).json({
            isSuccess: true,
            data: deleteProducts
        })

    }catch(err){
        res.status(500).json({
            isSuccess: false
        })
        console.log(err);
    }
}

const listProductController = async(req, res) =>{
    console.log("list product controller");
    try{
        // const limit = 5;
        const { limit = 5, page = 1, select = "title price quantity images",q = "", maxPrice, minPrice, sort="title -createdAt"} = req.query;

        const searchRegex = new RegExp(q, "i");

        const selectedItem = select.split(",").join(" ");
        
        let limitNum = parseInt(limit);
        if(limitNum <= 5 || Number.isNaN(limitNum)){
            limitNum = 5
        }
        
        if(limitNum >= 50){
            limitNum = 50;
        }
        
        let pageNum = parseInt(page);

        if(pageNum <= 0 || Number.isNaN(pageNum)){
            pageNum = 1
        }
        // const page = 1;
        const skip = (pageNum - 1) * limit;
        const query = productModel.find();

        query.skip(skip);    
        query.limit(limitNum);
        query.select(selectedItem);
        query.sort(sort);
        query.or([{title: searchRegex},{description: searchRegex}]) 
        
        if(maxPrice && !Number.isNaN(Number(maxPrice))){
            products.where("price").lte(maxPrice);
        }

        if(minPrice && !Number.isNaN(Number(minPrice))){
            products.where("price").gte(minPrice);
        }

        const queryCopy = query.clone();
        
        const filterQuery = {
        $or: [{ title: searchRegex }, { description: searchRegex }]
        };

        if (maxPrice && !Number.isNaN(Number(maxPrice))) {
        filterQuery.price = { ...filterQuery.price, $lte: Number(maxPrice) };
        }

        if (minPrice && !Number.isNaN(Number(minPrice))) {
        filterQuery.price = { ...filterQuery.price, $gte: Number(minPrice) };
        }

        const totalDocs = await productModel.countDocuments(filterQuery);


        console.log(totalDocs);
        console.log(limitNum);
        const totalPage = Math.ceil(totalDocs/limitNum);
        console.log(totalPage);
        const products = await query;
        
        return res.status(200).json({ 
            isSuccess: true,
            currentPage: pageNum,
            limit: Math.min(limitNum, products.length),
            totalPage,
            totalDocs: totalDocs,
            data:{
                products
            }
        })
    }catch(err){
        res.status(500).json({
            isSuccess: false,
            message: "Not able to list the products"
        })
    }
    console.log(totalPage);
}

const viewproductController = async(req, res) =>{

    try{      

        const {productId} = req.params;
        const result = await productModel.findById(productId)

         if(result == null){
            return res.status(404).json({
                isSuccess: false,
                message: "Product Not found for given product id",
            })
        }
        
        return res.status(200).json({
            isSuccess: true,
            message: "product found",
            data:{
                product: result,
            }
        })
    }catch(err){
        return res.status(500).json({
            isSuccess: false
        })
    }
}

module.exports = {
    getAllProductController,
    ProductController,
    updateProductController,
    deleteProductController,
    listProductController,
    viewproductController
}