import { forwardRef } from "react";
import "./BasicCard.css";

export const BasicCard = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={`card ${
            className ?? ""
        }`}
        {...props}
    />
))

export const BasicCardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div 
        ref={ref}
        className={`card-header ${
            className ?? ""
        }`}
        {...props}
    />
))

export const BasicCardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div 
        ref={ref}
        className={`card-content ${
            className ?? ""
        }`}
        {...props}
    />
))
