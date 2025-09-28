import { Bounce, toast } from "react-toastify";

const ShowErrorToast = (txt) =>{
    toast.error(txt, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
});
} 

const showSuccessToast = (txt) => {
    toast.success(txt, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    });
}

export  {ShowErrorToast, showSuccessToast};