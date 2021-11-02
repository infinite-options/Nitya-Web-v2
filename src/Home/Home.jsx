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
            <div hidden={true}>Nitya Ayurveda is a holistic healing center that offers classical Ayurvedic solutions for your health issues with herbal plans, diet and lifestyle guidance, and follow ups.  The center also offers Panchakarma (cleansing and purification treatments) and traditional Ayurvedic wellness therapies to maintain health, relaxation and rejuvenation.</div>
            <ScrollToTop/>
            <div style={{marginTop:'2%'}}>
                <Intro/>
            </div>
            <div >
                <About/>
            </div>
            <div>
                <Services/>
            </div>
            <div style={{marginBottom:'2%'}} >
                <Contact/>
            </div>
        </div>
    )
}