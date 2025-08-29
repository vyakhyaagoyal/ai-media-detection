import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ isAuthenticated, setisAuthenticated }) {
    const [scrolled, setScrolled] = useState(false);
    const [inLogin, setinLogin] = useState(false);
    const [isLanding, setisLanding] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === "/login") {
            setinLogin(true);
        }
        else { setinLogin(false); }
    }, [location])

    useEffect(() => {
        if (location.pathname === "/landingPage") {
            setisLanding(true);
        }
        else { setisLanding(false); }
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
        (!isLanding &&
            <nav className={"fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl flex items-center justify-between px-6 py-2 rounded-full bg-white/20 backdrop-blur-lg border border-white/30 z-50"}>

                <div className="flex items-center space-x-2">
                    {isAuthenticated ?
                        <Link to="/home#home" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold"><img src="logo.ico" alt="logo" className="h-8 w-10" /></Link>
                        :
                        <img src="logo.ico" alt="logo"></img>
                    }
                    {/* <img src=""></img> */}
                </div>

                {isAuthenticated ?
                    <ul className="hidden md:flex space-x-4 font-semibold">
                        <Link to="/home#home" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold">Home</Link>
                        <Link to="/home#upload" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold">Upload</Link>
                        <Link to="/home#about" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold">About</Link>
                        <Link to="/home#contact" className="cursor-pointer px-2 py-2 bg-gradient-to-r hover:from-pink-500 hover:to-purple-700 from-white to-white bg-clip-text text-transparent font-semibold">Contact</Link>

                        <button className="px-4 py-2 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full hover:text-blue-950 cursor-pointer text-white font-bold transform transition-transform duration-300  hover:scale-110" onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('username');
                            setisAuthenticated(false);
                            navigate("/login");
                            console.log("logged out");
                        }}>Logout</button>
                    </ul>
                    :
                    (inLogin ? <Link to="/signup" className="px-4 py-2 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full hover:text-blue-950 cursor-pointer text-white font-bold">Signup</Link>
                        : <Link to="/login" className="px-4 py-2 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full hover:text-blue-950 cursor-pointer text-white font-bold">Login</Link>
                    )
                }
            </nav >
        )
    );
};