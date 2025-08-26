import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {

    const [progress, setProgress] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    navigate('/login');
                    return 100;
                    
                }
                return prev + 2;
            });
        }, 60);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center h-screen space-y-6'>
            <img src="logo.ico" alt="logo" />
            {/* Loading bar */}
            <div className='w-1/5 h-1 bg-gray-200 rounded-full overflow-hidden'>
                <div className='bg-gradient-to-r from-purple-700 to-pink-700 transition-all h-full duration-75' style={{width:`${progress}%`}}>

                </div>
            </div>
        </div>
    )
}

export default LandingPage
