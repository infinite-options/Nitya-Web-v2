import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import ScrollToTop from "../Blog/ScrollToTop";
import SeminarImg from "../Assets/Images/Seminar.png";
import "../Home/Home.css";

export default function DonationConfirmation() {
  const history = useHistory();

  return (
    <div className="HomeContainer">
      <Helmet>
        <title>Seminar Registration</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies"
        />
      </Helmet>

      <div className="Card">
        <img
          src={SeminarImg}
          style={{ width: "100%", height: "100%" }}
          className="CardImage"
        />
        <div style={{ height: "auto" }}></div>
      </div>
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
    </div>
  );
}
