import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ isAuthenticated }) {
    const [scrolled, setScrolled] = useState(false);
    const [inLogin, setinLogin] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/login") {
            setinLogin(true);
        }
        else { setinLogin(false); }
    }, [location])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            }
            else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <nav className={"fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl flex items-center justify-between px-6 py-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30"}>

            <div className="flex items-center space-x-2">
                <Link to="/home" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold">Sample</Link>
                {/* <img src=""></img> */}
            </div>

            {isAuthenticated ?
                <ul className="hidden md:flex space-x-4 font-semibold">
                    <Link to="/home" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold">Home</Link>
                    <Link to="/about" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold">About</Link>
                    <Link to="/contact" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold">Contact</Link>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full hover:text-blue-950 cursor-pointer text-white font-bold">Logout</button>
                </ul>
                :
                (inLogin ? <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full hover:text-blue-950 cursor-pointer text-white font-bold">Signup</Link>
                    : <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full hover:text-blue-950 cursor-pointer text-white font-bold">Login</Link>
                )
            }
        </nav >
    );
};