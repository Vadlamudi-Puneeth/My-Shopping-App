import { Link } from "react-router";
import Navbar from "../components/Navbar";

const NotFoundPage = ({user}) =>{
    const {isLoggedIn} = user;

    return(
        <div>
            <Navbar />

            <div className="flex flex-col items-center justify-center p-10">
                <h1 className="p-4 text-3xl">Oops.. Page Not Found!!</h1>

                {
                    isLoggedIn ? (
                        <Link to="/" className="text-blue-1000 underline" >click here to go home</Link>
                    ): (
                        <Link to="/Login" className="text-blue-1000 underline" >click here to Login</Link>
                    )
                }

            </div>
        </div>
    )
}

export default NotFoundPage;