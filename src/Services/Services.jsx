import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import axios from "axios";
import Consulting from "./Consulting.jsx";
import Treatments from "./Treaments.jsx";
import ScrollToTop from "../Blog/ScrollToTop";

import "../Home/Home.css";

export default function Services() {
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [consulting, setConsulting] = useState([]);

  function stateChangeable() {
    setState(true);
  }

  function stateChangeableInvert() {
    setState(false);
  }

  const getServices = () => {
    axios
      .get(
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/treatments"
      )
      .then((res) => {
        console.log("response email", res.data.result);
        setData(res.data.result);
        let services = res.data.result;
        console.log(services);
        let treat = [];
        let consult = [];
        for (let i = 0; i < services.length; i++) {
          services[i].category === "Treatment"
            ? treat.push(services[i])
            : consult.push(services[i]);
        }
        setConsulting(consult);
        setTreatments(treat);
      });
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <div className="HomeContainer">
      <Helmet>
        <title>Services</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies."
        />
      </Helmet>
      <ScrollToTop />
      <div className="Card">
        <div className="Service_Title">Services</div>
        <div className="ButtonGrid">
          <Button
            onClick={stateChangeableInvert}
            style={{
              textTransform: "none",
              backgroundColor: !state ? "#D3A625" : "#DADADA",
              color: "black",
              fontSize: "20px",
            }}
          >
            Consulting
          </Button>
          <Button
            onClick={stateChangeable}
            style={{
              textTransform: "none",
              backgroundColor: state ? "#D3A625" : "#DADADA",
              color: "black",
              fontSize: "20px",
            }}
          >
            Therapies
          </Button>
        </div>

        <Box hidden={state}>
          <Consulting data={consulting} />
        </Box>

        <Box hidden={!state}>
          <Treatments data={treatments} />
        </Box>
      </div>
    </div>
  );
}
