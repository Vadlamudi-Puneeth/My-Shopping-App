
const STYLES_MAPPING = {
        primary: "border px-2 py-1 border-md bg-amber-700 text-white/95 hover:bg-amber-600 ",
        "outline-primary": "border px-1.5 py-0.5 rounded-md border-amber-700 text-black/90 hover:bg-orange-600 hover:text-white/90",
};

const Button = ({disabled = false, children, className, onClick, variant = "primary"}) => {
       return (
        <button type="submit"
        disabled = {disabled}
        onClick={onClick} 
                className={`
                        disabled:cursor-not-allowed disabled:opacity-60
                        cursor-pointer transition hover: scale-102 ${STYLES_MAPPING[variant]} ${className}`
                }
                >
                    {children}</button>
        )

}

export {Button};