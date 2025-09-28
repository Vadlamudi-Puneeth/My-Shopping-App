const jwt = require("jsonwebtoken");

const validateLoggedInUserMiddleware = async(req, res, next) => {
    try{
        
        const {authorization} = req.cookies;

        if(!authorization){
            return res.status(401).json({
                isSuccess: false,
                message: "Users needs to Login ",
            })
        }

        
        jwt.verify(authorization, process.env.JWT_SECRET, (err, data)=>{
            if(err){
                console.log("Invalid Token... may be hacking attempt");
                return res.status(401).json({
                    isSuccess: false,
                    message: "User not logged in"
                })
            }else{ 
                console.log(data);
                req.currentUser = data;
                next();
            }
        });

    }catch(err){
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error"
        })
    }
}

module.exports = {
    validateLoggedInUserMiddleware
}