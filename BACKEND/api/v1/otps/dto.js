const userSignUpValidator = (req, res, next) =>{
    try{
        console.log("---------Inside in userSignUpValidator----------");

        const {email, otp, password} = req.body;

        if(!email || !otp || !password){
            res.status(400).json({
                isSuccess: false,
                message: "Email, otp and Password has to be mention"
            })
        }

        

        next();
    }catch(err){
        console.log("Err in userSignUpValidator");
        res.status(500).json({
            isSuccess: false,
            message: "Error in Registering"
        })
    }

}

module.exports = {userSignUpValidator}