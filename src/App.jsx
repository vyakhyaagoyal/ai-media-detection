import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ScrollToSection from './components/ScrollToSection';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Home from './components/Home';
import About from './components/About';

function App() {

  const [isAuthenticated,setisAuthenticated]=useState(false);

  useEffect(()=>{
    if(localStorage.getItem('token')){
      console.log(localStorage.getItem('token'));
      setisAuthenticated(true);
    }
    else{setisAuthenticated(false);}
  }, []);

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
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated}/>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/" element={isAuthenticated ? <ScrollToSection/> : <Signup/> } />
        </Routes>
      </BrowserRouter>
  );

}

export default App;
