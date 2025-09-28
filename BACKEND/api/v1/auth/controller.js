const { userModel } = require("../../../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUpController = async(req, res) => {
    try{
        console.log("--------Inside userSignUpController------------");
        const {email, password} = req.body;
        const normalizedEmail = email?.toString().trim().toLowerCase();

        

        const newUser = await userModel.create({
            email: normalizedEmail,
            password,
        });

        res.status(201).json({
            isSuccess: true,
            message: "User Created",
            data:{
                newUser
            }
        })


    }catch(err){
        console.log(err.code);
        console.log(err.name);

        if(err.code == 11000){
            return res.status(409).json({
                isSuccess: false,
                message: "User Account Already Exists.. Try to Login!"
            })
        }
        else if(err.name == "ValidationError"){
            return res.status(400).json({
                isSuccess: false,
                message: err.message
            })
        }

        res.status(500).json({
            isSuccess: false,
            message: "Error in create user"
        })
    }
}

const userLoginController = async(req, res) => {     
    try{
        console.log("--------Inside userLoginController------------");
        const {email, password} = req.body;
        const normalizedEmail = email?.toString().trim().toLowerCase();

        const userDoc = await userModel
            .findOne({ email: normalizedEmail })
            .collation({ locale: 'en', strength: 2 })
            .lean();

        if(userDoc == null){
            return res.status(400).json({
                isSuccess: false,
                message: "User account doesnot exist! Please SignUp first"
            })
        }

        const {password: hashedPassword} = userDoc;
        const isCorrect = await bcrypt.compare(password.toString(), hashedPassword);

        if(!isCorrect){
            return res.status(400).json({
                isSuccess: false,
                message: "Incorrect password! Please try again"
            })
        }

        const token = jwt.sign({
            email: userDoc.email,
            _id: userDoc._id,
        }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60, // In seconds
        });

        console.log("token ", token);

        res.cookie("authorization", token, {
            httpOnly: true,
            sameSite: 'None', // Allow cookies for local development
            secure: true, // Set to false for local development (HTTP)
            maxAge: 60 * 60 * 24 * 1000
        })

        res.status(200).json({
            isSuccess: true,
            message: "User Login Succesfully",
            data:{
                user:{
                    email: userDoc.email,
                    _id: userDoc._id
                }
            }
        })


    }catch(err){
        res.status(500).json({
            isSuccess: false,
            message: "Error in login user"
        })
    }
}

const userLogoutController = async(req, res) => {
    try{
        console.log("---------inside logout controller-----------");

        // remove the cookie('authorization')

        res.cookie("authorization", "", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
            maxAge: 0,
        })

        res.status(200).json({
            isSuccess: true,
            message: "User logged out",
        })


    }catch(err){
        console.log("Error in user logout controller");
        res.status(500).json({
            isSuccess: false,
            message: "Internal Server Error",
        })
    }
}

module.exports = {
    userSignUpController, userLoginController, userLogoutController
}