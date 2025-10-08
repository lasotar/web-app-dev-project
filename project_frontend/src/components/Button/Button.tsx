import { forwardRef, type ButtonHTMLAttributes } from "react";
import "./Button.css";

export const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ className, ...props }, ref) => (
    <button
        ref={ref}
        className={`button ${
            className ?? ""
        }`}
        {...props}
    />
))
