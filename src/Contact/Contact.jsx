    import React, { useEffect, useRef, useState } from "react";
    import {Box, Button} from '@material-ui/core';
    import { useHistory } from 'react-router';
    import {Helmet} from "react-helmet";

    import card1 from "../Assets/Images/card1.jpg";

    import '../Home/Home.css';

    export default function Intro(){

        const history = useHistory()
        return(
            <div className="HomeContainer" >

                <div className="Card">
                    {/* <Helmet>
                        <title>Home</title>
                        <meta name="description" content="Nitya Ayurveda is a holistic healing center that offers classical Ayurvedic solutions for your health issues with herbal plans, diet and lifestyle guidance, and follow ups.  The center also offers Panchakarma (cleansing and purification treatments) and traditional Ayurvedic wellness therapies to maintain health, relaxation and rejuvenation." />
                    </Helmet> */}
                    <div className="CardGrid">
                    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center',border:'2px solid green'}}>
                        {/* <div className="CardTitle">Helping your body heal itself</div> */}
                        <div className="CardTitle" style={{marginBottom:'2rem'}}>Contact Us</div>
                        <div className="CardText"> 6055 Meridian Ave  Ste #40 <br></br> San Jose, CA 95120, USA </div>
                        <div className="CardText"> Office: 408 471 7004</div>
                        {/* <div>
                        <input  
                            type="text"
                            name="name"
                            id="name"   
                            className="CardInput"
                            placeholder="  Full Name"
                         //   onChange={(e) => handle(e)}
                         //   value={data.name}
                         />
                    
                        <input
                            type="phone"  
                            name="phone"
                            id="phone"
                            className="CardInput"
                            placeholder="  Phone"
                         //   onChange={(e) => handle(e)}
                         //   value={data.email}
                         />

                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="CardInput"
                            placeholder="  Email"
                           // onChange={(e) => handle(e)}
                           // value={data.email}
                           />

                           
                        <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="  Subject"
                        className="CardInput"
                    //    onChange={(e) => handle(e)}
                    //    value={data.subject}
                    />

                        

                        <textarea
                        type="textarea"
                        name="text"
                        id="message"
                        placeholder="  Type your message here"
                        className="CardInput"
                        style={{ paddingTop:'1rem', height: "139px"}}
                    //    onChange={(e) => handle(e)}
                    //    value={data.message}
                    />  
                    </div> */}
                    {/* <button className="CardButton"> Test </button> */}
                        <button
                            className="CardButton"
                            onClick={() => {
                            history.push("/services")
                            }}
                            >
                            Book a Session
                        </button>
                    </div>
                    <div>
                    {/* <img src={card1} className="CardImage" /> */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                        className="Contact_Map"
                        allowfullscreen=""
                        loading="lazy">
                        </iframe>
                    </div>
                    </div>
                </div>
           </div>
        )
    }