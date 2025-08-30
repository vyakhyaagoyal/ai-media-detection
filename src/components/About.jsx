import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen relative space-y-[50vh] '>

      {/* 1st card */}
      <section id='about' className='h-screen w-full bg-blue-950 rounded-3xl sticky top-3 scroll-mt-24'>
        <h1 className='text-8xl flex items-center justify-center mt-24'
        style={{
          fontFamily: '"Patua One", "serif"',
          fontWeight: 300,
          fontStyle: "normal",
          fontSize: "6rem",
          color:"lightgray"
        }}>About me</h1>
        
        <div className='justify-center items-center flex flex-col mt-10'>
          <p className='text-xl m-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia inventore labore corporis voluptatem eius, maxime amet, voluptates itaque exercitationem quidem nemo temporibus iure nobis adipisci saepe alias nam voluptatum nostrum?</p>
        <button className='px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 transition-transform duration-300 hover:scale-110 font-semibold text-lg mt-20' onClick={() => { /* handle download */ }}>Download Resume</button>
        </div>
        </section>

        {/* 2nd card */}
        <section className='min-h-screen w-full bg-pink-950 rounded-3xl sticky top-28'>
        <h1 className='text-8xl mt-28 flex items-center justify-center'
        style={{
          fontFamily: '"Patua One", "serif"',
          fontWeight: 300,
          fontStyle: "normal",
          fontSize: "6rem",
          color:"lightgray"
        }}>My other projects</h1>
        </section>
        
    </div>
  )
}

export default About;
