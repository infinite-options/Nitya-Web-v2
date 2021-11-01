    import React, { useEffect, useRef, useState } from "react";
    import {Box, Button} from '@material-ui/core';

    import card1 from "../Assets/Images/card1.jpg";

    import '../Home/Home.css';

    export default function Intro(){
        return(
            <div className="Card">
                <div className="CardGrid">
                <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                    <div className="CardTitle">Helping your body heal itself</div>
                {/* <button className="CardButton"> Test </button> */}
                    <button
                        className="CardButton"
                        onClick={() => {
                    //  history.push("/contact")
                        }}
                        >
                        Book a Session
                    </button>
                </div>
                <div>
                <img src={card1} className="CardImage" />
                </div>
                </div>
            </div>
           
        )
    }