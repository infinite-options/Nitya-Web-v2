import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import CAAM from "../Assets/Images/CAAM-logo.png";
import Namacb from "../Assets/Images/namacb.png";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import "../Home/Home.css";

export default function Footer() {
  const history = useHistory();

  return (
    <div>
      <Helmet>
        <title>Address</title>
        <meta name="description" content="Visit our San Jose Office" />
      </Helmet>

      <div className="FooterTextWrapper">
        <div className="FooterText">
          <div>6055 Meridian Ave, Ste. 40A,</div>
          <div>San Jose, CA 95120</div>
        </div>

        <div className="FooterText">
          <div className="FooterTitle">Leena Marathay</div>
          <div>NAMA Certified Ayurvedic Practitioner</div>
        </div>

        <div className="FooterText" style={{ border: "0px" }}>
          <div>Office: 408 471 7004</div>
          <div>Email: Leena@nityaayurveda.com</div>
        </div>
      </div>
      <div className="FooterTextWrapper">
        <img
          src={Namacb}
          style={{ height: "7rem", justifySelf: "center", alignSelf: "center" }}
        />
        <img
          src={CAAM}
          className="MobileImage"
          style={{ height: "8rem", justifySelf: "center", alignSelf: "center" }}
        />
        <InstagramIcon
          fontSize="large"
          className="instagram-icon"
          style={{ color: "black", justifySelf: "center", alignSelf: "center" }}
          onClick={(event) =>
            (window.location.href = "https://www.instagram.com/nityaayurveda/")
          }
        />
      </div>

      <div
        style={{ marginTop: "3rem", marginBottom: "2rem", textAlign: "center" }}
      >
        <button
          onClick={() => {
            history.push("/login");
          }}
          style={{
            textTransform: "none",
            cursor: "pointer",
            color: "#C3A336",
            backgroundColor: "white",
            border: "0px",
          }}
        >
          © 2021 by Leena Marathay
        </button>
      </div>
    </div>
  );
}
