
const data = require("./data.json");
// console.log(data);

const createProduct = async(data) =>{

    try{

        const resp = await fetch(`http://localhost:3333/api/v1/products`, {
            method: "POST",
            body: JSON.stringify(data),
            headers:{
                'content-type': 'application/json'
            }
        });

        const result = await resp.json();

        if(resp.status != 201){
            console.log("product not created");
        }

    }catch(err){
        console.log("Error creation product", err.message);
    }
}

const createProductMigration = async() =>{
    const {products} = data;
    for(let i = 0; i < products.length; i++){
        const productData = products[i];
        productData.price = Math.round(productData.price * 85); // converting dollars into rupees
        await createProduct(productData);
        console.log("product created ", i + 1);
    }
}

createProductMigration();