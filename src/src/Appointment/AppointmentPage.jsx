import React, { useState, useEffect, useContext } from "react";

import StripeElement from "./StripeElement";
import { useParams } from "react-router";
//import ScrollToTop from "../../Blog/ScrollToTop";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Row, Col } from "reactstrap";
import SimpleForm from "./simpleForm";
import SimpleFormText from "./simpleFormText";
import { makeStyles } from "@material-ui/core/styles";
import { MyContext } from "../App";
import Calendar from "react-calendar";
import "./calendar.css";
import { Container } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import { Link } from "react-router-dom";

// import moment from "moment";

const useStyles = makeStyles({
  container: {
    margin: "50px auto",
    width: "980px",
    padding: "50px 50px",
    backgroundColor: "white",
  },
  // h1: {
  //   fontSize: "24px",
  //   color: "#B28D42",
  //   fontFamily: "Hoefler",
  // },
  h1: {
    fontSize: "24px",
    color: "#B28D42",
    paddingTop: "15px",
    fontFamily: "Hoefler",
  },
  content: {
    fontSize: "22px",
    fontFamily: "SFProDisplayRegular",
    color: "#B28D42",
    textAlign: "center",
  },
  content2: {
    fontSize: "20px",
    // fontFamily: "SFProDisplayRegular",
    color: "#B28D42",
    textAlign: "left",
  },
  content3: {
    fontSize: "22px",
    // fontFamily: "SFProDisplayRegular",
    color: "#B28D42",
    textAlign: "center",
  },
  selectTime: {
    fontSize: "32px",
    color: "#52330D",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },
  selectTime2: {
    fontSize: "24px",
    color: "#B28D42",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },
  CalendarContainer: {
    margin: "auto",
    width: "60%",
    backgroundColor: "white",
  },
  bookButton: {
    width: "200px",
    height: "50px",
    backgroundColor: "#B28D42",
    border: "2px solid #B28D42",
    color: "white",
    // padding: "0 10px 0 10px",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    fontFamily: "AvenirHeavy",
    "&:hover": {
      borderColor: "#52330D",
      background: "#52330D",
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
      backgroundColor: "#B28D42",
      color: "white",
      opacity: "50%",
      "&:hover": {
        borderColor: "#B28D42",
      },
    },
  },
  button: {
    backgroundColor: "white",
    border: "2px solid #B28D42",
    color: "#B28D42",
    padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    fontSize: "20px",
    borderRadius: "50px",
    margin: "2px auto",
    "&:hover": {
      background: "#B28D42",
      color: "white",
    },
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
  },
  buttonDisable: {
    backgroundColor: "#B28D42",
    border: "none",
    color: "white",
    padding: "15px 100px",
    textAlign: "center",
    textDecoration: "none",
    display: "block",
    fontSize: "20px",
    borderRadius: "50px",
    margin: "0 auto",
    opacity: "50%",
    boxShadow: "none",
    "&:focus": {
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      outline: "none",
      boxShadow: "none",
    },
  },
  inputRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  date: {
    fontSize: "42px",
    fontFamily: "AvenirHeavy",
    margin: "0 auto",
    textAlign: "center",
  },
  calendarTimeTable: {
    width: "100%",
    margin: "0 auto",
    // border: "solid blue",
    height: "520px",
  },
  // calendarBox: {
  //   width: "50%",
  //   height: "550px",
  //   padding: "20px",
  //   backgroundColor: "#B28D42",
  // },
  calendarBox: {
    marginLeft:'5rem',
    width: "60%",
  //  backgroundColor: "#B28D42",
  },
  // timeslotBox: {
  // width: "50%",
  // height: "350px",
  //padding: "20px",
  // },
  timeslotBox: {
    width: "100%",
    // height: "350px",
    height: "100%",
    // display: "inline-block",
    // overflow: "auto",
    // display: "inline-block",
    // flexDirection: "column",
    // border: "dashed"
    //padding: "20px",
  },
  center: {
    margin: "0 auto",
    // border: 'solid',
    // height: '200px'
  },
  timeslotButton: {
    width: "10rem",
    height: "3rem",
    maxWidth: "80%",
    backgroundColor: "white",
    border: "2px solid #B28D42",
    color: "#B28D42",
    // padding: "15px 90px",
    textAlign: "center",
    textDecoration: "none",
    fontSize: "20px",
    borderRadius: "50px",
    display: "block",
    margin: "6px auto",
    "&:hover": {
      background: "#B28D42",
      color: "white",
    },
    "&:focus": {
      background: "#B28D42",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
    "&:active": {
      background: "#B28D42",
      color: "white",
      outline: "none",
      boxShadow: "none",
    },
  },

  timeslotButtonBox: {
    width: "100%",
    // border: "1px solid green",
    // overflow: "hidden",
    // overflowY: "scroll",
    // height: "300px",
    borderTop: "1px solid rgb(178,141,66,0.5)",
    // height: "426px",
    // flexGrow: "1",
    // overflow: "hidden",
    height: "calc(100% - 100px)",
    // margin: "0 auto",
    overflowY: "scroll",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "10px",
      // border: "1px solid black",
      borderRadius: "20px",
      // padding: "1px 0",
      backgroundColor: "white",
    },
    "&::-webkit-scrollbar-thumb": {
      border: "1px solid #000",
      borderRadius: "20px",
      // padding: "1px 0",
      backgroundColor: "#52330D",
    },
  },
  img: {
    width: "100%",
  },
});

