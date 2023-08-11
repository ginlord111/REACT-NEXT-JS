import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, disabled, ...props }, ref) => {
    return (
      <input
        type={type}
        className={twMerge(
          `flex w-full rouned-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:text-sm placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none`,
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    );
  }
);

export default Input;
