import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen relative space-y-[50vh]'>

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
        {/* <img src="" alt="photo self"/> */}

        <p className='m-4 text-3xl text-center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem omnis harum beatae aliquid doloremque, a nostrum, cupiditate voluptatum officia excepturi impedit natus aut soluta voluptatibus maiores cum illum doloribus sequi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quod asperiores blanditiis, beatae incidunt dolores! Fuga cum dolorum commodi culpa, quo eligendi vero? In doloribus nesciunt consequatur cum. Quidem, culpa! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum deserunt aut earum reprehenderit, quos quasi nisi voluptatibus minima assumenda, pariatur nulla sunt similique aperiam voluptate maxime iusto alias ea quis.</p>
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
        {/* <img src="" alt="photo self"/> */}
        </section>
        
    </div>
  )
}

export default About;
