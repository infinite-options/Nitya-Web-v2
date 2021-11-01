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




const useStyles = makeStyles({
  container: {
    //width: "80vw",
    //height: "70vh",
    //width: "100%",
    // alignItems: "left",
    // marginLeft: "-50px",
    //height: "360px",
    //width: "888.73px",
    display: "grid",
    backgroundColor: "#ffffff",
    gridTemplateColumns: "repeat(1, auto)",
    gridAutoRows: " 30%",
    gridColumnGap: "30%",
    gridRowGap: "0%",
    position: "relative",
    top: 0,
    bottom: 0,

  },

  card: {
    // maxWidth: "420px",
    //width: "20rem",
    // height: "800px",
    //height: "42rem",
    // height: "360px",
    //width: "888.73px",
    border: "none",
    //outline: "none",
    //float: "right",
    marginBottom: "44px",
    // marginLeft: "-100px",
    // marginRight: "-80px",
  },
  images: {
    display: "block",
    width: "476.73px",
    overflow: "hidden",
    height: "360px",

    //float: "left",
    //height: "20rem",
    //paddingLeft: "14px",
    //paddingRight: "14px",
    //width: "auto",
    // width: "25rem",
    //height: "20rem",
    // width: "33.3%",
    // height: "450px",
    // width: "420px",
    //objectFit: "cover",
    //display: "inline-block",
  },
  img: {
    width: "476.73px",
    objectFit: "cover",
    height: "360px",

  },
  body: {
    backgroundColor: "#C3A336",
    // minWidth: "420px",
    //marginLeft:"525px",
    height:'100%',
    // display: "flex",
    // alignItems:"center",
    // textAlign: "center",
    color: "#C3A336",
    //float:"right",
    // paddingTop: "4rem",
    // padding: "4rem",
    //paddingRight:"50px",
    //paddingLeft:"57px",
  },
  title: {
    // textAlign: "center",
    // width: "400px",
    // fontSize: "1.4rem",

    // color: "black",

    textAlign: "center",
    font: "normal normal normal 24px/26px Hoefler Text",
    letterSpacing: "0.6px",
    fontSize:'20px',
    color: "#FFFFFF",
  },
  text: {
    // fontSize: "1.0rem",
    // color: "black",
    textAlign: "center",
    font: "normal normal normal 22px/26px SF Pro Display",
    letterSpacing: "0.55px",
    color: "#FFFFFF",
    paddingLeft:'10%',
    paddingRight:'10%',
  },
  LMbtn: {
    // textAlign: "center",
    display: "flex",
    justifyContent: "center",
  },
  divBody: {
    //width:"400px",
    //marginLeft:""
  },

  // btn: {
  //   // backgroundColor: "#d3a625",
  //   backgroundColor: "transparent",
  //   border: "1px solid #d3a625",
  //   borderRadius: "0px",
  //   color: "#ffffff",
  //   fontSize: "1.4rem",
  //   minHeight: "40px",
  // },
});

export default function LearnMore(props) {
  const classes = useStyles();
  const location = useLocation();
  const [data, setData] = useState([]);

  useEffect(() => {
  axios.get("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments")
  .then((res) => {
    console.log("response email", res.data.result)
    setData(res.data.result);
  }) }, []);

  const myRef = useRef(null)

  console.log("location", location.state.id)

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
