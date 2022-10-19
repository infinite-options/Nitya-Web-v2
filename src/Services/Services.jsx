import React, { useState, useEffect } from "react";
import { Box, Button } from "@material-ui/core";
import { Helmet } from "react-helmet";
import axios from "axios";
import Consulting from "./Consulting.jsx";
import Treatments from "./Treaments.jsx";
import ScrollToTop from "../Blog/ScrollToTop";
import "../Home/Home.css";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function Services() {
  const [state, setState] = useState(false);
  const [data, setData] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [consulting, setConsulting] = useState([]);

  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;

  const [accessToken, setAccessToken] = useState("");

  function stateChangeable() {
    setState(true);
  }

  function stateChangeableInvert() {
    setState(false);
  }

  const getAccessToken = () => {
    let url = BASE_URL + "customerToken/";
    let customer_uid = "100-000093";
    axios
      .get(url + customer_uid)
      .then((response) => {
        var old_at = response["data"]["user_access_token"];
        var refreshToken = response["data"]["user_refresh_token"];

        fetch(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`,
          {
            method: "GET",
          }
        )
          .then((response) => {
            console.log("in events", response);
            if (response["status"] === 400) {
              // console.log("in events if");
              let authorization_url =
                "https://accounts.google.com/o/oauth2/token";

              var details = {
                refresh_token: refreshToken,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: "refresh_token",
              };

              var formBody = [];
              for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
              }
              formBody = formBody.join("&");
              console.log(details);
              fetch(authorization_url, {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
                },
                body: formBody,
              })
                .then((response) => {
                  return response.json();
                })
                .then((responseData) => {
                  // console.log(responseData);
                  return responseData;
                })
                .then((data) => {
                  // console.log(data);
                  let at = data["access_token"];
                  var id_token = data["id_token"];
                  setAccessToken(at);
                  // setIdToken(id_token);
                  // console.log("in events", at);
                  let url = BASE_URL + "UpdateAccessToken/";
                  axios
                    .post(url + customer_uid, {
                      user_access_token: at,
                    })
                    .then((response) => {})
                    .catch((err) => {
                      // console.log(err);
                    });
                  return accessToken;
                })
                .catch((err) => {
                  // console.log(err);
                });
            } else {
              // console.log("here", old_at);
              setAccessToken(old_at);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("in events", refreshToken);
      })
      .catch((error) => {
        console.log("Error in events" + error);
      });
  };

  console.log("in accesstoken", accessToken);
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
    getAccessToken();
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
          <Consulting data={consulting} accessToken={accessToken} />
        </Box>

        <Box hidden={!state}>
          <Treatments data={treatments} accessToken={accessToken} />
        </Box>
      </div>
    </div>
  );
}
