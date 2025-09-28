import { Link, useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { PuffLoader } from "react-spinners";
import {ShowErrorToast, showSuccessToast}  from "../../utils/toastMessageHelper";
import { config } from "../config";
import { useAuthContext } from "../context/AppContext";

const LoginPage = () =>{

    const navigate = useNavigate();

    const [loggingUser, setLoggingUser] = useState(false);
    const {handleSetUser} = useAuthContext();

    
    const handleSubmit = async(e) => {
        e.preventDefault();

          try{
            setLoggingUser(true);
            const email = e.target.email.value;
            const password = e.target.password.value;
            
            console.log(email, password);
            
            const response = await fetch(`${config.BACKEND_URL}/auth/login`,{
            method: "POST",
            body: JSON.stringify({
                email,
                password 
            }),
            headers: {
                "content-type" : "application/json" 
            },
            credentials: "include",
            cache: "no-store"
        })

        const resData = await response.json(); //

        if(response.status == 200){
            showSuccessToast("Successfully Login");
            handleSetUser({
                isLoggedIn: true,
                ...resData.data.user
            })
            navigate("/");
        }else{
             ShowErrorToast(resData.message || "Login failed");
        }
        
        }catch(err){
            ShowErrorToast(err.message);
        }finally{
            setLoggingUser(false);
        }

    }

    return(
        <div>
            <div className="flex flex-col items-center p-10">

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" >
                    

                            <div className="flex gap-4 items-center" >
                                <label>Email: </label> 
                                <input type="email" name="email" required className="border-1 border-amber-700 px-2 py-1 rounded-md read-only:bg-gray-200 read-only:cursor-none"/>
                            </div>

                            <div className="flex gap-4 items-center" >
                                <label>Password </label> 
                                <input type="password" name="password" required className="border-1 border-amber-700 px-2 py-1 rounded-md read-only:bg-gray-200 read-only:cursor-none" />
                            </div>
                    

                    {
                        loggingUser ? (
                            <div className="flex item-center justify-center p-10">
                                <PuffLoader size={50}/>
                            </div>
                        ) : (
                            <>  
                                <button type="submit" className="border px-2 py-2 border-md bg-amber-700 text-white/95 self-center tracking-wider cursor-pointer hover:bg-amber-600" >Login</button>      
                            </>
                        )
                    }




                </form>

               <p className="p-4">Not Registered yet <Link to="/SignUpPage" className="text-blue-600 underline" >Signup</Link></p> 
            </div>
        </div>
    )
}

export default LoginPage;