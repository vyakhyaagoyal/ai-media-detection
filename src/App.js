import './App.css';
import axios from 'axios';
import React, { useEffect } from 'react';
import topMNCs from './components/Scroll.js';

function App() {

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then((res) => {
        console.log(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className='overflow-hidden bg-black'>
      <ul className='flex gap-8 text-2xl text-white py-5 animate-infinite-scroll'>
        {topMNCs.concat(topMNCs).map((topMNCs) => {
          return <li key={topMNCs.company}>{topMNCs.company}</li>;
        })}
      </ul>
      
    </div>
  );

}

export default App;
