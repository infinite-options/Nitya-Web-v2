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

  async function bookAppt() {
    setCustomerUidState(!customerUidState);
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
        customer_uid: customerUid,
        business_code: "NITYATEST",
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
        window.scrollTo({ behavior: "smooth", top: 620 });
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
    <div className="HomeContainer">
      <Helmet>
        <title>Seminar Registration</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies"
        />
      </Helmet>

      <ScrollToTop />
      {submitted ? (
        <div className="Card">
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
