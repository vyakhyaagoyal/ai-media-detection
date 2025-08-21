import React from "react";

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
            <span className="text-lg font-semibold">AI detection</span>
            {/* <img src=""></img> */}
        </div>

        <ul className="hidden md:flex space-x-8 text-black font-semibold">
            <li className="hover:text-blue-950 cursor-pointer">Home</li>
            <li className="hover:text-blue-950 cursor-pointer">About</li>
            <li className="hover:text-blue-950 cursor-pointer">Contact</li>
        </ul>

        </nav>  
    );
};