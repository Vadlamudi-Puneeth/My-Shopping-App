const userSignUpValidator = (req, res, next) =>{
    try{
        console.log("---------Inside in userSignUpValidator----------");

        const {email, otp, password} = req.body;

        if(!email || !otp || !password){
            return res.status(400).json({
                isSuccess: false,
                message: "Email, otp and Password has to be mention"
            })
        }
        next();
    }catch(err){
        console.log("Err in userSignUpValidator");
        return res.status(500).json({
            isSuccess: false,
            message: "Error in Registering"
        })
    }

}


const userLoginValidator = (req, res, next) =>{
    try{
        console.log("---------Inside in userLoginValidator----------");

        const {email, otp, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                isSuccess: false,
                message: "Email and Password has to be mention"
            })
        }

        

        next();
    }catch(err){
        console.log("Err in userLoginValidator");
        return res.status(500).json({
            isSuccess: false,
            message: "Error in Registering"
        })
    }

}

module.exports = {userSignUpValidator, userLoginValidator}