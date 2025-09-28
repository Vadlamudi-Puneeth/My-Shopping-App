import { createContext, useContext, useEffect, useState } from "react";
import { ShowErrorToast, showSuccessToast } from "../../utils/toastMessageHelper";
import { config } from "../config";
import { initializeRazorpay, openRazorpayPayment } from "../utils/razorpayHelper";

const AuthContext = createContext();


const AppContextProvider = ({children}) => {
    
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState({isLoggedIn: false});
  const [updatingCartState, setUpdatingCartState] = useState(false);
  const [cart, setCart] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);

  const {isLoggedIn} = user;

  const getLoggedInUser = async() => {

    try{

      const response = await fetch(`${config.BACKEND_URL}/users/me`, {
        method: "GET",
        credentials: "include",
      });
      
      if(response.status == 200 || response.status == 304){
        const result = await response.json();
        setUser({
          isLoggedIn: true,
          ...result.data.user,
        })
      }else{
        ShowErrorToast("Please Login");
      }
      
    }catch(err){
      console.log(err);
      ShowErrorToast("Error during user validation", err.message);
    }finally{
      setAppLoading(false);
    }
  }

  useEffect(() => {
    if(isLoggedIn){
      getCartItems();
    }else{
      setCart([]);
    }
    getLoggedInUser();
  }, [isLoggedIn])

  const handleLogOut = async() => {
    try{ 
      setAppLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`,{
        method: "GET",
        credentials: "include"
      }); 

      if(response.status == 200){
        showSuccessToast("you are now logged out");
        setUser({isLoggedIn: false});
      }else{
        const data = await response.json();
        ShowErrorToast(data.message);
      }

    }catch(err){
      console.log(err);
    }finally{
      setAppLoading(false);
    }

  }

  const getCartItems = async() => {
    try{
      console.log("Calling getCartItems API..."); 
      setUpdatingCartState(true);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/`, {
        method: "GET",
        credentials: "include",
      });
      const result = await response.json();
      setCart(result.data.cart);
    }catch(err){
      console.log("Error during getting cart items");
    }finally{
      setUpdatingCartState(false);
    }
  }

const addToCart = async (productId) => {
  try {
    setUpdatingCartState(true);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ quantity: 1 }) // or whatever your backend expects
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }
    const result = await response.json();
    setCart(result.data.cart);

    // await getCartItems(); // refresh from backend
  } catch (err) {
    console.log("Error in add to cart", err);
  } finally {
    setUpdatingCartState(false);
  }
};

const removeFromCart = async (productId) => {
  try {
    console.log("Calling backend to remove:", productId);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to remove from cart");
    }

      const result = await response.json();

    if (result?.data?.cart) {
      setCart(result.data.cart); // ✅ only update if cart is present
    } else {
      console.warn("No cart returned by API, refreshing cart manually...");
      await getCartItems(); // ✅ fallback: re-fetch entire cart
    }
  } catch (err) {
    console.error("Error in remove from cart", err);
  }
};

  
  const handleSetUser = (data) => {
    // add any logic user
    setUser(data);
  }

  const handleCheckOut = async(address) => {
    try{
      console.log("Starting checkout process...");
      setPlacingOrder(true);
      
      // Initialize Razorpay
      console.log("Initializing Razorpay...");
      const isRazorpayLoaded = await initializeRazorpay();
      if (!isRazorpayLoaded) {
        console.error("Razorpay SDK failed to load");
        ShowErrorToast("Razorpay SDK failed to load");
        return;
      }
      console.log("Razorpay SDK loaded successfully");

      // Calculate total amount from cart
      const totalAmount = cart.reduce((total, item) => {
        return total + (item.product.price * item.cartQuantity);
      }, 0);
      console.log("Total amount calculated:", totalAmount);

      // For demo purposes, we'll create a simple payment without order_id
      // Razorpay payment options
      const paymentOptions = {
        amount: totalAmount * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'Demo Store',
        description: `Payment for ${cart.length} items`,
        customer_name: user.name || 'Demo User',
        customer_email: user.email || 'demo@example.com',
        customer_contact: user.phone || '9999999999',
      };

      console.log("Opening Razorpay payment modal...");
      // Open Razorpay payment modal
      const paymentResponse = await openRazorpayPayment(paymentOptions);
      console.log("Payment response received:", paymentResponse);
      
      if (paymentResponse.razorpay_payment_id) {
        console.log("Payment successful, placing order...");
        // For demo purposes, just show success message and clear cart
        showSuccessToast("Payment successful! Order placed successfully.");
        setCart([]);
        
        // Optional: Still call backend if needed
        try {
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders/`,{
            method: "POST",
            credentials: "include",
            body: JSON.stringify({
              address,
              payment_id: paymentResponse.razorpay_payment_id,
              order_id: paymentResponse.razorpay_order_id || `order_${Date.now()}`
            }),
            headers: {
              'content-type': "application/json",
            }
          });

          const result = await response.json();
          if(!result.isSuccess){
            console.warn("Backend order placement failed:", result.message);
          }
        } catch (backendError) {
          console.warn("Backend order placement failed:", backendError);
        }
      }

    }catch(err){
      console.error("Payment error:", err);
      if (err.message === 'Payment cancelled by user') {
        ShowErrorToast("Payment was cancelled");
      } else {
        ShowErrorToast("Payment failed. Please try again.");
      }
    }finally{
      setPlacingOrder(false);
    }
  }

  const sharedValues = {
    appLoading,
    isLoggedIn,
    user,
    handleSetUser,
    handleLogOut,
    cart,
    addToCart,
    removeFromCart,
    updatingCartState,
    handleCheckOut,
    placingOrder
  }


  return (
    <AuthContext value={sharedValues} >{children}</AuthContext>
  )

}



const useAuthContext = () => {
    return useContext(AuthContext);
}

export {AppContextProvider, useAuthContext, AuthContext};