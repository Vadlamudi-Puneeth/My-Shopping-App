const Paginator = ({ total,page, limit, handlePageClick }) => {
    // console.log("hi");
    const totalPages = Math.ceil(total / limit);

    const dummyArray = new Array(totalPages).fill();
    console.log("Paginator", dummyArray);

    return (
        <div className="flex gap-x-4 gap-y-2 flex-wrap">
            {
                dummyArray.map((elem, idx)=>{
                    const selected = (idx+1) == page; 
                    return (
                        <button
                                key={idx}
                                onClick={() => handlePageClick(idx + 1)}
                                className={`px-2 py-1 border rounded-md text-sm cursor-pointer 
                                    ${selected ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-300"}`}
                                >
                                {idx + 1}
                                </button>

                    )
                })
            }
        </div>
    );
};

export default Paginator;