export default function AppointmentPage(props) {
  console.log("(AppointmentPage) props: ", props);

  const classes = useStyles();
  const history = useHistory()

  // moment().format();

  //strip use states
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
      10: "Oct",
      11: "Nov",
      12: "Dec",
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

      var newDate = new Date(date + " " + time);
      var hours = newDate.getHours();
      var minutes = newDate.getMinutes();
      var ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      var strTime = hours + ":" + minutes + " " + ampm;
      return strTime;
    }
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
    return (
      <Grid container xs={11}  >
      {timeSlots.map((element) => (
        <button
          className={classes.timeslotButton}
          onClick={() => selectApptTime(element.begin_time)}
        >
          {formatTime(apiDateString, element.begin_time)}
        </button>
    ))}
    </Grid>
    )
  }

  function selectApptTime(element) {
    setSelectedTime(element);
    setTimeSelected(true);
  }

  return (
    <div style={{ backgroundColor: "#DADADA" }}>
      {/* <ScrollToTop /> */}
      <br />
      {bookNowClicked ? (
        <div>
          <div
            className={classes.CalendarContainer}
            aria-label={"find a day to meet"}
            style={{
              // border: "dashed",
              maxWidth: "96%",
            }}
          >
            <div style={{display:'flex', padding:'5%'}}>
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
                {/* <br /> */}
                <img
                  src={elementToBeRendered.image_url}
                  //className={classes.img}
                  style={{objectFit:'cover', width:'320px', textAlign:'left'}}
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
            <div className={classes.calendarBox}>
                <h1
                  style={{
                    textAlign: "center",
                    color:"#B28D42",
                    fontFamily: "AvenirHeavy",
                    fontSize: "25px",
                  }}
                >
                   Pick a Date for your appointment
                </h1>
                {console.log("(Calendar) date: ", date)}
                <Calendar
                  //backgroundColor="#d3a625"
                  calendarType="US"
                  onClickDay={dateChange}
                  value={date}
                  minDate={minDate}
                  //className={classes.center}
                  next2Label={null}
                  prev2Label={null}
                />
              </div>
              </div>
           
              <div className={classes.timeslotBox}>
                <div
                  style={{
                    height: "100px",
                    maxHeight: "100px",
                    display: "flex",
                    justifyContent:'space-between',
                    padding:'5%',
                    // alignItems: "center",
                    // maxHeight: "100px",
                    // width: "100%",
                    // border: "1px solid blue"
                  }}
                >
                  <div
                   // className={classes.h1}
                    style={{
                      textAlign: "left",
                      // border: "1px solid red",
                      // marginTop: "20px",
                      color: "#B28D42",
                      fontWeight:'bold',
                      fontSize: "28px",
                      height: "50%",
                    }}
                  >
                   Pick a Time for your appointment
                  </div>
                  <div
                    style={{
                    //  textAlign: "left",
                      color: "#B28D42",
                      // fontFamily: "AvenirHeavy",
                      fontWeight:'bold',
                      fontSize: "19px",
                      // border: "dashed"
                      // border: "1px solid red",
                      height: "50%",
                    }}
                  >
                    UTC - 07:00 Pacific Time
                  </div>
                </div>
                {/* <div className={classes.timeslotButtonBox}> */}
                <Container style={{marginTop:'-3rem', marginLeft:'2rem'}} >
                  {renderAvailableApptsVertical()}
                {/* </div> */}
              </Container>
              </div>
              <button onClick={()=> history.push({pathname: `/${treatmentID}/confirm`,state: {date:apiDateString ,time :selectedTime}})} style={{color:'white', backgroundColor:'#C3A336', border:'0px', width:'20%', height:'3rem', borderRadius:'24px', marginBottom:'2rem', marginTop:'1rem'}}> Continue </button>

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
