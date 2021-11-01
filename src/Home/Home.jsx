import React, { useEffect, useRef, useState } from "react";

import Intro from "../Intro/Intro.jsx";
import About from "../About/About.jsx";
import Services from "../Services/Services.jsx";
import ContactOld from "../Contact/ContactOld.jsx";
import Contact from "../Contact/Contact.jsx";


import './Home.css';

export default function Home(){
    return(
        <div className="HomeContainer" >
            <div style={{marginTop:'3%'}}>
                <Intro/>
            </div>
            <div >
                <About/>
            </div>
            <div>
                <Services/>
            </div>
            <div style={{marginBottom:'3%'}} >
                <Contact/>
            </div>
        </div>
    )
}