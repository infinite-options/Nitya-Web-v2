import React, { useState } from "react";
import Consulting from "./consulting";
import Treatments from "./Treatments";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../Blog/ScrollToTop";
//import Footer from "../../Footer/Footer";
import "./Services.css";
import { Button, ButtonGroup } from "reactstrap";
import { height } from "@mui/system";
import DocumentMeta from 'react-document-meta';


const Services = (props) => {
  const useStyles = makeStyles({
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor:'white',
      marginTop:'2rem',
    // width:'65%',
    //  marginLeft:'0%',
      "@media (max-width: 500px)": {
        width: "100%",
      },
      "@media (min-width: 500px)": {
        marginLeft:'17.5%',
      },
      // "@media (max-width: 1850px) and (min-width: 1600px)": {
      //   width: "100%",
      //   marginLeft:'20%'
      // },
    },

 

    ButtonGroup: {
      top: 0,
      marginTop: "30px",
    },

    btn1: {
      width: "153px",
      height: "32px",
      font: "normal normal normal 32px/38px Hoefler Text",
      letterSpacing: "0px",
      color: "#B28D42",
      opacity: "1",
      backgroundColor: "transparent",
      //border: "1px solid #88898a",
      border: "none",
      //borderRadius: "0px",
      // color: "#b28d42",
      // fontSize: "2.5rem",
      marginRight: "50px",
      padding: "1px 1px",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#B28D42",
        border: "#B28D42",
      },
    },
    btn2: {
      width: "253px",
      height: "32px",
      font: "normal normal normal 32px/38px Hoefler Text",
      letterSpacing: "0px",
      color: "#B28D42",
      opacity: "1",
      backgroundColor: "transparent",
      padding: "1px 1px",

      border: "none",
      "&:hover": {
        backgroundColor: "transparent",
        color: "#B28D42",
        border: "#B28D42",
      },
    },
  });
  const classes = useStyles();

  const [rSelected, setRSelected] = useState(<Consulting />);
  const [activeComponent, setActiveComponent] = useState("consulting");

  const meta = {
    title: 'Services',
    description: 'We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies.',
    canonical: 'https://nityaayurveda.com/services',
    meta: {
        charset: 'utf-8',
        name: {
            keywords: 'react,meta,document,html,tags'
        }
    }
  }

  return (
    <div className={classes.container} style={{width:activeComponent === "treatments" ? "70%" : "65%", marginLeft:activeComponent === "treatments" ? "15%" : '17.5%'}} >
       <DocumentMeta {...meta}/>
         <ScrollToTop/>
        <div id="servicesContainer" >
        <div className="BoxContainer_1_title" style={{marginTop:'2rem'}}>
            Services
        </div>
          {/* <ScrollToTop /> */}
          <div aria-label={"click button to switch service type."}>
            <ButtonGroup className="ButtonGroup">
              <Button
                id="btn1"
                style={{color: activeComponent === "consulting" ? "" : 'black'}}
                className={activeComponent === "consulting" ? "selected" : ""}
                onClick={() => {
                    setActiveComponent("consulting");
                  setRSelected(<Consulting selected={activeComponent} />);
                }}
                active={rSelected === <Consulting selected={activeComponent} />}
              >
                Consulting
              </Button>
              
              <Button
                id="btn2"
                style={{color: activeComponent === "treatments" ? "" : 'black'}}
                className={activeComponent === "treatments" ? "selected" : ""}
                onClick={() => {
                    setActiveComponent("treatments");
                    setRSelected(<Treatments selected={activeComponent} />);
                }}
                active={rSelected === <Treatments selected={activeComponent} />}
              >
                Body Therapies
              </Button>
            </ButtonGroup>
          </div>
          <p style={{ width: "100%", height: activeComponent === "treatments" ? "85rem" : "115rem" }}>
            {rSelected}
          </p>
        </div>
    </div>
  );
};

export default Services;
