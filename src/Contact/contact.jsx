import React, { useState } from "react";
import Axios from "axios";
import MapSection from "../Contact/Map";
import InstagramIcon from "@material-ui/icons/Instagram";
import ScrollToTop from "../Blog/ScrollToTop";
import '../Contact/contact.css';

const location = {
  address: "6055 Meridian Ave #40, San Jose, CA 95120, USA",
  lat: 37.23022,
  lng: -121.88534,
};
export default function Contact() {
  const url =
    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addContact";
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  function submit() {
    //console.log("prevent", e.target.value)
    //e.preventDefault();
    Axios.post(url, {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    })
      .catch((error) => {
        console.log(error.message);
      })
      .then((response) => {
        console.log(response);

      });
  }
  function handle(e) {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  }
  return (
    <div  className="Container_Contact">
        <ScrollToTop />
            <div className="Container_1_Contact">
              <div className= "Title_Contact">Contact Us</div>
              <div className= "Body_Contact"> 6055 Meridian Ave #40, </div>
              <div className= "Body_Contact" style={{marginTop:'-0.1rem'}}> San Jose, CA 95120, USA </div>
              <div className= "Body_Contact" >Office: 408 471 7004</div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                width="356px"
                className="Contact_Map"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div className="Container_2_Contact">
           
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Full Name"
                    style={{ fontWeight:'600',fontSize:'16px', width: "100%",border:'3px solid #D3A625', borderRadius:'24px', height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.name}
                  />
           
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    style={{ fontWeight:'600',fontSize:'16px', width: "100%",border:'3px solid #D3A625', borderRadius:'24px', height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.email}
                  />
        
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    style={{ fontWeight:'600',fontSize:'16px', width: "100%",border:'3px solid #D3A625', borderRadius:'24px', height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.subject}
                  />

                  <textarea
                    type="textarea"
                    name="text"
                    id="message"
                    placeholder="Type your message here"
                    style={{fontWeight:'600',fontSize:'16px', width: "100%", height: "139px", border:'3px solid #D3A625', borderRadius:'16px', textTransform:'none',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.message}
                  />
                <br />
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  aria-label={"click button to submit your messsage session."}
                >
                  <button onClick={submit} style={{  color:'white', backgroundColor:'#D3A625',borderRadius:"24px", border:'0px', height:'3rem', width:'40%', cursor:'pointer'}} >Submit</button>
                </div>
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <InstagramIcon
                    //backgroundColor="#B28D42"
                    fontSize="large"
                    onClick={(event) =>
                    (window.location.href =
                      "https://www.instagram.com/nityaayurveda/")
                    }
                    aria-hidden="false"
                    aria-label="Instagram"

                    style={{ color: "#b28d42", cursor:'pointer'}}
                  />
                </div>
          </div>
    </div>
  );
}
