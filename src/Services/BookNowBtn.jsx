import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./BookNowBtn.css";
import "../Home/Home.css";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

const useStyles = makeStyles({
  dialog: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  dialogActions: {
    display: "flex",
    justifyContent: "space-evenly",
  },

  dialogButton: {
    cursor: "pointer",
    backgroundColor: "#D3A625",
    border: "2px solid #D3A625",
    color: "white",
    textDecoration: "none",
    width: "100px",
    fontSize: "24px",
    borderRadius: "50px",
    fontFamily: "AvenirHeavy",
    "&:hover": {
      borderColor: "#D3A625",
      background: "#D3A625",
      color: "#white",
    },
  },
});

export default function BookNowBTN(props) {
  // console.log("BookNowBtn props", props);
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  const [tID, setTID] = useState(props.apptID);
  // const [accessToken, setAccessToken] = useState("");
  const [signedin, setSignedIn] = useState(false);
  const [bookNow, setBookNow] = useState(false);
  const classes = useStyles();
  const [showDialog, setShowDialog] = useState(false);
  // useEffect(() => {
  //   getAccessToken();
  // }, []);

  // const getAccessToken = () => {
  //   let url = BASE_URL + "customerToken/";
  //   let customer_uid = "100-000093";
  //   axios
  //     .get(url + customer_uid)
  //     // fetch(url + customer_uid, {
  //     //   method: "GET",
  //     // })
  //     .then((response) => {
  //       // console.log("in events", response);
  //       // setSignedIn(true);

  //       var old_at = response["data"]["user_access_token"];
  //       // console.log("in events", old_at);
  //       var refreshToken = response["data"]["user_refresh_token"];

  //       // axios
  //       //   .get(
  //       //     `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`
  //       //   )
  //       fetch(
  //         `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`,
  //         {
  //           method: "GET",
  //         }
  //       )
  //         .then((response) => {
  //           console.log("in events", response);
  //           if (response["status"] === 400) {
  //             // console.log("in events if");
  //             let authorization_url =
  //               "https://accounts.google.com/o/oauth2/token";

  //             var details = {
  //               refresh_token: refreshToken,
  //               client_id: CLIENT_ID,
  //               client_secret: CLIENT_SECRET,
  //               grant_type: "refresh_token",
  //             };

  //             var formBody = [];
  //             for (var property in details) {
  //               var encodedKey = encodeURIComponent(property);
  //               var encodedValue = encodeURIComponent(details[property]);
  //               formBody.push(encodedKey + "=" + encodedValue);
  //             }
  //             formBody = formBody.join("&");
  //             console.log(details);
  //             fetch(authorization_url, {
  //               method: "POST",
  //               headers: {
  //                 "Content-Type":
  //                   "application/x-www-form-urlencoded;charset=UTF-8",
  //               },
  //               body: formBody,
  //             })
  //               .then((response) => {
  //                 return response.json();
  //               })
  //               .then((responseData) => {
  //                 // console.log(responseData);
  //                 return responseData;
  //               })
  //               .then((data) => {
  //                 // console.log(data);
  //                 let at = data["access_token"];
  //                 var id_token = data["id_token"];
  //                 setAccessToken(at);
  //                 // setIdToken(id_token);
  //                 // console.log("in events", at);
  //                 let url = BASE_URL + "UpdateAccessToken/";
  //                 axios
  //                   .post(url + customer_uid, {
  //                     user_access_token: at,
  //                   })
  //                   .then((response) => {})
  //                   .catch((err) => {
  //                     // console.log(err);
  //                   });
  //                 return accessToken;
  //               })
  //               .catch((err) => {
  //                 // console.log(err);
  //               });
  //           } else {
  //             // console.log("here", old_at);
  //             setAccessToken(old_at);
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //       console.log("in events", refreshToken);
  //     })
  //     .catch((error) => {
  //       console.log("Error in events" + error);
  //     });
  // };

  // console.log("in accesstoken", accessToken);

  return (
    <div
      aria-label={"click button to book a session now"}
      style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
    >
      <Dialog
        open={showDialog}
        onClose={()=>setShowDialog(false)}
        aria-labelledby="alert-dialog-title"
        className={classes.dialog}
      >
        <DialogTitle id="alert-dialog-title">
          {"Question"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Have you had an Initial Consultation?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <Button
            className={classes.dialogButton}
          >
            <Link
              to={{
                pathname: `/${tID}/appt`,
              }}
              style={{ textDecoration: "none" }}
            >
              Yes
            </Link>
          </Button>
          <Button
            className={classes.dialogButton}
          >
            <Link
              to={{
                pathname: `/330-000010/appt`,
              }}
              style={{ textDecoration: "none" }}
            >
              No
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        className="BookNowBtn"
        onClick={() => {
          setSignedIn(true);
          setBookNow(true);
        }}
      >
        {tID==='330-000005'?
        <div role="button" 
          onClick={()=>setShowDialog(true)}
          style={{cursor: "pointer"}}>
          <p className="BookNowBtn">Book Now</p>
        </div>
        :<Link
          to={{
            pathname: `/${tID}/appt`,
          }}
          // to={`/${tID}/appt`}
          // params={{ accessToken: accessToken }}
          style={{ textDecoration: "none" }}
        >
          <p className="BookNowBtn">Book Now</p>
        </Link>}
      </Button>
    </div>
  );
}
