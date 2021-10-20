import React, { useState, useEffect } from "react";
import axios from "axios"; 
import { makeStyles } from "@material-ui/core/styles";
import LearnMoreBTN from "../Services/LearnMoreBtn";
import BookNowBTN from "./BookNowBtn";
import { height } from "@mui/system";
import './consulting.css'

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
    backgroundColor: "#DADADA",
    // minWidth: "420px",
    //marginLeft:"525px",
    height:'100%',
    // display: "flex",
    // alignItems:"center",
    // textAlign: "center",
    color: "#000000",
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

export default function Consulting(props) {
    console.log("props", props.selected)
  const classes = useStyles();
  const [data, setData] = useState([]);

  useEffect(() => {
  axios.get("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments")
  .then((res) => {
    console.log("response email", res.data.result)
    setData(res.data.result);
  }) }, []);

//   const fetchData = async () => {
//     const res = await fetch(
//       "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments"
//     );
//     const json = await res.json();
//     return json.result;
//   };
//   useEffect(() => {
//     fetchData().then((data) => {
//       setData(data);
//     });
//   }, []);

  return (
    <div
      //className="consulting"
      //id="consulting"
      //aria-label={"consulting section"}
      
    >
      <br />
      <br />
      <div className = "ConsultingContainer" style={{  height: '30rem'}}>
        { data
          .filter((service) =>   service.category === "Consultation" )
          .map((filteredService) => (
            <div className="Consulting_SubContainer" >
                  <div  className="Consulting_SubContainer_1">
                  {/* <Row className="d-none d-sm-block d-md-block"> */}
                  <div style={{width:'100%', flex:'1'}}>
                    <img
                     // className={classes.img}
                     style={{width:'100%',minHeight:'100%' ,objectFit:'cover'}}
                      variant="top"
                      src={filteredService.image_url}
                      alt={"An image of" + filteredService.title}
                    />
                  </div>
                  {/* <Row style={{ display: "flex", justifyContent: "center" }}> */}
                  <div style={{flex:'1'}}>
                  <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}} className={classes.body}>
                    <div className="TitleFont">
                      {filteredService.title}
                    </div>
                    <div className="BodyFont" >
                      {filteredService.description} <br />
                      {/* <NavHashLink to="#home">Learn More</NavHashLink> <br /> */}
                      {/* <LearnMoreBTN apptID={filteredService.treatment_uid} /> */}
                    </div>
                    {/* <Button className={classes.btn} variant="primary">
                        Book Now
                      </Button> */}
                    <LearnMoreBTN apptID={filteredService.treatment_uid}/>
                    <BookNowBTN apptID={filteredService.treatment_uid}/>
                  </div>
                  </div>
                </div>
              <br />
            </div>))
    }
      </div>
    </div>
  );
}
