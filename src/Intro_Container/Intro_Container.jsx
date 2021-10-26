    import React, { useEffect, useRef, useState } from "react";
    import {Box, Button} from '@material-ui/core';

    import card1 from "../Assets/Images/card1.jpg";

    import '../Intro_Container/Container.css';

    export default function Intro_Conatiner(){
        return(
            <div className="Container">
                <div className="Intro_Container_Grid">
                <div>
                <h1 style={{color:'#D3A625', fontStyle:'italic', padding:'10%'}}>Helping your body heal itself</h1>
                <Button
                style={{textTransform:'none', backgroundColor:'#D3A625', color:'white',fontSize:'24px' , width:'75%', height:'3rem', marginLeft:'2rem'}}
                    id="btn"
                    onClick={() => {
                    //  history.push("/contact")
                    }}
                    >
                    Book a Session
                    </Button>
                </div>
                <div>
                <img src={card1} className="CardImage" />
                </div>
                </div>
            </div>
        )
    }