import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import Home from './Home';
import UploadMedia from './UploadMedia';
import About from './About';
import Contact from './Contact';

const ScrollToSection = () => {

    const location = useLocation();

    useEffect(() => {
        if (location.pathname !== "/") {
            const newPath = location.pathname.replace("/", "");
            const section = document.getElementById(newPath);
            if (section) {
                section.scrollIntoView({ behavior: "smooth" });
            }
            else {
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }
    }, [location]);

    return (
    <div className='App'>
        <section id="home" /><Home />
        {/* <section id="signup" /><Signup />
        <section id="login" /><Login /> */}
        <section id="upload" /><UploadMedia />
        <section id="about" /><About />
        <section id="contact" /><Contact />
    </div>
);

}

export default ScrollToSection
