import React, { useState } from "react";
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

export default function SeminarRegister() {
  const history = useHistory();
  const elements = useElements();
  const stripe = useStripe();

  const [donation, setDonation] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function bookAppt() {
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
        business_code: "NITYA",
        payment_summary: temp,
      })
      .then(function (result) {
        console.log("createPaymentIntent result: " + JSON.stringify(result));
        console.log("clientSecret from createPaymentIntent: " + result.data);
        clientSecret = result.data;

        console.log("calling createPayment gMethod...");

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
    setSubmitted(true);
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
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="CardTitle">Donation</div>

            <div className="textTitle" style={{ marginTop: "3rem" }}>
              Please enter any amount you see fit.
            </div>
            <div>
              <input
                className="donationField"
                id="donation"
                type="text"
                placeholder="donation"
                onChange={(e) => setDonation(e.target.value)}
                value={donation}
                required
              />
              <CardElement
                elementRef={(c) => (this._element = c)}
                className="donationField"
              />
            </div>
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
      )}
    </div>
  );
}
