import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import {ShowErrorToast, showSuccessToast}  from "../../utils/toastMessageHelper";
import { config } from "../config";

const SignUpPage = () =>{

    const navigate = useNavigate();

    const [isOtpSent, setIsOtpSent] = useState(false);
    const [sendingOtp, setSendingOtp] = useState(false);
    const [signingUpUser, setSigningUpUser] = useState(false);

    const handleUserSignUp = async(e) => {

        try{
            setSigningUpUser(true);
            const email = e.target.email.value;
            const password = e.target.password.value;
            const otp = e.target.otp.value;
            
            console.log(email, password);
            
            const response = await fetch(`${config.BACKEND_URL}/auth/signup`,{
            method: "POST",
            body: JSON.stringify({
                email,
                otp,
                password 
            }),
            headers: {
                "content-type" : "application/json" 
            },
            credentials: "include",
            cache: "no-store"
        })

        const resData = await response.json(); //

        if(response.status == 201){
            showSuccessToast("Successfully Registered");
            navigate("/Login");
        }else if(response.status == 409){
            ShowErrorToast(resData.message);
            navigate("/Login");
        }
        else{
             ShowErrorToast(resData.message || "Registration failed");
        }
        
        }catch(err){
            ShowErrorToast(err.message);
        }finally{
            setSigningUpUser(false);
        }

    }

    const handleSendOtp = async(e) => {
        try{
        setSendingOtp(true);
        const email = e.target.email.value;
        console.log(email);

        const response = await fetch(`${config.BACKEND_URL}/otps/`,{
            method: "POST",
            body: JSON.stringify({
                email,
                // password 
            }),
            headers: {
                "content-type" : "application/json" 
            },
            credentials: "include",
            cache: "no-store"
        })

        if(response.status == 201){
            showSuccessToast("Otp Sent");
            setIsOtpSent(true);
        }
        else{
            const res = await response.json();
            ShowErrorToast(res.message);
        }

        }catch(err){
            console.log("error in handleSendOtp");
            ShowErrorToast("unable to send otp");
            // alert("unable to send otp");
        }finally{
            setSendingOtp(false);
        }
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();

        if(isOtpSent){
            handleUserSignUp(e);
        }else{
            handleSendOtp(e);
        }

    }

    return(
        <div>
            <Navbar searchBox = {false}/>
            <div className="flex flex-col items-center p-10">

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
                    

                            <div className="flex gap-4 items-center" >
                                <label>Email: </label> 
                                <input type="email" name="email" required className="border-1 border-amber-700 px-2 py-1 rounded-md read-only:bg-gray-200 read-only:cursor-none" readOnly={isOtpSent}/>
                            </div>
                        

                    {
                        isOtpSent && (

                            <>
                                <div className="flex gap-4 items-center" >
                                    <label>Otp: </label> 
                                    <input type="string" name="otp" required className="border-1 border-amber-700 px-2 py-1 rounded-md"/>
                                </div>

                                <div className="flex gap-4 items-center" >
                                    <label>Password: </label> 
                                    <input type="password" name="password" required className="border-1 border-amber-700 px-2 py-1 rounded-md"/>
                                </div>
                            </>

                        ) 
                    }

                    {
                        sendingOtp || signingUpUser ? (
                            <div className="flex item-center justify-center p-10">
                                <PuffLoader size={50}/>
                            </div>
                        ) : (
                            <>
                                {
                                    isOtpSent ? (
                                        <button type="submit" className="border px-2 py-2 border-md bg-amber-700 text-white/95 self-center tracking-wider cursor-pointer hover:bg-amber-600" >Sign Up</button>
                                    ) : (
                                        <button type="submit" className="border px-2 py-2 border-md bg-amber-700 text-white/95 self-center tracking-wider cursor-pointer hover:bg-amber-600" >Send Otp</button>
                                    )
                                }
                            </>
                        )
                    }




                </form>

               <p className="p-4">Already Registered? <Link to="/Login" className="text-blue-600 underline" >Login</Link></p> 
            </div>
        </div>
    )
}

export default SignUpPage;