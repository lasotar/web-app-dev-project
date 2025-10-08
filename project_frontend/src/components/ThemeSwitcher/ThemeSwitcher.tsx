import { useEffect, useState } from "react";
import { Button } from "./Button";
import "./ThemeSwitcher.css";

export const ThemeSwitcher = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Button onClick={toggleTheme} className="theme-switcher">
            Switch to {theme === "light" ? "dark" : "light"} mode
        </Button>
    );
};