import React from 'react'

const Contact = () => {
  return (
    <div className='h-screen'>
      <div
        className="h-5/6 w-full bg-blue-950 rounded-3xl"
      >
        <h1 className='text-8xl mt-28 flex items-center justify-center'
          style={{
            fontFamily: '"Patua One", "serif"',
            fontWeight: 300,
            fontStyle: "normal",
            fontSize: "6rem",
            color: "lightgray"
          }}>Contact me</h1>

        <div className='flex items-start'>

          {/* Polaroid div */}
          <div
            className="bg-white shadow-lg rounded-sm p-2 transform -rotate-3 w-64 ml-32 mt-10 flex flex-col"
          >
            <img src="vyakhya_professional.jpg" alt="pic" className='h-4/6 mb-10 w-full object-cover rounded-sm' />
          </div>

          {/* Text div */}
          <div
            className="mt-28 ml-60 font-semibold text-white flex flex-col text-wrap w-1/2 text-2xl"
          >
            <p>Vyakhya is a creative frontend, backend and AI developer with experience in building responsive and user friendly web applications.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non quia ipsam qui id soluta impedit necessitatibus quam et, consectetur ipsum, culpa ut deleniti dolores alias beatae veniam quas saepe pariatur.
            </p>
          </div>

        </div>
      </div>
    </div >
  )
}

export default Contact
