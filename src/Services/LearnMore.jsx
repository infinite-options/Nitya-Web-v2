import React, { useState, useEffect,useRef  } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios"; 
import { makeStyles } from "@material-ui/core/styles";
import LearnMoreBTN from "../Services/LearnMoreBtn";
import BookNowBTN from "./BookNowBtn";
//import { height } from "@mui/system";
//import { Typography } from "@material-ui/core";
//import './consulting.css'
import './LearnMore.css'
import { Markup } from 'interweave';
import '../Home/Home.css';

export default function LearnMore(props) {
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
  axios.get("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments")
  .then((res) => {
    console.log("response email", res.data.result)
    setData(res.data.result);
  }) }, []);

  const parseDuration = (rawDuration) => {
    if (rawDuration === undefined) {
      return "";
    }
    console.log("rawDuration: ", rawDuration);
    let parsedDuration = "";

    let durationTokens = rawDuration.split(":");
    console.log("durationTokens: ", durationTokens);

    if (Number(durationTokens[0]) > 0) {
      parsedDuration = parsedDuration + durationTokens[0] + " hr ";
    }

    let minsNum = Number(durationTokens[1]);
    let secsNum = Number(durationTokens[2]);

    if (secsNum >= 31) {
      minsNum++;
    }

    parsedDuration = parsedDuration + minsNum + " min";

    return parsedDuration;
  };


  return (
    <div className="HomeContainer" >
      
        {/* <div className="Card"> */}
           
        {data != '' ? data
          .filter((service) =>  location.state.id === service.treatment_uid)
          .map((filteredService) => (
            <div style={{textAlign:'center', padding:'3% 20% 3% 20%'}}>
                  <div className="LearnMoreTitle">
                      {filteredService.title}
                  </div>
                  <div className="LearnMoreText" >
                      {filteredService.description} <br />
                  </div>
                  <div className="LearnMoreHeader">
                      {parseDuration(filteredService.duration)} | {filteredService.cost}
                  </div>
                  <BookNowBTN apptID={filteredService.treatment_uid} />
                  <div style={{margin:'2rem'}}>
                    <img
                     style={{width:'100%',height:'100%' ,objectFit:'cover'}}
                      variant="top"
                      src={filteredService.image_url}
                      alt={"An image of" + filteredService.title}
                    />
                  </div>
                  <Markup className="LearnMoreText" content={filteredService.treatment_notes} />
                  <div  className="LearnMoreHeader" style={{fontWeight:'bold'}}> Book Online</div>
                  <div className="LearnMoreHeader">
                      {filteredService.title}
                  </div>
                  <div  className="LearnMoreHeader">
                      {parseDuration(filteredService.duration)} | {filteredService.cost}
                  </div>
                  <BookNowBTN apptID={filteredService.treatment_uid} />

                  <div className="LearnMoreText" >6055 Meridian Ave, Ste. 40, San Jose, CA 95120, US
                        4084717004
                        leena@nityaayurveda.com
                  </div> 
                  <div  style={{fontWeight:'600', marginTop:'1rem'}}>
                      Cancellation Policy: To cancel or reschedule, please contact us 24 hours in advance.
                  </div>                
            </div>
          
          )) :
          <div style={{width:'1500px', backgroundColor:'white'}}> 
            
        </div> }
            
    </div>
  );
}
