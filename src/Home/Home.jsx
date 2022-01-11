import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";
import Intro from "../Intro/Intro.jsx";
import About from "../About/About.jsx";
import Services from "../Services/Services.jsx";
import Contact from "../Contact/Contact.jsx";
import ScrollToTop from "../Blog/ScrollToTop";

import "./Home.css";
import { Grid, Typography } from "@material-ui/core";

export default function Home() {
  const history = useHistory();
  const [seminarActive, setSeminarActive] = useState(false);

  useEffect(() => fetchSeminars(setSeminarActive), []);

  function fetchSeminars(setSeminarActive) {
    const endpoint = `https://3o9ul2w8a1.execute-api.us-west-1.amazonaws.com/dev/api/v2/promotions`;
    fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "Nitya" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        return response.json();
      })
      .then((json) => {
        const seminar = json;
        setSeminarActive(seminar === "ACTIVE");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="HomeContainer">
      <ScrollToTop />

      {seminarActive ? (
        <Grid
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#D3A625 0% 0% no-repeat padding-box",
            opacity: 1,
            minHeight: "40px",
            padding: "10px 10px",
            width: "100%",
            margin: "0",
          }}
        >
          <Typography
            style={{ textAlign: "left", color: "#FFFFFF", marginLeft: "2rem" }}
          >
            <span
              className="title"
              // style={{
              //   font: "italic normal normal 32px Hoefler Text",
              // }}
            >
              ‘Eating Right for Your Body Type’
            </span>
            &nbsp;&nbsp;&nbsp;
            <span
              className="subTitle"
              // style={{
              //   fontSize: "28px",
              // }}
            >
              In-person/Online Workshop
            </span>
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <div
            onClick={() => {
              history.push("/seminar");
            }}
            className="seminarBtn"
            // style={{
            //   background: "#FFFFFF 0% 0% no-repeat padding-box",
            //   borderRadius: "50px",
            //   font: "normal normal normal 24px/29px Hoefler Text",
            //   color: "#D3A625",
            //   textTransform: "none",
            //   border: "none",
            //   cursor: "pointer",
            //   padding: "0.7rem 4rem",
            // }}
          >
            Register
          </div>
        </Grid>
      ) : null}

      <div>
        <Intro />
      </div>
      <div>
        <About />
      </div>
      <div>
        <Services />
      </div>
      <div>
        <Contact />
      </div>
    </div>
  );
}
