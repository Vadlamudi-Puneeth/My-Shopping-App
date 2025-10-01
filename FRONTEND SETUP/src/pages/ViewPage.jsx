import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { LoadingSkeleton } from "../components/ui/LoadingSkeleton";
import { useAuthContext } from "../context/AppContext";
import { ClipLoader } from "react-spinners";
import {Button} from "../components/ui/Button";

const ViewPage = () => {
  const [loading, setLoading] = useState(false);
  const [productInfo, setProductInfo] = useState({});
  const {isLoggedIn, addToCart, cart, removeFromCart, updatingCartState } = useAuthContext();

  const { productId } = useParams();

  const navigate = useNavigate();

  const getProductInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/view/${productId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const result = await response.json();
      setProductInfo(result.data.product);
    } catch (err) {
      console.error("Cannot get product:", err.message);
      alert("Cannot get product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductInfo();
  }, [productId]);

const handleAddToCart = () => {
  if (!isLoggedIn) {
    navigate("/Login");
    return;
  }
  console.log("Adding product:", productInfo._id);
  addToCart(productInfo._id);
};

const handleRemoveFromCart = () => {
  if (!isLoggedIn) {
    navigate("/Login");
    return;
  }
  if (!currentItem) {
    console.log("No current item found, cannot remove.");
    return;
  }
  console.log("Removing product:", currentItem.product._id);
  removeFromCart(currentItem.product._id); // safer than productInfo._id
};



  const currentItem = cart.find((elem)=> elem.product._id == productId);

  return (
    <div>
      {/* <Navbar /> */}
      {loading ? (
        <div className="w-100 h-75 rounded-xl m-auto">
          <LoadingSkeleton className="h-full" />
        </div>
      ) : (
        <div>
          <p className="text-center p-4 text-2xl">{productInfo.title}</p>
          <p className="text-center p-4 text-2xl">{productInfo.price}</p>
          <p className="text-center p-4 text-2xl">{productInfo.quantity}</p>
          <p className="text-center p-4 text-2xl">{productInfo.description}</p>
          <div className="flex gap-6 flex-wrap items-center justify-center">
            {
              productInfo.images?.map((imgUrl)=>{
                return <img src={imgUrl} className="h-50 w-50" />
              })
            }
          </div>
          {
            updatingCartState ? <ClipLoader /> : 
          <div className="flex justify-center p-6">
            {
              currentItem ? 
              (
                <div className="flex gap-4 justify-center">
                                <Button variant="outline-primary" onClick={handleRemoveFromCart}> - </Button>
                                <p>{currentItem.cartQuantity}</p>
                                <Button variant="outline-primary" onClick = {handleAddToCart}> + </Button>
                </div>
              ): (
                <Button onClick = {handleAddToCart}>Add to cart</Button>
              )
            }
          </div>
          }
        </div>
      )}
    </div>
  );
};

export default ViewPage;
