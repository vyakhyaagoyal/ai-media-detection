import './App.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BrowserRouter,Route, Routes,Navigate } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ScrollToSection from './components/ScrollToSection';
import Signup from './components/Signup';
import Contact from './components/Contact';
import LandingPage from './components/LandingPage';
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
    axios.get('https://ai-media-detection.onrender.com/')
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
        <Navbar isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated}/>
        <Routes>
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={isAuthenticated ? <ScrollToSection/> : <Signup/> } />
          <Route path="/about" element={isAuthenticated ? <About/> : <Signup/>} />
          <Route path="/contact" element={isAuthenticated ? <Contact/> : <Signup/>} />
          <Route path="/upload" element={isAuthenticated ? <UploadMedia/> : <Signup/>} />

          {/* Auth routes */}
          <Route path="/login" element={<Login setisAuthenticated={setisAuthenticated}/>}/>
          <Route path="/signup" element={<Signup setisAuthenticated={setisAuthenticated}/>}/>

        </Routes>
      </BrowserRouter>
      </div>
  );

}

export default App;
