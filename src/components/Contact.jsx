import React, {useRef} from 'react';

const Contact = () => {
  return (
    <div className='min-h-screen'>
      {/* <section
        className="min-h-screen w-full bg-blue-950 rounded-3xl"
      > */}
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
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia excepturi, hic fugit corporis eaque ex, odit ea quo ab quaerat mollitia magni a quos voluptatibus repellat, provident nobis nemo iste?
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non quia ipsam qui id soluta impedit necessitatibus quam et, consectetur ipsum, culpa ut deleniti dolores alias beatae veniam quas saepe pariatur.
            </p>
            <p>linkedin</p>
            <p>github</p>
            <p>x</p>
          </div>

        </div>
      {/* </section> */}

      {/* 2nd card */}
      {/* <section
        className="min-h-screen w-full bg-pink-950 rounded-3xl sticky top-28"
      >
        <h1 className='text-8xl mt-28 flex items-center justify-center'
          style={{
            fontFamily: '"Patua One", "serif"',
            fontWeight: 300,
            fontStyle: "normal",
            fontSize: "6rem",
            color: "lightgray"
          }}>Contact me</h1> */}

        {/* <div className='flex items-start'> */}

          {/* Polaroid div */}
          {/* <div
            className="bg-white shadow-lg rounded-sm p-2 transform -rotate-3 w-64 ml-32 mt-10 flex flex-col"
          >
            <img src="vyakhya_professional.jpg" alt="pic" className='h-4/6 mb-10 w-full object-cover rounded-sm' />
          </div> */}

          {/* Text div */}
          {/* <div
            className="mt-28 ml-60 font-semibold text-white flex flex-col text-wrap w-1/2 text-2xl"
          >
            <p>Vyakhya is a creative frontend, backend and AI developer with experience in building responsive and user friendly web applications.
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non quia ipsam qui id soluta impedit necessitatibus quam et, consectetur ipsum, culpa ut deleniti dolores alias beatae veniam quas saepe pariatur.
            </p>
          </div>

        </div>
      </section> */}
    </div >
  )
}

export default Contact

// import React, { useRef } from "react";
// import { motion, useScroll, useTransform } from "framer-motion";

// const HorizontalScrollCards = () => {
//   const containerRef = useRef(null);

//   // Track scroll progress inside this section
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end start"],
//   });

//   // Smooth horizontal movement (leftward)
//   const x = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

//   return (
//     <section ref={containerRef} className="h-[300vh] relative bg-gray-900">
//       {/* Sticky wrapper */}
//       <div className="sticky top-0 h-screen flex items-center overflow-hidden">
//         <motion.div
//           style={{ x }}
//           transition={{ type: "spring", stiffness: 50, damping: 20 }} // Smooth motion
//           className="flex gap-10"
//         >
//           {/* Card 1 */}
//           <div className="min-w-[80vw] h-[90vh] bg-blue-600 rounded-3xl flex items-center justify-center text-white text-6xl shadow-xl">
//             Card 1
//           </div>

//           {/* Card 2 */}
//           <div className="min-w-[80vw] h-[90vh] bg-pink-600 rounded-3xl flex items-center justify-center text-white text-6xl shadow-xl">
//             Card 2
//           </div>

//           {/* Card 3 */}
//           <div className="min-w-[80vw] h-[90vh] bg-green-600 rounded-3xl flex items-center justify-center text-white text-6xl shadow-xl">
//             Card 3
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default HorizontalScrollCards;

