import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/upload');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1
        className="text-4xl md:text-6xl text-center font-normal"
        style={{
          fontFamily: '"Patua One", "serif"',
          fontWeight: 300,
          fontStyle: "normal",
          fontSize: "6rem"
        }}
      >
        Want to check your media authenticity?
      </h1>
      <h1 className="text-lg md:text-2xl text-center mt-4 text-gray-700" style={{
        fontFamily: '"News Cycle", sans-serif',
        fontWeight: 500,
        fontStyle: "normal"
      }}>
        Upload your media file here, and we'll <span className='text-blue-800'>analyze</span> it for you!
      </h1>
      <button
        className="bg-blue-800 hover:bg-blue-900 text-white text-xl md:text-2xl px-6 py-3 rounded-2xl mt-6 shadow-lg transition-transform duration-200 hover:scale-105"
        onClick={handleNavigate}
      >
        Let's Go!
      </button>
    </div>
  )
}

export default Home