import './App.css';
import axios from 'axios';
import React, { useEffect } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import UploadMedia from './components/UploadMedia';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';

function ScrollToSection() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") {
      const newPath = location.pathname.replace("/", "");
      const section = document.getElementById(newPath);
      if (section) {
        section.scrollIntoView({ behaviour: "smooth" });
      }
      else {
        window.scrollTo({ top: 0, behaviour: "smooth" });
      }
    }
  }, [location]);

  return (
    <div>
        {/* <section id="/home" /><Home /> */}
        <section id={["/", "/home"]} /><Home />
        <section id="/signup" /><Signup />
        <section id="/login" /><Login />
        <section id="/upload" /><UploadMedia />
        <section id="/about" /><About />
        <section id="/contact" /><Contact />
    </div>
  );
}

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
      <BrowserRouter>
        <Navbar />
        <ScrollToSection />
      </BrowserRouter>
  );

}

export default App;
