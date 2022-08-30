import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { useParams } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import { Radio } from "@material-ui/core";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Calendar from "react-calendar";
import { MyContext } from "../App";
import ScrollToTop from "../Blog/ScrollToTop";
import "./calendar.css";
import "../Appointment/AppointmentPage.css";

const YellowRadio = withStyles({
  root: {
    color: "#D3A625",
    "&$checked": {
      color: "#D3A625",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const useStyles = makeStyles({
  calendarBox: {
    marginLeft: "2rem",
    width: "80%",
    "@media (max-width: 500px)": {
      marginLeft: "0rem",
      width: "100%",
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
});
const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
export default function AppointmentPage(props) {
  console.log("(AppointmentPage) props: ", props);
  const location = useLocation();
  const access_token = location.state.accessToken;
  console.log("(AppointmentPage) accessToken: ", access_token);
  const classes = useStyles();
  const history = useHistory();

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
  const [mode, setMode] = useState({
    inPerson: true,
    online: false,
  });
  const [attendMode, setAttendMode] = useState("In-Person");
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
  const [timeAASlots, setTimeAASlots] = useState([]);
  const [duration, setDuration] = useState(null);
  const cost = elementToBeRendered.cost;

  const [buttonSelect, setButtonSelect] = useState(false);

  useEffect(() => {
    console.log();
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

  function convert(value) {
    var a = value.split(":"); // split it at the colons

    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

    return seconds + 1;
  }

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
    console.log("dateformat2", date);
    console.log(
      "dateformat2",
      months[doubleDigitMonth(date)] +
        " " +
        doubleDigitDay(date) +
        ", " +
        date.getFullYear() +
        " "
    );
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
    console.log("dateformat3", date);
    console.log(
      "dateformat3",
      date.getFullYear() +
        "-" +
        doubleDigitMonth(date) +
        "-" +
        doubleDigitDay(date)
    );
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

      var newDate = new Date((date + "T" + time).replace(/\s/, "T"));
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
      let hoursMode = "";
      hoursMode = attendMode === "Online" ? "Online" : "Office";
      console.log("407", duration);

      axios
        .get(
          "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/availableAppointments/" +
            apiDateString +
            "/" +
            duration +
            "/" +
            hoursMode
        )
        .then((res) => {
          console.log("This is the information we got" + res);
          // setTimeAASlots(res.data.result);
          // console.log("Timeslots Array " + timeSlots);

          res.data.result.map((r) => {
            timeAASlots.push(r["begin_time"]);
          });
          setTimeAASlots(timeAASlots);
        });
    }
    setDateHasBeenChanged(false);
  });

  useEffect(() => {
    if (dateHasBeenChanged) {
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + access_token,
      };
      const morningTime =
        attendMode === "Online" ? "T08:00:00-0800" : "T09:00:00-0800";
      const eveningTime =
        attendMode === "Online" ? "T20:00:00-0800" : "T20:00:00-0800";
      const data = {
        timeMin: apiDateString + morningTime,
        timeMax: apiDateString + eveningTime,
        items: [
          {
            id: "primary",
          },
        ],
      };
      console.log(headers);
      console.log(data);
      axios
        .post(
          `https://www.googleapis.com/calendar/v3/freeBusy?key=${API_KEY}`,
          data,
          {
            headers: headers,
          }
        )
        .then((response) => {
          let busy = response.data.calendars.primary.busy;
          let start_time = Date.parse(apiDateString + morningTime) / 1000;
          let end_time = Date.parse(apiDateString + eveningTime) / 1000;
          let free = [];
          let appt_start_time = start_time;

          let seconds = convert(duration);
          // Loop through each appt slot in the search range.
          while (appt_start_time < end_time) {
            // Add appt duration to the appt start time so we know where the appt will end.
            let appt_end_time = appt_start_time + seconds;

            // For each appt slot, loop through the current appts to see if it falls
            // in a slot that is already taken.
            let slot_available = true;

            busy.forEach((times) => {
              let this_start = Date.parse(times["start"]) / 1000;
              let this_end = Date.parse(times["end"]) / 1000;
              console.log(
                "freebusy busy times",
                busy,
                times["start"],
                times["end"]
              );
              // If the appt start time or appt end time falls on a current appt, slot is taken.
              if (
                (appt_start_time >= this_start && appt_start_time < this_end) ||
                (appt_end_time > this_start && appt_end_time <= this_end)
              ) {
                slot_available = false;
                return; // No need to continue if it's taken.
              }
            });
            console.log("freebusy", free);
            // If we made it through all appts and the slot is still available, it's an open slot.
            if (slot_available) {
              free.push(
                moment(new Date(appt_start_time * 1000)).format("HH:mm:ss")
              );
            }
            // + duration minutes
            appt_start_time += 60 * 30;
          }
          console.log("freebusy", free);
          setTimeSlots(free);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    setDateHasBeenChanged(false);
  });

  function renderAvailableApptsVertical() {
    console.log("TimeSlots", timeSlots);
    console.log("TimeSlotsAA", timeAASlots);

    let result = timeSlots.filter((o1) => timeAASlots.some((o2) => o1 === o2));
    console.log("Merged", result);
    return (
      <Grid container xs={11}>
        {result.map(function (element) {
          return (
            <button
              className={classes.timeslotButton}
              onClick={() => selectApptTime(element)}
            >
              {formatTime(apiDateString, element)}
            </button>
          );
        })}
      </Grid>
    );
  }
  const handleMode = (event) => {
    var optionPick = event.target.name;
    console.log(optionPick);
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
    console.log(newModeObj);
    setMode(newModeObj);
    setAttendMode(newMode);
  };
  function selectApptTime(element) {
    console.log("selected time", element);
    setSelectedTime(element);
    setTimeSelected(true);
    setButtonSelect(true);
  }

  return (
    <div className="HomeContainer">
      <ScrollToTop />
      <Helmet>
        <title>Book an Appointment</title>
        <meta
          name="description"
          content="Book an Appointment that's convenient to you"
        />
      </Helmet>
      <br />
      {bookNowClicked ? (
        <div>
          <div className="Card">
            <div className="CardGrid">
              <div>
                <div className="ApptPageTitle">{elementToBeRendered.title}</div>
                <div className="ApptPageText">
                  {elementToBeRendered.description} <br />
                </div>
                <div className="ApptPageHeader">
                  {parseDuration(elementToBeRendered.duration)} |{" "}
                  {elementToBeRendered.cost}
                </div>

                <div style={{ margin: "2rem" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    variant="top"
                    src={elementToBeRendered.image_url}
                    alt={"An image of" + elementToBeRendered.title}
                  />
                </div>
              </div>

              {/* Right hand side of the Container */}
              <div className={classes.calendarBox}>
                <div className="TitleFontAppt">Pick an Appointment Type</div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "1rem",
                    marginBottom: "2rem",
                  }}
                >
                  <FormControlLabel
                    control={
                      <YellowRadio
                        checked={mode.inPerson}
                        onChange={(e) => handleMode(e)}
                        name="inPerson"
                      />
                    }
                    label="In-person"
                  />
                  <FormControlLabel
                    control={
                      <YellowRadio
                        checked={mode.online}
                        onChange={(e) => handleMode(e)}
                        name="online"
                      />
                    }
                    label="Online"
                  />
                </div>
                <div className="TitleFontAppt">Pick an Appointment Date</div>
                {console.log("(Calendar) date: ", date)}
                <Calendar
                  calendarType="US"
                  onClickDay={dateChange}
                  value={date}
                  minDate={minDate}
                  next2Label={null}
                  prev2Label={null}
                />
              </div>
            </div>

            <div style={{ width: "100%", height: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  padding: "3%",
                }}
              >
                <div className="TitleFontAppt">Pick an Appointment Time</div>
                <div
                  className="BodyFontAppt"
                  style={{
                    color: "#D3A625",
                    fontSize: "18px",
                  }}
                >
                  Pacific Standard Time
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "center" }}>
                {renderAvailableApptsVertical()}
              </div>

              <div style={{ padding: "3%" }} hidden={!buttonSelect}>
                <button
                  onClick={() =>
                    history.push({
                      pathname: `/${treatmentID}/confirm`,
                      state: {
                        date: apiDateString,
                        time: selectedTime,
                        mode: attendMode,
                        accessToken: access_token,
                      },
                    })
                  }
                  className={classes.timeslotButton}
                >
                  Continue
                </button>
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
