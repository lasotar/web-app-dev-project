import { forwardRef } from "react";
import "./Input.css";

export const Input = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(({ className, type, ...props }, ref) => (
      <input
        type={type}
        className={`input ${
            className ?? ""
        }`}
        ref={ref}
        {...props}
      />
))
