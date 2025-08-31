// import React from 'react'

// const About = () => {
//   return (
//     <div className='min-h-screen relative space-y-[50vh]'>
      
//       {/* 1st card */}
//       <section
//         id='about'
//         className='h-screen w-full bg-blue-950 rounded-3xl sticky top-3 scroll-mt-24'
//       >
//         <h1
//           className='text-8xl flex items-center justify-center mt-24'
//           style={{
//             fontFamily: '"Patua One", "serif"',
//             fontWeight: 300,
//             fontStyle: 'normal',
//             fontSize: '6rem',
//             color: 'lightgray',
//           }}
//         >
//           About me
//         </h1>

//         <div className='justify-start items-start flex space-x-48 mt-10 ml-20'>
//           <img src='test2.jpg' alt='testphoto' className='h-96' />
//           <p className='text-xl mt-36 w-1/2'>
//             Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
//             inventore labore corporis voluptatem eius, maxime amet, voluptates
//             itaque exercitationem quidem nemo temporibus iure nobis adipisci
//             saepe alias nam voluptatum nostrum?
//           </p>

//           <div className='justify-center items-center flex flex-col mt-10'>
//           <button
//           className='px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 hover:scale-110 font-semibold text-lg mt-20'
//           onClick={() => {
//             /* handle download */
//           }}
//         >
//           Download Resume
//         </button>
//         </div>
//         </div>

        
//       </section>

//       {/* 2nd card */}
//       <section className='min-h-screen w-full bg-pink-950 rounded-3xl sticky top-28'>
//         <h1
//           className='text-8xl mt-28 flex items-center justify-center'
//           style={{
//             fontFamily: '"Patua One", "serif"',
//             fontWeight: 300,
//             fontStyle: 'normal',
//             fontSize: '6rem',
//             color: 'lightgray',
//           }}
//         >
//           My other projects
//         </h1>
//       </section>
//     </div>
//   )
// }

// export default About

import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen relative space-y-[50vh] bg-gradient-to-br from-[#0a0f2c] via-[#0f1738] to-[#1a103f] text-white">
      
      {/* 1st Card */}
      <section
        id="about"
        className="h-screen w-full rounded-3xl sticky top-3 flex flex-col items-center justify-center px-8"
      >
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h1>

        <motion.div
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-20 bg-white/5 backdrop-blur-lg border border-white/20 rounded-3xl p-14 shadow-lg w-full max-w-6xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Left: Image */}
          <div className="flex-shrink-0">
            <img
              src="vyakhya_professional.jpg"
              alt="profile"
              className="h-72 w-72 object-cover rounded-full border-4 border-purple-500/40 shadow-lg"
            />
          </div>

          {/* Right: Text + Button */}
          <div className="flex flex-col justify-between max-w-xl text-gray-300">
            <p className="text-lg leading-relaxed">
              Hi! I’m Vyakhya Goyal, a developer who loves building{" "}
              <span className="text-pink-400 font-semibold">
                creative & interactive
              </span>{" "}
              digital experiences. I believe design and technology should blend
              seamlessly to create something magical. Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, perspiciatis officiis praesentium maxime quaerat debitis ut suscipit illo eveniet, impedit excepturi beatae ullam minus aut inventore laborum voluptate, saepe tempora?
            </p>

            <motion.button
              className="self-start mt-10 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-lg shadow-lg transition-transform duration-300"
              whileTap={{ scale: 0.95 }}
              whileHover={{scale:1.05}}
              onClick={() => {
                // handle download
              }}
            >
              Download Resume
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* 2nd Card */}
      <section className="min-h-screen w-full rounded-3xl sticky top-28 flex flex-col items-center justify-center px-8 bg-pink-900" >
        <motion.h1
          className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Other Projects
        </motion.h1>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 w-full max-w-6xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {[1, 2, 3, 4, 5, 6].map((project) => (
            <motion.div
              key={project}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-lg hover:shadow-purple-500/20 transition-all duration-300 hover:scale-105 cursor-pointer"
              whileHover={{ y: -8 }}
            >
              <h3 className="text-2xl font-semibold text-purple-300">
                Project {project}
              </h3>
              <p className="text-gray-400 mt-3">
                A short description about this project. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, adipisci labore. In minima.
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default About;

