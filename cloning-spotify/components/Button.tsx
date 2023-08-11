import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef <HTMLButtonElement, ButtonProps >(({className, children, disabled, type='button',...props}, ref) =>{
    return (
        <button type={type} className={twMerge(` bg-green-500 rounded-full p-3 border border-transparent disabled:cursot-not-allowed text-black font-bold hover:opacity-75 transition`, className)} disabled={disabled} ref={ref} {...props}>
                {children}
        </button>
    )
})

Button.displayName='button';

export default Button