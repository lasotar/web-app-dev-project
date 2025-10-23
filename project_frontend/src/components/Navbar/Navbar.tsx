import { useContext, useEffect, useRef, useState } from "react";
import { Button } from "../Button/Button";
import "./Navbar.css";
import { AiOutlineSun, AiOutlineMoon, AiOutlineUser } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";

export const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const dropDownRef = useRef<HTMLDivElement>(null);

    const auth = UseAuth();

    const handleLogout = () => {
        auth.logout().subscribe();
        navigate("/login");
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleClickOutsideDropdown = (event: MouseEvent) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }

            document.addEventListener("mousedown", handleClickOutsideDropdown);

            return () => {
                document.removeEventListener("mousedown", handleClickOutsideDropdown);
            };
        }
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <nav className="navbar">
            <div className="navbar-apptitle">
                <a href="/">Early Pass Project</a>
            </div>
            <div className="navbar-actions">
                <Button onClick={toggleTheme} className="theme-switcher">
                    {theme === "light" ? <AiOutlineMoon size={24} /> : <AiOutlineSun size={24} />}
                </Button>
                <div className="user-menu" ref={dropDownRef}>
                    <Button className="user-menu-button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}><AiOutlineUser size={24}/></Button>
                    {isDropdownOpen && (
                        <div className="dropdown-menu">
                            <a href="/reset-password" className="dropdown-item">Change Password</a>
                            <button className="dropdown-item" onClick={() => handleLogout()}>Logout</button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
