import React from "react";
import { useHistory } from "react-router";
import { Helmet } from "react-helmet";
import card1 from "../Assets/Images/card1.jpg";
import ScrollToTop from "../Blog/ScrollToTop";
import "../Home/Home.css";

export default function Intro() {
  const history = useHistory();
  return (
    <div className="HomeContainer">
      <Helmet>
        <title>About</title>
        <meta
          name="description"
          content="We offer Ayurvedic health consultations, Panchakarma (cleansing & purification treatments) and classical Ayurvedic wellness therapies"
        />
      </Helmet>

      <ScrollToTop />
      <div className="Card">
        {/* <Helmet>
                        <title>Home</title>
                        <meta name="description" content="Nitya Ayurveda is a holistic healing center that offers classical Ayurvedic solutions for your health issues with herbal plans, diet and lifestyle guidance, and follow ups.  The center also offers Panchakarma (cleansing and purification treatments) and traditional Ayurvedic wellness therapies to maintain health, relaxation and rejuvenation." />
                    </Helmet> */}
        <div className="CardGrid">
          <div
            className="IntroGrid"
            // style={{
            //   display: "flex",
            //   flexDirection: "column",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   flex: "1",
            // }}
          >
            <div className="CardTitle">Helping your body heal itself</div>
            {/* <button className="CardButton"> Test </button> */}
            <button
              className="CardButton"
              onClick={() => {
                history.push("/services");
              }}
            >
              Book a Session
            </button>
          </div>
          <div>
            <img src={card1} className="CardImage" />
          </div>
        </div>
      </div>
    </div>
  );
}
