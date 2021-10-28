import React, { useEffect, useRef, useState } from "react";

import Img from "../Assets/Images/card2.png";

import '../Home/Home.css';

export default function About(){
    return(
        <div className="Card">
            <div className="CardGrid">
            <div>
              <p className="CardText">
                <h1 className="CardTitle"> Leena Marathay </h1>
                <p>Leena is a NAMA (National Ayurvedic Medical Association)
                certified Ayurvedic Practitioner and an Ayurvedic Health and
                Lifestyle Counselor.</p>
                <p></p>
                She received her Classical Ayurveda training at Shubham Academy
                of Ayurveda in Fremont, California and has completed more than
                4,000 hours of training based on traditional Ayurvedic texts,
                covering diagnosis, Ayurvedic body treatments and clinical
                practice.
                <br></br>
                <p></p>
                Leena specializes in understanding the root cause of each
                client's health imbalance and suggests an individualized health
                plan guiding her clients to achieve optimum health with lasting
                results.
                </p>
            </div>
            <div>
            <img
                  src={Img}
                  className="CardImage"
                  alt="An image of Leena Marathay"
                />
            </div>
            </div>
        </div>
    )
}