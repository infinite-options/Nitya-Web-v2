import React, { useEffect, useRef, useState } from "react";
import {Box, Button} from '@material-ui/core';
import LearnMoreBTN from "./LearnMoreBtn";
import BookNowBTN from "../Services/BookNowBtn"
import axios from "axios";


export default function Treatments(){

    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments")
        .then((res) => {
          console.log("response email", res.data.result)
          setData(res.data.result);
        }) 
    },[]);
 
    return(
        <div className="Card" style={{ margin:'0%'}}>
        <div  className = "CardGrid" style={{  gridTemplateColumns: 'repeat(1, auto)', height: 'auto'}}>
          { data
              .filter((service) =>   service.category === "Treatment" )
                  .map((filteredService) => (
                  <div style={{display:'flex', backgroundColor:'#DADADA', marginTop:'2rem'}}>
                      <div style={{width:'100%', flex:'1'}}>
                          <img
                              style={{width:'100%',minHeight:'100%' ,objectFit:'cover'}}
                              variant="top"
                              src={filteredService.image_url}
                              alt={"An image of" + filteredService.title}
                          />
                      </div>
                      <div style={{flex:'1'}}>
                          <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', marginTop:'2rem'}} >
                              <div className="Services_Title_Font">
                                  {filteredService.title}
                              </div>
                              <div className="Services_Body_Font">
                                  {filteredService.description} <br />
                              </div> 
                              <LearnMoreBTN apptID={filteredService.treatment_uid}/>
                              <BookNowBTN apptID={filteredService.treatment_uid}/>
                          </div>
                      </div>
                  </div>))
              }
          </div>

      </div>
  )
}