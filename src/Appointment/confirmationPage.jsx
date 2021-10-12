import React, { useEffect, useState, useContext } from "react";
//import ScrollToTop from "../../Blog/ScrollToTop";
import { Row, Col } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import { useLocation } from 'react-router-dom';
import "./calendar.css";
import { ApptContext } from "./Scheduler";
//import herbsImg from '../../images/herbsImg.png';
// import MapSection from "../Home/Map";
// import { withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

const google = window.google;

const useStyles = makeStyles({
  MobileContainerDivider:{
    height: 'calc(100% - 174px)',
    display: 'flex',
    width: '100%',
    "@media (max-width: 500px)": {
      height:'auto',
     display:'flex',
     flexDirection:'column',
   },
  },

  MobileContainerSubDivider:{
      borderRight: '1px solid #D3A625',
      height: '100%',
      width: '50%',
      marginLeft: '30px',
      marginBottom:'10px',
      "@media (max-width: 500px)": {
        width: '100%',
        borderRight: '0px solid #D3A625',
        marginLeft: '0px',
     },
  }

});

export default function ConfirmationPage(props) {
  // const google = window.google;

  console.log("window: ", window);
  console.log("window.google: ", google);

  const classes = useStyles();
  const location = useLocation();

  const scaleWidthFn = () => {
    return 280-(810-dimensions.width)*0.4;
  }

  const scaleHeightFn = (y) => {
    return 210-(810-dimensions.width)*0.3;
  }

  console.log("(confirmationPage) props 1: ", props);
  console.log("(confirmationPage) props 2: ", props.location);
  console.log("location: ", location);
  // console.log("(confirmationPage) props 3: ", this.props);
  // console.log("(confirmationPage) props 4: ", this.props.location);

  //for confirmation page
  //const [apptInfo, apptInfoLoaded] = useContext(ApptContext);
  // const [elementToBeRendered, setElementToBeRendered] = useState([]);

  /* useEffect(() => {
    if (apptInfoLoaded) {
      apptInfo.forEach((element) => {
        setElementToBeRendered(element);
      });
    }
  }); */

  const [dimensions, setDimensions] = useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  });

  useEffect(() => {
    console.log("RERENDER -- window: ", window);
    console.log("RERENDER -- window.google: ", window.google);
    // console.log("RERENDER -- this.google: ", this.google);
    function handleResize() {
			setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      });
		}

    window.addEventListener('resize', handleResize);

		return _ => {
      window.removeEventListener('resize', handleResize);
		}
  });

  useEffect(() => {
    // const map = new google.maps.Map(document.getElementById("map"), {
    //   center: { lat: 37, lng: 110},
    //   zoom: 12,
    // });
    // console.log();
  }, []);

  return (
    <div
      style={{
        // border: "dashed",
        // height: "100vh",
        height: "auto",
        width: "100vw",
        maxWidth: "100%",
        backgroundColor: "#DADADA",
        display: "flex",
        alignItems: "left",
        textAlign:'left',
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "90%",
          height: "800px",
          maxWidth: "980px",
          display: 'block',
          overflow: 'auto',
          paddingLeft:'2rem',
        }}
      >
        <div
          style={{
            // border: "1px solid green",
            height: "144px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              // border: "1px solid blue",
              display: "inline-block"
            }}
          >
            <div
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: "32px",
                color: "#D3A625",
                marginTop: "10px",
                width: "100%",
                textAlign: "center"
              }}
            >
              Booking Confirmed
            </div>
            <div
              style={{
                fontSize: "19px",
                color: "#D3A625",
                marginTop: "10px",
                width: "100%",
                textAlign: "center"
              }}
            >
              We have sent a confirmation email to
            </div>
            <div
              style={{
                fontSize: "19px",
                width: "100%",
                textAlign: "center"
              }}
            >
              {location.state.apptInfo.email}
            </div>
          </div>
        </div>
        <div
        className = {classes.MobileContainerDivider}>
          <div
            className = {classes.MobileContainerSubDivider}>
            <span
              style={{
                color: "#D3A625",
                fontSize: '18px',
                fontWeight: '500'
              }}
            >
              First-Time Customer Package (Online)
            </span>
            <br />
            <span
              style={{
                color: "#D3A625",
              }}
            >
              1 hr 30 min | {
               location.state.apptInfo.purchase_price
              }
            </span>
            <br />
            <img
              src={location.state.apptInfo.image_url}
              style={dimensions.width > 810 ? {
                width: '80%',
                height: '210px',
                margin: '20px 0 20px 0'
              } : {
                width: '90%',
                height: '210px',
                margin: '20px 0 20px 0'
              }}
            />
            <br />
            <span
              style={{
                color: "#D3A625",
              }}
            >
              6055 Meridian Ave #40
            </span>
            <br />
            <span
              style={{
                color: "#D3A625",
              }}
            >
              San Jose, CA, 95120
            </span>
            <br />
            <br />
            <span
              style={{
                color: "#D3A625",
              }}
            >
              Office: (408) 471-7004
            </span>
            <br />
              <div
                style={dimensions.width > 810 ? {
                  width: '80%',
                  height: '10rem',
                  margin: '20px 0 0 0',
                  borderRadius: '25px',
                  backgroundColor: '#E8E8E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop:'2rem'
                } : {
                  // position: 'absolute',
                  // width: "280px",
                  // maxWidth: '95%',
                  // height: "210px",
                  // height: '75vw',
                  // paddingBottom: '75%',
                  width: '90%',
                  height: '10rem',
                  // maxWidth: '95%',
                  // height: '210px',
                  margin: '3rem 0 4rem 0',
                  borderRadius: '25px',
                  backgroundColor: '#E8E8E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                width="100%"
                className="Contact_Map"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
              </div>
            {/* </div> */}
          </div>
          <div
            style={dimensions.width > 810 ?  { 
              borderLeft: '1px solid #D3A625',
              height: '100%',
              width: '50%',
              marginRight: '30px',
              paddingLeft: '30px'
            }: {
              borderTop: '2px solid #D3A625',
              width: '100%',
              marginRight: '-30px',
              marginLeft: '-30px',
              paddingLeft:'20px',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                fontWeight: '500'
              }}
            >
              If anything changes we will contact you: 
            </div>
            {/* <br />
            <br /> */}
            <div
              style={{
                fontSize: '22px',
                fontWeight: '300',
                margin: '16px 0 0 0'
              }}
            >
              {location.state.apptInfo.first_name}
            </div>
            {/* <br /> */}
            <div
              style={{
                fontSize: '22px',
                fontWeight: '300',
                // margin: '24px 0 0 0'
              }}
            >
              {location.state.apptInfo.phone_no}
            </div>
            {/* <br />
            <br /> */}
            {/* <br /> */}
            <div
              style={{
                color: "#D3A625",
                fontSize: '20px',
                margin: '40px 0 0 0'
              }}
            >
              How to prepare for your consultation:
            </div>
            {/* <br /> */}
            {/* <br /> */}
            <div
              style={{
                color: "#D3A625",
                fontSize: '14px',
                // padding: '50px 50px 50px 50px',
                margin: '12px 0 0 0'
                // display: 'inline-block',
                // width: '50%',
                // border: 'dashed'
              }}
            >
              Bringing these things to the consultation will help us accelerate the process.
            </div>
            {/* <br /> */}
            {/* <br /> */}
            {/* <span>
              List of your current medication, diet, and food preferences
            </span> */}
            <div
              style={{
                fontSize: '14px',
                margin: '12px 0 0 0',
                paddingBottom:'2rem'
                // display: 'inline-block',
                // width: '50%',
                // border: 'dashed'
              }}
            >
              List of your current medication, diet, and food preferences
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
