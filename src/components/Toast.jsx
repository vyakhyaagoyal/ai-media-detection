import React from 'react'

const Toast = ({message,onClose,warning,type}) => {

    const colors = {
    success: "bg-green-500/90 border-green-400",
    error: "bg-red-500/90 border-red-400",
    warning: "bg-yellow-400/30 border-yellow-400",
    info: "bg-blue-500/90 border-blue-400"
  };

  return (
    <div className={`fixed bottom-5 right-5 bg-white/20 text-white p-2 rounded-md shadow-lg h-20 w-96 ${colors[type]}`}>
        <span className='text-xl font-semibold flex'>{warning}</span>
      <span className='text-white'>{message}</span>
      <button onClick={onClose} className='absolute bottom-12 right-2 hover:text-red-800 text-xl'><i class="fa-solid fa-xmark"></i></button>
    </div>
  )
}

export default Toast
