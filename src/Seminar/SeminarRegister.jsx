import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import ScrollToTop from "../Blog/ScrollToTop";
import SeminarImg from "../Assets/Images/Seminar.png";
import "../Home/Home.css";
import { Typography } from "@material-ui/core";
import { Radio } from "@material-ui/core";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const useStyles = makeStyles({
  inputField: {
    background: "#FFFFFF 0% 0% no-repeat padding-box",
    border: " 2px solid #D3A625",
    borderRadius: "25px",
    height: "40px",
    width: "40%",
    textAlign: "left",
    font: "normal normal normal 19px/23px SF Pro Display",
    color: "#000000",
    letterSpacing: " 0.47px",
    padding: "0.5rem",
  },
});

const YellowRadio = withStyles({
  root: {
    color: "#D3A625",
    "&$checked": {
      color: "#D3A625",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function SeminarRegister() {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [mode, setMode] = useState({
    inPerson: true,
    online: false,
  });
  const [attendMode, setAttendMode] = useState("In-Person");
  const [registered, setRegistered] = useState(false);
  const handleMode = (event) => {
    var optionPick = event.target.name;
    var newModeObj = {};
    var newMode = "";
    if (optionPick === "inPerson") {
      newModeObj = {
        inPerson: true,
        online: false,
      };
      newMode = "In-Person";
    } else {
      newModeObj = {
        inPerson: false,
        online: true,
      };
      newMode = "Online";
    }
    setMode(newModeObj);
    setAttendMode(newMode);
  };

  function register() {
    var register = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      city: city,
      state: state,
      mode: attendMode,
    };

    axios
      .post(BASE_URL + "SeminarRegister", register)
      .then((response) => {
        setFirstName("");
        setLastName("");

        setCity("");
        setState("");
        setAttendMode("In-Person");
        setMode({
          inPerson: true,
          online: false,
        });
        setRegistered(true);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  function confirmation() {
    axios
      .post(BASE_URL + `RegistrationConfirmation/${email}`)
      .then((response) => {})
      .catch((error) => {
        console.log("error", error);
      });
  }
  return (
    <div className="HomeContainer">
      <Helmet>
        <title>Seminar Registration</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies"
        />
      </Helmet>

      <ScrollToTop />
      <div className="Card">
        <img
          src={SeminarImg}
          style={{ width: "100%", height: "100%" }}
          className="CardImage"
        />
      </div>
      {registered ? (
        <div className="Card">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="CardTitle">Registration Confirmed</div>
            <div className="textConfirm" style={{ marginTop: "3rem" }}>
              Congrats! You are now registered for the workshop.
              <br />
              We have sent a confirmation email to
              <div className="textTitle">{email}</div>
            </div>
            <div className="textTitle" style={{ marginTop: "3rem" }}>
              Please check your email for workshop details.
            </div>
            <button
              className="registerBtn"
              //   style={{
              //     background: "#D3A625",
              //     borderRadius: "50px",
              //     border: "none",
              //     font: "normal normal normal 24px/29px Hoefler Text",
              //     color: "#FFFFFF",
              //     marginTop: "5rem",
              //     marginBottom: "5rem",
              //     padding: "0.7rem 4rem",
              //     cursor: "pointer",
              //   }}
              onClick={() => {
                history.push("/");
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
      ) : (
        <div className="Card">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="CardTitle">Register</div>
            <input
              className="inputField"
              id="First Name"
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />
            <br />
            <input
              className="inputField"
              id="Last Name"
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              required
            />
            <br />
            <input
              className="inputField"
              id="Email"
              type="text"
              placeholder="Email Address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <br />
            <input
              className="inputField"
              id="City"
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />
            <br />
            <input
              className="inputField"
              id="sweep_referrer"
              type="text"
              placeholder="State"
              onChange={(e) => setState(e.target.value)}
              value={state}
            />
            <br />
            <Typography className="textTitle">
              How do you plan on attending the workshop?
            </Typography>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <YellowRadio
                      checked={mode.inPerson}
                      onChange={(e) => handleMode(e)}
                      name="modeInPerson"
                    />
                  }
                  label="In-person"
                />
                <FormControlLabel
                  control={
                    <YellowRadio
                      checked={mode.online}
                      onChange={(e) => handleMode(e)}
                      name="modeOnline"
                    />
                  }
                  label="Online"
                />
              </FormGroup>
            </div>
            <br />
            <button
              className="registerBtn"
              //   style={{
              //     background: "#D3A625",
              //     borderRadius: "50px",
              //     border: "none",
              //     font: "normal normal normal 24px/29px Hoefler Text",
              //     color: "#FFFFFF",
              //     padding: "0.7rem 4rem",
              //     cursor: "pointer",
              //     marginBottom: "5rem",
              //   }}
              onClick={() => {
                register();
                confirmation();
              }}
            >
              Register Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
