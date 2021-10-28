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

        <div className="Card">
        <div className="CardGrid">
               <Button onClick={stateChangeableInvert} style={{textTransform:'none', backgroundColor: !state ?  '#D3A625' : '#DADADA', color:'black',fontSize:'20px' , width:'30%', height:'3rem', marginLeft:'75%'}}>
                    Consulting
               </Button>
               <Button onClick={stateChangeable} style={{textTransform:'none', backgroundColor: state ?  '#D3A625' : '#DADADA', color:'black',fontSize:'20px' , width:'30%', height:'3rem', marginLeft:'1rem'}}>
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
    )
}