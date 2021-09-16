import React, { useState } from "react";
import { Button, ButtonGroup } from "reactstrap";
import Consulting from "./Consulting";
import Treatments from "./Treatments";
import { makeStyles } from "@material-ui/core/styles";
import ScrollToTop from "../../Blog/ScrollToTop";
import Footer from "../../Footer/Footer";
import "./Services.css";

import heightContent from "./Consulting";

const Services = (props) => {

  const useStyles = makeStyles({
    container: {
      // paddingTop: "50px",
      display: "flex",
      backgroundColor: '#dadada',
      flexDirection: "column",
      alignItems: "center",
    },
    // services:{
    //   width: "980px",
    //   height: "1360px",
    //   backgroundColor: "white",
      // border: "1px solid blue",
    // },

    title:{
      font: "italic normal normal 54px/65px Hoefler Text",
      color: "#B28D42",
      padding: "30px 0 10px 0",

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

  return (
    <div className="page-container">
    <div className={classes.container} >
      <div className="services" id="services" aria-label={"service block"} >
        <div id="servicesContainer">
        <h1 className={classes.title}>Services</h1>
          <ScrollToTop />
          <div aria-label={"click button to switch service type."}>
            <ButtonGroup className="ButtonGroup">
              <Button
                id="btn1"
                className={activeComponent === "consulting" ? "selected" : ""}
                onClick={() => {
                  setRSelected(<Consulting />);
                  setActiveComponent("consulting");
                }}
                active={rSelected === <Consulting />}
              >
                Consulting
              </Button>
              <Button
                id="btn2"
                className={activeComponent === "treatments" ? "selected" : ""}
                onClick={() => {
                  setRSelected(<Treatments />);
                  setActiveComponent("treatments");
                }}
                active={rSelected === <Treatments />}
              >
                Body Therapies
              </Button>
            </ButtonGroup>
          </div>
          <p id="content"style={{ width: "fit-content", height: "fit-content" }}>
            {rSelected}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Services;
