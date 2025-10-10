import { forwardRef } from "react";
import "./Table.css";

export const Table = forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(({ className, ...props }, ref) => (
    <div className="table-wrapper">
        <table
            ref={ref}
            className={`table ${
                className ?? ""
            }`}
            {...props}
        />
    </div>
))

export const TableHeader = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <thead
        ref={ref}
        className={`table-header ${
            className ?? ""
        }`}
        {...props}
    />
))

export const TableBody = forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(({ className, ...props }, ref) => (
    <tbody
        ref={ref}
        className={`table-body ${
            className ?? ""
        }`}
        {...props}
    />
))

export const TableRow = forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(({ className, ...props }, ref) => (
    <tr
        ref={ref}
        className={`table-row ${
            className ?? ""
        }`}
        {...props}
    />
))

export const TableCell = forwardRef<HTMLTableCellElement, React.HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <td
        ref={ref}
        className={`table-cell ${
            className ?? ""
        }`}
        {...props}
    />
))

export const TableHead = forwardRef<HTMLTableCellElement, React.HTMLAttributes<HTMLTableCellElement>>(({ className, ...props }, ref) => (
    <th
        ref={ref}
        className={`table-head ${
            className ?? ""
        }`}
        {...props}
    />
))

export const TableCaption = forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(({ className, ...props }, ref) => (
    <caption
        ref={ref}
        className={`table-caption ${
            className ?? ""
        }`}
        {...props}
    />
))
