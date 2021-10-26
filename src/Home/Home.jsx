import React, { useEffect, useRef, useState } from "react";

import IntroContainer from "../Intro_Container/Intro_Container.jsx";
import About from "../About/About.jsx";

import './Home.css';

export default function Home(){
    return(
        <div className="HomeContainer">
            <div>
                <IntroContainer/>
            </div>
            <div style={{marginBottom:'3rem'}}>
                <About/>
            </div>
            <div>
                <IntroContainer/>
            </div>
        </div>
    )
}