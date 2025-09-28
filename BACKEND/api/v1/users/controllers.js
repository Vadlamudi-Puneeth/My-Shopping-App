const sendUserInfoController = (req, res) => {
    try{    
        console.log("Inside sendUserInfoController")

        // console.log(Object.keys(req));
        const user = req.currentUser;
        res.status(200).json({
            isSuccess: true,
            message: "User is logged in",
            data:{
                user:{
                    email: user.email,
                }
            }
        })

    }catch(err){
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        })
    }
}   

module.exports = {
    sendUserInfoController
}