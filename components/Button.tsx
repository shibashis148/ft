import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

const Button = ({ children, ...props }: ButtonProps) => {
    return (
        <button className={`bg-secondary text-white w-full p-3 ${props.className}`} {...props}>
            {children}
        </button>
    )
}

export default Button;