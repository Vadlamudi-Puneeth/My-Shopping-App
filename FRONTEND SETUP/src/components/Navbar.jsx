import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { Link, useNavigate, useSearchParams } from "react-router";
import { Button } from "./ui/button";
import { ShowErrorToast, showSuccessToast } from "../../utils/toastMessageHelper";
import { AuthContext, useAuthContext } from "../context/AppContext";

const Navbar = ({searchBox = true}) =>{
    
    const [query] = useSearchParams();
    const selectDefaultValue = query.get("text");

    const [searchText, setSearchText] = useState( selectDefaultValue || "");
    const [user, setUser] = useState({isLoggedIn: true});
    const navigate = useNavigate();

    const {isLoggedIn, handleLogOut} = useAuthContext(AuthContext);


    const handleSearch = () =>{
        navigate(`/search?text=${searchText}`);
    }


    return(
        <div className="flex px-6 py-4 bg-amber-200 justify-between">

            <div className="text-xl font-bold text-purple-800">My Shopping App</div>

            {
                searchBox && (
                    <div className="flex gap-4">
                
                            <input className="px-2 py-1 border-1 border-amber-900 rounded-lg"
                            value={searchText}
                            onChange={(e)=>{setSearchText(e.target.value)}} /> 

                            <button 
                            className="px-2 py-1 border-1 border-amber-900 rounded-lg cursor-pointer bg-amber-700 text-white"
                            onClick={handleSearch}
                            >Search</button>

                    </div>
                )
            }
           
            {/* <div className="flex gap-4">
                
                <input className="px-2 py-1 border-1 border-amber-900 rounded-lg"
                value={searchText}
                onChange={(e)=>{setSearchText(e.target.value)}} /> 

                <button 
                className="px-2 py-1 border-1 border-amber-900 rounded-lg cursor-pointer bg-amber-700 text-white"
                onClick={handleSearch}
                >Search</button>

            </div> */}

            <div className="flex gap-4 items-center">
               
                <Link to="/" className="text-blue-700 underline">Home</Link>

                {
                    isLoggedIn ? (
                        <Button onClick={handleLogOut}>Logout</Button>
                    ):(
                        <Link to="/Login" className="text-blue-700 underline">Login</Link>
                    )
                }

                <div className="border-1 p-2 rounded-full text-white bg-amber-700">
                    <IoMenu className="cursor-pointer"/>
                </div>

            </div>
        </div>
    )
}

export default Navbar;