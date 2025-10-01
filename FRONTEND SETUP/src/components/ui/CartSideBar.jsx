import { ClipLoader } from "react-spinners";
import { useAuthContext } from "../../context/AppContext";
import { Button } from "./Button";
import { useNavigate } from "react-router";
import { useState } from "react";
import { testRazorpay } from "../../utils/testRazorpay";


const CartSideBar = () => {

    const [address, setAddress] = useState("")

    const {cart, addToCart, removeFromCart, updatingCartState, handleCheckOut, placingOrder} = useAuthContext();
    
    const navigate = useNavigate();
    const handleViewProduct = (productId) => {
        navigate(`/view/${productId}`);
    }

return(
    <div className="bg-gray-200" >
                        {

                            cart.map((cartItem)=>{
                                return (
                                    <div className="p-4 border-1 cursor-pointer hover:bg-gray-50" onClick={() => {handleViewProduct(cartItem.product._id)}}>
                                        <img src={cartItem.product.images?.[0]} alt={cartItem.product.title} className="w-full"/>
                                        <p className="text-center">Rs. {cartItem.product.price}</p>
                                        <div className="flex gap-4 justify-center">
                                            <Button disabled = {updatingCartState}
                                            variant="outline-primary" onClick={() => removeFromCart(cartItem.product._id)}> - </Button>
                                            {
                                                updatingCartState ? <ClipLoader/> :
                                                <p>{cartItem.cartQuantity}</p> 

                                            }
                                            <Button variant="outline-primary" onClick={() => addToCart(cartItem.product._id)}> + </Button>

                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div className="flex flex-col gap-3 items-center justify-center h-40">
                            <div className="w-full">
                                <p className="text-lg font-semibold text-center mb-2">
                                    Total: Rs. {cart.reduce((total, item) => total + (item.product.price * item.cartQuantity), 0)}
                                </p>
                            </div>
                            <textarea className="border-2 px-1.1 py-0.5 rounded-md w-full" placeholder="Type your address here...." type="text" value={address} onChange={(e)=>setAddress(e.target.value)}></textarea>
                            <Button disabled={address.length == 0 || cart.length === 0} onClick={()=>{handleCheckOut(address)}}>
                                {placingOrder ? "Processing..." : "Pay with Razorpay"}
                            </Button>
                            <Button variant="outline-primary" onClick={()=>{testRazorpay()}}>
                                Test Razorpay
                            </Button>
                        </div>
                        </div>
        )
}

export {CartSideBar};