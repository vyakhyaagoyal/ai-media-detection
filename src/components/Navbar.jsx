import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
    // const [scrolled,setScrolled]=useState(false);

    // useEffect=(()=>{
    //     const handleScroll=()=>{
    //         if(window.scrollY>50){
    //             setScrolled(true);
    //         }
    //         else{
    //             setScrolled(false);
    //         }
    //     }

    //     window.addEventListener("scroll",handleScroll);
    //     return()=>{
    //         window.removeEventListener("scroll",handleScroll);
    //     }
    // },[]);

    return (
        <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl flex items-center justify-between px-6 py-3 rounded-full bg-blue-200`}>
            {/* ${
    scrolled?"bg-black/10":"bg-transparent"
    } */}

            <div className="flex items-center space-x-2">
                <Link to="/home" className="hover:text-blue-950 cursor-pointer text-lg font-semibold">Sample</Link>
                {/* <img src=""></img> */}
            </div>

            <ul className="hidden md:flex space-x-8 text-black font-semibold">
                <Link to="/home" className="hover:text-blue-950 cursor-pointer">Home</Link>
                <Link to="/about" className="hover:text-blue-950 cursor-pointer">About</Link>
                <Link to="/contact" className="hover:text-blue-950 cursor-pointer">Contact</Link>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-700 to-pink-500 rounded-full hover:text-blue-950 cursor-pointer text-white font-bold">Logout</button>
            </ul>

        </nav>
    );
};