import React, { useState, useEffect, useContext } from "react";

import StripeElement from "./StripeElement";
import { useLocation, useParams } from "react-router";
import ScrollToTop from "../Blog/ScrollToTop";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Row, Col } from "reactstrap";
import SimpleForm from "./simpleForm";
import SimpleFormText from "./simpleFormText";
import { makeStyles } from "@material-ui/core/styles";
import { MyContext } from "../App";
import moment from 'moment'
import Calendar from "react-calendar";
import "./calendar.css";
import { Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
//import { fontFamily } from "@mui/system";
import '../Appointment/AppointmentPage.css';

// import moment from "moment";


const useStyles = makeStyles({
  container: {
    margin: "50px auto",
   // width: "980px",
    padding: "50px 50px",
    backgroundColor: "white",
    width:'60%',
    "@media (max-width: 1050px)": {
      marginLeft:'0.5rem',
     width: "75%",
   },
  },
 
  content2: {
    fontSize: "20px",
    // fontFamily: "SFProDisplayRegular",
    color: "#D3A625",
    textAlign: "left",
  },
  
  selectTime2: {
    fontSize: "38px",
    color: "#D3A625",
    fontFamily: "Hoefler Text",
    margin: "0 auto",
    textAlign: "center",
  },
 
  bookButton: {
    width: "200px",
    height: "50px",
    cursor:'pointer',
    backgroundColor: "#D3A625",
    border: "2px solid #D3A625",
    color: "white",
    // padding: "0 10px 0 10px",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    fontFamily: "AvenirHeavy",
    "&:hover": {
      borderColor: "#D3A625",
      background: "#D3A625",
      color: "#white",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
    "&:disabled": {
      backgroundColor: "#D3A625",
      color: "white",
      opacity: "50%",
      "&:hover": {
        borderColor: "#D3A625",
      },
    },
  },
  
 
  timeslotButton: {
    width: "10rem",
    height: "3rem",
    maxWidth: "80%",
    backgroundColor: "white",
    border: "2px solid #D3A625",
    color: "#D3A625",
    // padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    display: "block",
    margin: "6px auto",
    "&:hover": {
      background: "#D3A625",
      color: "white",
    },
    "&:focus": {
      background: "#D3A625",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      background: "#D3A625",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
  },

  img:{
    width:'320px',
    "@media (max-width: 1050px)": {
      width:'280px',
    },
  },
});
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
export default function AppointmentPage(props) {
  

  const classes = useStyles();
  const location = useLocation();
  // moment().format();
  console.log("(AppointmentPageConfirm) props: ", props);
  //strip use states
  const access_token = location.state.accessToken;
  console.log("(AppointmentPageConfirm) accessToken: ", access_token);

  const { treatmentID } = useParams();
  const [stripePromise, setStripePromise] = useState(null);
  let PUBLISHABLE_KEY = "pk_test_51Ihyn......0wa0SR2JG";
  const [useTestKeys, setUseTestKeys] = useState(true);

  // form use states, Axios.Post
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [fName, setFName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [notes, setNotes] = useState("");

  // for hide & show
  const [infoSubmitted, setInfoSubmitted] = useState(false);
  // const [bookNowClicked, setBookNowClicked] = useState(false);
  const [bookNowClicked, setBookNowClicked] = useState(true);
  const [timeSelected, setTimeSelected] = useState(false);
  //import context
  const { serviceArr, servicesLoaded } = useContext(MyContext);
  const [elementToBeRendered, setElementToBeRendered] = useState([]);
  const treatment_uid = treatmentID;

  //for axios.get
  const [date, setDate] = useState(new Date());
  const [minDate, setMinDate] = useState(new Date());
  const [dateString, setDateString] = useState(null);
  const [dateHasBeenChanged, setDateHasBeenChanged] = useState(true);
  const [dateString1, setDateString1] = useState(null);
  const [apiDateString, setApiDateString] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [duration, setDuration] = useState(null);
  const cost = elementToBeRendered.cost;

  useEffect(() => {
    console.log()
  }, []);

  useEffect(() => {
    if (servicesLoaded) {
      serviceArr.forEach((element) => {
        if (element.treatment_uid === treatment_uid) {
          setElementToBeRendered(element);
          console.log("element to be rendered: ", elementToBeRendered);
          console.log("duration: ", elementToBeRendered.duration);
          // setDuration(parseDuration(elementToBeRendered.duration));
          setDuration(elementToBeRendered.duration);
        }
      });
    }
  });

  // parse duration
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

  // handle form changes
  const handleFullNameChange = (newFName) => {
    setFName(newFName);
  };

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  const handlePhoneNumChange = (newPhoneNum) => {
    setPhoneNum(newPhoneNum);
  };

  const handleNotesChange = (newNotes) => {
    setNotes(newNotes);
  };

  //for stripe
  function toggleKeys() {
    setUseTestKeys(!useTestKeys);
    setInfoSubmitted(true);

    if (notes === "NITYATEST") {
      // Fetch public key
      console.log("fetching public key");
      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/stripe_key/NITYATEST"
        )
        .then((result) => {
          console.log(
            "(1 PaymentDetails) Stripe-key then result (1): " +
              JSON.stringify(result)
          );

          let tempStripePromise = loadStripe(result.data.publicKey);

          console.log("(1 PaymentDetails) setting state with stripePromise");

          setStripePromise(tempStripePromise);

          console.log(tempStripePromise);
          console.log("(1 PaymentDetails) stripePromise set!");
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(
              "(1 PaymentDetails) error: " + JSON.stringify(err.response)
            );
          }
        });
    } else {
      // Fetch public key live

      console.log("fetching public key live");
      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/stripe_key/NITYA"
        )
        .then((result) => {
          console.log(
            "(2 PaymentDetails) Stripe-key then result (1): " +
              JSON.stringify(result)
          );

          let tempStripePromise = loadStripe(result.data.publicKey);

          console.log("(2 PaymentDetails) setting state with stripePromise");

          console.log(tempStripePromise);
          setStripePromise(tempStripePromise);

          console.log("(2 PaymentDetails) stripePromise set!");
        })
        .catch((err) => {
          console.log(err);
          if (err.response) {
            console.log(
              "(2 PaymentDetails) error: " + JSON.stringify(err.response)
            );
          }
        });

    }
  }

  // for appt
  //String formatting functions for the date variable

  const doubleDigitMonth = (date) => {
    let str = "00" + (date.getMonth() + 1);
    return str.substring(str.length - 2);
  };

  const doubleDigitDay = (date) => {
    let str = "00" + date.getDate();
    return str.substring(str.length - 2);
  };

  // This one is for
  const dateFormat1 = (date) => {
    return (
      doubleDigitMonth(date) +
      "/" +
      doubleDigitDay(date) +
      "/" +
      date.getFullYear()
    );
  };

  // This one is for the timeslotAPI call
  const dateFormat2 = (date) => {
    var months = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
      "": "",
    };
    return (
      months[doubleDigitMonth(date)] +
      " " +
      doubleDigitDay(date) +
      ", " +
      date.getFullYear() +
      " "
    );
  };

  // This one is for doing the sendToDatabase Post Call
  const dateFormat3 = (date) => {
    return (
      date.getFullYear() +
      "-" +
      doubleDigitMonth(date) +
      "-" +
      doubleDigitDay(date)
    );
  };

  const dateStringChange = (date) => {
    setDateString(dateFormat1(date));
    setApiDateString(dateFormat3(date));
    setDateString1(dateFormat2(date));
    setDateHasBeenChanged(true);
  };

  const dateChange = (date) => {
    setDate(date);
    dateStringChange(date);
    // setTimeSelected(true);
    if (timeSelected === true) {
      setTimeSelected(false);
    }
  };

  function formatTime(date, time) {
    if (time == null) {
      return "?";
    } else {
      // time = time.split(":");
      // // fetch
      // var hours = Number(time[0]);
      // var minutes = Number(time[1]);
      // var seconds = Number(time[2]);

      // // calculate
      // var strTime;

      // if (hours > 0 && hours <= 12) {
      //   strTime = "" + hours;
      // } else if (hours > 12) {
      //   strTime = "" + (hours - 12);
      // } else if (hours == 0) {
      //   strTime = "12";
      // }

      // strTime += minutes < 10 ? ":0" + minutes : ":" + minutes; // get minutes
      // strTime += seconds < 10 ? ":0" + seconds : ":" + seconds; // get seconds
      // strTime += hours >= 12 ? " P.M." : " A.M."; // get AM/PM
      console.log(date, time);
      var newDate = new Date((date + "T" + time).replace(/\s/, "T"));
      var hours = newDate.getHours();
      var minutes = newDate.getMinutes();
      console.log(hours,minutes)
      var ampm = hours >= 12 ? "pm" : "am";
      console.log(ampm);
      hours = hours % 12;
      console.log(hours);
      hours = hours ? hours : 12; // the hour '0' should be '12'
      console.log(hours);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      console.log(minutes);
      var strTime = hours + ":" + minutes + " " + ampm;
      console.log(strTime);
      return strTime;
    }
  }
    function convert(value) {
    var a = value.split(":"); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    return seconds + 1
  }

  //get appt
  useEffect(() => {
    if (dateHasBeenChanged) {
      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/availableAppointments/" +
            apiDateString +
            "/" +
            duration
        )
        .then((res) => {
          console.log("This is the information we got" + res.data);
          setTimeSlots(res.data.result);
          console.log("Timeslots Array " + timeSlots);
        });
    }
    setDateHasBeenChanged(false);
  });

  function renderAvailableApptsVertical() {
    return timeSlots.map((element) => (
      <Col  xs={3}>
        <button
          className={classes.timeslotButton}
          onClick={() => selectApptTime(element.begin_time)}
        >
          {formatTime(apiDateString, element.begin_time)}
        </button>
      </Col>
    ));
  }

  function selectApptTime(element) {
    setSelectedTime(element);
    setTimeSelected(true);
  }

  

  return (
    <div style={{ backgroundColor: "#DADADA" }}>
      <ScrollToTop />
      <br />
      {bookNowClicked || location.state.signedin ? (
        <div>
          <div
            className={classes.container}
            style={{
              padding: "40px 40px",
            }}
          >
            <div>
              <div>
                <div className={classes.selectTime2}>
                  <div className="TitleFontAppt">
                    Appointment scheduled for:
                  </div>
                </div>
                <br></br>

                <h1
                  style={{
                    fontSize: "30px",
                    margin: "0 auto",
                    textAlign: "center",
                  }}
                >
                  <span>
                    {moment(location.state.date).format("ll")} at{" "}
                    {formatTime(location.state.date, location.state.time)}
                  </span>
                </h1>
              </div>
            </div>
            <br />
            <div className="ApptConfirmContainer">
              <div>
                <p className={classes.content2} style={{ textAlign: "left" }}>
                  <span
                    style={{
                      fontWeight: "600",
                    }}
                  >
                    {elementToBeRendered.title}
                  </span>
                  <br />
                  {parseDuration(elementToBeRendered.duration)} |{" "}
                  {elementToBeRendered.cost}
                </p>
                <img
                  src={elementToBeRendered.image_url}
                  className={classes.img}
                  style={{ objectFit: "cover", textAlign: "left" }}
                  alt=""
                />
                <br />
                <br />
                <p className={classes.content2} style={{ textAlign: "left" }}>
                  6055 Meridian Ave #40
                  <br />
                  San Jose, CA, 95120
                  <br />
                  <br />
                  Office: (408) 471-7004
                </p>
              </div>
              <div className="ApptConfirmTextBox">
                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <SimpleForm
                    field="Full Name"
                    onHandleChange={handleFullNameChange}
                  />
                </div>

                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <SimpleForm
                    field="Email Address"
                    onHandleChange={handleEmailChange}
                  />
                </div>
                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <SimpleForm
                    field="Phone Number - 10 digits only"
                    maxLength="10"
                    onHandleChange={handlePhoneNumChange}
                  />
                </div>

                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <SimpleFormText
                    field="Type your message here"
                    onHandleChange={handleNotesChange}
                  />
                </div>
                <div
                  hidden={!infoSubmitted}
                  style={{
                    background: "white",
                  }}
                >
                  <StripeElement
                    accessToken={access_token}
                    stripePromise={stripePromise}
                    treatmentID={treatmentID}
                    treatmentName={elementToBeRendered.title}
                    notes={notes}
                    infoSubmitted={infoSubmitted}
                    fName={fName}
                    email={email}
                    phoneNum={phoneNum}
                    date={moment(location.state.date).format("ll")}
                    selectedTime={formatTime(
                      location.state.date,
                      location.state.time
                    )}
                    purchaseDate={purchaseDate}
                    cost={cost}
                    treatmentDate={location.state.date}
                    treatmentTime={location.state.time}
                    duration={elementToBeRendered.duration}
                    image_url={elementToBeRendered.image_url}
                  />
                </div>
                <div
                  aria-label={"click button to book your appointment"}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className={classes.bookButton}
                    hidden={infoSubmitted}
                    onClick={toggleKeys}
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <br />
      <br />
    </div>
  );
}

/**
 * Things to work on
 *
 * 1. The axios call happens everytime a new date is clicked on the calendar. That's overkill.
 * Instead figure out a way to load the information retrieved from the endpoint into an array.
 *
 * 2.Figure out how to ensure that when the apptPage is loaded up, that the current date is initialy selected.
 * As of the momment, when the page loads, it holds "00/00/0000" as the selected date.
 *
 * 3.Prior to rendering the appointment page
 */
