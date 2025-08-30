import React, { useRef } from 'react';

const Contact = () => {
  return (
    <div className='min-h-screen'>
      <h1 className='mt-28 flex items-center justify-center'
        style={{
          fontFamily: '"Patua One", "serif"',
          fontWeight: 300,
          fontStyle: "normal",
          fontSize: "4rem",
          color: "lightgray"
        }}>Get in touch</h1>

      <div className='flex justify-start items-start space-x-60 mt-14'>
        {/* Polaroid div */}
        <div className="bg-white shadow-lg rounded-sm p-2 transform -rotate-3 w-64 ml-32 flex flex-col">
          <img src="vyakhya_professional.jpg" alt="pic" className='h-4/6 mb-10 w-full object-cover rounded-sm' />
        </div>

        {/* Form div */}
        <div className="text-white flex flex-col text-md w-1/2">
          <form className="space-y-6">
            {/* Name */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-2">Name</label>
              
              <div className='relative'>
                <i className="fa-solid fa-user absolute text-gray-600 top-3 left-1.5"></i>
              <input
                type="text"
                id="name"
                placeholder="Enter name"
                className="pl-10 pr-96 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 left-3"
              />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2">Email</label>
              <div className='relative'>
                <i className="fa-solid fa-envelope absolute text-gray-600 top-3 left-1.5"></i>
              <input
                type="email"
                id="email"
                placeholder="Enter email"
                className="pl-10 pr-96 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              </div>
            </div>

            {/* message textbox */}
            <div className='flex flex-col'>
              <label htmlFor='message' className='mb-2'>Message</label>
              <div className='relative'>
              <i className="fa-solid fa-pencil absolute text-gray-600 top-5 left-1.5"></i>
              <textarea id="message" placeholder='Enter message' className='pl-10 pr-96 py-3 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500' />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-8 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 hover:scale-110 font-semibold text-lg"
              onClick={()=>{
                //handle submissions
              }}
            >
              Send message
            </button>
          </form>
        </div>
      </div>

      {/* social links */}
      <div className='fixed bottom-6 right-20 flex space-x-4 text-2xl' >
        <a href="https://www.linkedin.com/in/vyakhyaagoyal" target="_blank" rel="noopener noreferrer" className='hover:scale-110 transition'><i className="fa-brands fa-linkedin"></i></a>
        <a href="https://github.com/vyakhyaagoyal" target="_blank" rel="noopener noreferrer" className='hover:scale-110 transition'><i className="fa-brands fa-github"></i></a>
        <a href="https://x.com/vyakhyaagoyal" target="_blank" rel="noopener noreferrer" className='hover:scale-110 transition'><i className="fa-brands fa-x-twitter"></i></a>
        <a href="mailto:vyakhyagoyal22@gmail.com" target="_blank" rel="noopener noreferrer" className='hover:scale-110 transition'><i className="fa-solid fa-envelope"></i></a>
      </div>
    </div>
  )
}

export default Contact
