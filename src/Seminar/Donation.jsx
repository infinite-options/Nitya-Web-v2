import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {
  Elements,
  useElements,
  useStripe,
  CardElement,
} from "@stripe/react-stripe-js";
import ScrollToTop from "../Blog/ScrollToTop";
import "../Home/Home.css";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;

export default function Donation(props) {
  console.log("in donation");
  const history = useHistory();
  const elements = useElements();
  const stripe = useStripe();
  const [customerUid, setcustomerUid] = useState("");
  const [customerUidState, setCustomerUidState] = useState(false);
  const [donation, setDonation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  console.log(props);
  useEffect(() => {
    const tempFind = [];

    const body = {
      phone_num: "",
      email: props.email,
    };
    // sendToDatabase();
    axios
      .post(
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/findCustomer",
        body
      )
      .then((response) => {
        console.log("response", response);
        for (var i = 0; i < response.data.result.length; i++) {
          tempFind.push(response.data.result[i]);
        }
        console.log("response", tempFind);
        for (var i = 0; i < tempFind.length; i++) {
          if (props.email === tempFind[i].customer_email) {
            console.log("response", tempFind[i].customer_uid);
            setcustomerUid(tempFind[i].customer_uid);
          }
        }
      });

    console.log("response", customerUid);
  }, [customerUidState]);

  function register() {
    var register = {
      first_name: props.first_name,
      last_name: props.last_name,
      email: props.email,
      city: props.city,
      state: props.state,
      mode: props.mode,
      notes: props.notes,
      donation: donation,
    };

    console.log(register);
    axios
      .post(BASE_URL + "SeminarRegister", register)
      .then((response) => {
        window.scrollTo({ behavior: "smooth", top: 620 });
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  function confirmation() {
    axios
      .post(BASE_URL + `RegistrationConfirmation/${props.email}`)
      .then((response) => {})
      .catch((error) => {
        console.log("error", error);
      });
  }

  async function bookAppt() {
    //setCustomerUidState(!customerUidState);
    const temp = {
      tax: 0,
      total: donation,
    };

    var clientSecret;
    const cardElement = await elements.getElement(CardElement);

    const postURL =
      "https://huo8rhh76i.execute-api.us-west-1.amazonaws.com/dev/api/v2/createPaymentIntent";
    axios
      .post(postURL, {
        customer_uid: "100-000001",
        business_code: props.notes === "NITYATEST" ? "NITYATEST" : "NITYA",
        payment_summary: temp,
      })
      .then(function (result) {
        console.log("createPaymentIntent result: " + JSON.stringify(result));
        console.log("clientSecret from createPaymentIntent: " + result.data);
        clientSecret = result.data;

        console.log(
          "calling createPayment gMethod...",
          clientSecret,
          result.data.billingDetails
        );
        //window.scrollTo({ behavior: "smooth", top: 620 });
        const paymentMethod = stripe
          .createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: result.data.billingDetails,
          })
          .then(function (res) {
            console.log("createPaymentMethod res: " + JSON.stringify(res));
            console.log(result.data.billingDetails);
            console.log("calling confirmedCardPayment...");

            try {
              const confirmedCardPayment = stripe
                .confirmCardPayment(clientSecret, {
                  payment_method: res.paymentMethod.id,
                  setup_future_usage: "off_session",
                })
                .then(function (result) {
                  console.log(
                    "confirmedCardPayment result: " + JSON.stringify(result)
                  );
                  if (props.notes === "NITYATEST") {
                    register();
                    confirmation();
                  }

                  window.scrollTo({ behavior: "smooth", top: 620 });
                  setSubmitted(true);
                })
                .catch((err) => {
                  console.log(err);
                  if (err.response) {
                    console.log("error: " + JSON.stringify(err.response));
                  }
                  setSubmitted(false);
                });
            } catch (e) {
              console.log("error trying to pay: ", e);
              setSubmitted(false);
            }
          });
      })
      .catch((err) => {
        console.log(err);
        if (err.response) {
          console.log("error: " + JSON.stringify(err.response));
          setSubmitted(false);
        }
      });
  }

  return (
    <div>
      {/* {props.registered ? (
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
              <div className="textTitle">{props.email}</div>
            </div>
            <div className="textTitle" style={{ marginTop: "3rem" }}>
              Please check your email for workshop details.
            </div>
          </div>
        </div>
      ) : null} */}

      {submitted ? (
        <div
          className="Card"
          style={{
            width: "60rem",

            backgroundColor: "white",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="CardTitle">Donation</div>

            <div className="textTitle" style={{ marginTop: "3rem" }}>
              Thank you. We really appreciate your contribution.
            </div>

            <button
              className="registerBtn"
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
          <div>
            <div className="CardTitle">Donation</div>

            <div className="textTitle" style={{ marginTop: "3rem" }}>
              Please enter any amount you see fit.
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                className="donationField"
                id="Donation"
                type="text"
                placeholder="Donation"
                onChange={(e) => setDonation(e.target.value)}
                value={donation}
                required
              />
              <CardElement
                elementRef={(c) => (this._element = c)}
                className="donationField"
              />
              <button
                className="registerBtn"
                onClick={() => {
                  bookAppt();
                }}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
