import './App.css';
import axios from 'axios';
import React, { useEffect } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import UploadMedia from './components/UploadMedia';
import Detect from './components/Detect';

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
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadMedia />} />
        <Route path="/detect" element={<Detect />} />
      </Routes>
      </BrowserRouter>
    </div>
  );

}

export default App;
