import { useNavigate, useSearchParams } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";
import Paginator from "../components/Paginator";
import { config } from "../config";
import { ShowErrorToast } from "../../utils/toastMessageHelper";

const LIMIT_PER_PAGE = 10;

const SearchPage = () =>{
    
    const [query] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(0);

    const navigate = useNavigate();

    console.log(query.get("text"));

    const searchText = query.get("text");

    const getAllProducts = async() =>{
        
        try{
            setLoading(true);
            const response = await fetch(`${config.BACKEND_URL}/products/list?q=${searchText}&limit=${LIMIT_PER_PAGE}&page=${page}`, {
                method: "GET",
                credentials: "include",
                cache: "no-store"
            });

            const result = await response.json();
            console.log(result);
            
            if(response.status === 200 && result.isSuccess){
                setProducts(result.data.products);  
                setTotal(result.totalDocs);
                setLimit(result.limit);
            } else {
                ShowErrorToast(result.message || "Failed to fetch products");
                setProducts([]);
                setTotal(0);
            }

        }catch(err){
            ShowErrorToast("Cannot get the products: " + err.message);
            setProducts([]);
            setTotal(0);
        }finally{
            setLoading(false);
        }

    
    };

    useEffect(()=>{
        getAllProducts();
    },[searchText, page]);

    const handleViewProduct = (productId) => {
        navigate(`/view/${productId}`);
    }

    return(
        <div>
            {/* <Navbar /> */}
            <div>
                {
                    loading? (
                    <div className="fixed top-1/2 left-1/2 -translate-1/2" ><ClimbingBoxLoader color="#23b874" size={50} /></div> ) 
                            : 
                    (

                        <div className="flex">

                        <div className="w-50 bg-blue-100"></div>  

                        <div className="p-8 flex-1 flex flex-col gap-4 bg-emerald-100">
                            {products.map((elem, idx) => (
                            <div
                            onClick={() => handleViewProduct(elem._id)}
                            key={idx} className="border-1 border-amber-900 rounded-lg p-5 flex hover:bg-white/40 cursor-pointer hover:scale-102 transition" >

                                <div className="w-40 h-40">
                                    <img src={elem.images?.[0]} alt={elem.title} />     
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-orange-700">{elem.title}</h3>
                                    <p>Rs. {elem.price}</p>
                                    <p>{elem.quantity}</p>
                                </div>

                            </div>
                            ))}
                        {

                            products.length === 0 && 
                            <div className="py-30 flex">
                                 <p className="text-yellow-700 text-xl font-bold text-center">No Results found for your search</p>&nbsp;&nbsp;
                                 <p className="text-blue-500 text-xl font-bold text-center underline">${searchText}</p>
                            </div>
                        }
                        <div><Paginator total={total} page={page} limit={LIMIT_PER_PAGE} handlePageClick={(val) => setPage(val) } /> </div>
                        </div>


                        </div>
                    )

                    }
            </div>
        </div>
    )
}

export default SearchPage;