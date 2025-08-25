import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter,Route, Routes,Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ScrollToSection from './components/ScrollToSection';
import Signup from './components/Signup';
import Contact from './components/Contact';
//import Home from './components/Home';
import About from './components/About';
import UploadMedia from './components/UploadMedia';

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
    <div className="App">
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated}/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={isAuthenticated ? <ScrollToSection/> : <Signup/> } />
          <Route path="/about" element={isAuthenticated ? <About/> : <Signup/>} />
          <Route path="/contact" element={isAuthenticated ? <Contact/> : <Signup/>} />
          <Route path="/upload" element={isAuthenticated ? <UploadMedia/> : <Signup/>} />

          {/* Auth routes */}
          <Route path="/login" element={<Login/>} setisAuthenticated={setisAuthenticated}/>
          <Route path="/signup" element={<Signup/>} setisAuthenticated={setisAuthenticated}/>
          
        </Routes>
      </BrowserRouter>
      </div>
  );

}

export default App;
