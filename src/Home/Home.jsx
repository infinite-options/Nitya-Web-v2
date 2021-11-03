import React, { useEffect, useRef, useState } from "react";

import Intro from "../Intro/Intro.jsx";
import About from "../About/About.jsx";
import Services from "../Services/Services.jsx";
import ContactOld from "../Contact/ContactOld.jsx";
import Contact from "../Contact/Contact.jsx";
import ScrollToTop from "../Blog/ScrollToTop";

import './Home.css';

export default function Home(){
    return(
        <div className="HomeContainer" >
           
            <ScrollToTop/>
            {/* <div style={{border:'2px solid red'}}> */}
            <div>
                <Intro/>
            </div>
            <div >
                <About/>
            </div>
            <div>
                <Services/>
            </div>
            <div >
                <Contact/>
            </div>
        </div>
    )
}