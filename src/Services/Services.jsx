import React, { useEffect, useRef, useState } from "react";
import {Box, Button} from '@material-ui/core';

import Consulting from './Consulting.jsx';
import Treatments from "./Treaments.jsx";

import '../Home/Home.css';

export default function Services(){

    const [state , setState] = useState(false)

    function stateChangeable(){
        setState(true)
    }

    function stateChangeableInvert(){
        setState(false)
    }

    return(
    <div>
        <div className="Service_Title">
            Services
        </div>
        
        <div className="HomeContainer" >
            <div className="Card">
                <div className="ButtonGrid">
                <Button onClick={stateChangeableInvert} style={{textTransform:'none', backgroundColor: !state ?  '#D3A625' : '#DADADA', color:'black',fontSize:'20px'}}>
                        Consulting
                </Button>
                <Button onClick={stateChangeable} style={{textTransform:'none', backgroundColor: state ?  '#D3A625' : '#DADADA', color:'black',fontSize:'20px' }}>
                        Treatments
                </Button>
            </div>

            <Box hidden={state} >
                    <Consulting/>
            </Box>

            <Box hidden={!state} >
                    <Treatments/>
            </Box>

            </div>
        </div>
    </div>
    )
}