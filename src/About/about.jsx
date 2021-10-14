import React from "react";
import Img from "../Assets/Images/card2.png";
import ScrollToTop from "../Blog/ScrollToTop";
import '../About/about.css'

export default function About() {
 
  return (
    <div className="About_Container" >
       <title>Nitya Ayurveda About</title>
       <meta name="description" content="Written by Ajieth Venkat,
Illustrated by V. Gogh, Price: $17.99,
Length: 784 pages"/>
      <div >
        <div
        className="About_SubContainer"
          aria-label="Counselor Introduction Block"
          
        >
          <ScrollToTop />
          {/* <p className={classes.title}>Leena Marathay</p> */}
      
            <p className="BodyText" style={{paddingLeft:'5%', paddingRight:'5%', flex:'1'}}>
                <div className="Title"> Leena Marathay </div>
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

           
            <div className="AboutImage">
                <img
                  src={Img}
                  style={{objectFit:'contain', width:'100%', height:'90%'}}
                  alt="An image of Leena Marathay"
                />
            </div>
        </div>
      </div>
    </div>
  );
}
