import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  signInToGoogle,
  initClient,
  getSignedInUserEmail,
} from "../Appointment/GoogleApiService";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import "./BookNowBtn.css";
import "../Home/Home.css";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function BookNowBTN(props) {
  console.log("BookNowBtn props", props);
  const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  const [tID, setTID] = useState(props.apptID);
  const [accessToken, setAccessToken] = useState("");
  const [signedin, setSignedIn] = useState(false);
  const [bookNow, setBookNow] = useState(false);
  const [googleAuthedEmail, setgoogleAuthedEmail] = useState(null);
  const [idToken, setIdToken] = useState("");
  useEffect(() => {
    initClient((success) => {
      if (success) {
        getGoogleAuthorizedEmail();
      }
    });
  }, []);

  const getGoogleAuthorizedEmail = async () => {
    let email = await getSignedInUserEmail();
    if (email) {
      setSignedIn(true);
      setgoogleAuthedEmail(email);
    }
  };
  const getAuthToGoogle = async () => {
    let successfull = await signInToGoogle();
    if (successfull) {
      getGoogleAuthorizedEmail();
    }
    console.log("booknowbtn", successfull);
  };

  useEffect(() => {
    let url = BASE_URL + "customerToken/";
    let customer_uid = "100-000281";
    axios
      .get(url + customer_uid)
      .then((response) => {
        let url =
          "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";

        var old_at = response["data"]["user_access_token"];
        var refreshToken = response["data"]["user_refresh_token"];
        setAccessToken(old_at);
        let checkExp_url = url + old_at;
        fetch(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`,
          {
            method: "GET",
          }
        )
          .then((response) => {
            if (response["status"] === 400) {
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
                  console.log(responseData);
                  return responseData;
                })
                .then((data) => {
                  console.log(data);
                  let at = data["access_token"];
                  var id_token = data["id_token"];
                  console.log("new accesstoken", at);
                  setAccessToken(at);
                  setIdToken(id_token);
                  let url = BASE_URL + "UpdateAccessToken/";
                  axios
                    .post(url + customer_uid, {
                      user_access_token: at,
                    })
                    .then((response) => {})
                    .catch((err) => {
                      console.log(err);
                    });
                  return accessToken;
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              console.log("old accesstoken", old_at);
              setAccessToken(old_at);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        console.log("Error in events" + error);
      });
  }, [bookNow]);

  console.log("in accesstoken", accessToken);

  return (
    <div
      aria-label={"click button to book a session now"}
      style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
    >
      <Button
        style={{
          backgroundColor: "#D3A625",
          border: "none",
          borderRadius: "4px",
          width: "135px",
          height: "auto",
          align: "center",
          textDecorationLine: "none",
        }}
        onClick={() => {
          //getAcessToken();

          getAuthToGoogle();
          setSignedIn(true);
          setBookNow(true);
          {
            console.log("bookbtn1", accessToken);
          }
        }}
      >
        <Link
          to={{
            pathname: `/${tID}/appt`,
            state: { accessToken: accessToken },
          }}
          // to={`/${tID}/appt`}
          // params={{ accessToken: accessToken }}
          style={{ textDecoration: "none" }}
        >
          <p
            className="BookNowBtn"
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              fontSize: "24px",
              padding: "0px",
              margin: "5px",
              textDecoration: "none",
            }}
          >
            Book Now
          </p>
        </Link>
      </Button>
    </div>
  );
}
