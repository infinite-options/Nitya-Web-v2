import React, { useEffect, useRef, useState } from "react";
import {Box, Button} from '@material-ui/core';
import '../Home/Home.css'
import { useHistory, useLocation } from "react-router-dom";
//import ScrollToTop from "../Contact/ScrollToTop";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import About from '../About/about';
import Contact from '../Contact/contact';
import card1 from "../Assets/Images/card1.jpg";
import Axios from "axios";
import MapSection from "../Contact/Map";
import InstagramIcon from "@material-ui/icons/Instagram";
import Services from '../Services/services';

//import Backdrop from "../Assets/Backdrop.png"

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1430 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1430, min: 1150 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1150, min: 800 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 800, min: 0 },
      items: 1,
    },
  };

  
  const location = {
    address: "6055 Meridian Ave #40, San Jose, CA 95120, USA",
    lat: 37.23022,
    lng: -121.88534,
  };

export default function Home(){

    const history = useHistory();
    const location = useLocation();
    const myRef = useRef(null)
    const myRef_home = useRef(null)

    const carouselRef = useRef();
    const [windowState, setWindowState] = useState("1");
    const card1P1 =
      "Ayurvedic Medicine is the traditional holistic medical science of ancient India. Origin of Ayurveda dates back more than 5,000 years ago, yet its principles are applicable to our modern life. Today, it is practiced not only in India, but also has become popular in the U.S. and all over the world.";
    const card1P2 =
      "Nitya Ayurveda brings this classical Ayurvedic healthcare to clients in the South Bay. We offer Ayurvedic health consultations; herbal suggestions, diet & lifestyle plans and Ayurvedic body therapies to our clients. Every client is treated holistically taking into account the uniqueness of his/her mind, body and causative factors. Nitya Ayurveda supports clients in their journey in maintaining health and bringing harmony and balance to their life.";
    const card2P1 =
      " A typical Ayurvedic health plan begins with changing your eating habits, eliminating certain foods from your diet or simply fasting along with some digestive herbs or teas. Some people are able to follow this kind of advice very well while others find it an absolute impossibility!";
    const card2P2 =
      " So if you’re seeking Ayurvedic treatment and wondering if this system of medicine will work for you, try to answer these two simple questions: 1. Do you suspect that your diet, lifestyle, the supplements you are taking may have something to do with your current health issue? Yes or No 2. Are you willing to make changes in your diet and lifestyle? Yes or No If your answer is “yes” to both questions then Ayurveda is probably for you!";
      
      function goToSlide2(slideNum) {
        if (carouselRef && carouselRef.current)
          carouselRef.current.goToSlide(slideNum);
      }
      
      function renderTextCard(arg) {
        let title = "";
        let para1 = "";
        let para2 = "";
    
        if (arg === "2") {
          title = "What is Ayurveda?";
          para1 = card1P1;
          para2 = card1P2;
        } else if (arg === "3") {
          title = "Is Ayurveda for you?";
          para1 = card2P1;
          para2 = card2P2;
        }
    
        return (
          <div>
            <h3
             // className={classes.title}
              id="title"
              style={{
                textAlign: "center",
                color: "white",
              }}
            >
              {title}
            </h3>
            <h3
              style={{
                font: "normal normal normal 36px/43px SF Pro Display",
                textAlign: "center",
                color: "white",
              }}
            >
              {para1}
            </h3>
            <h3
              style={{
                font: "normal normal normal 36px/43px SF Pro Display",
                textAlign: "center",
                color: "white",
              }}
            >
              {para2}
            </h3>
          </div>
        );
      }
      
    // useEffect(()=>{
    //     myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })    
    // },[location.state])

    useEffect(()=>{
        window.scrollTo(0, 0); 
    },[])


      const url =
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addContact";
      const [data, setData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    
      function submit(e) {
        console.log("prevent", e.target.value)
        e.preventDefault();
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

    return(
        <div  >
            <Box ref={myRef_home} style={{backgroundColor:'#DADADA'}}>
            <Box className="HomeContainer">
            <div  className="BoxContainer_1">
            <div className="BoxContainer_1_left">
              <p className="BoxContainer_1_title" >
                Helping your body heal itself
              </p>
              <div
                aria-label={"click button to book a session."}
                style={{ textAlign: "center" }}
              >
                <Button
                //  className={classes.btn}
                  style={{textTransform:'none',backgroundColor:'#C3A336', color:'white',borderRadius:'24px', width:'75%', height:'3rem'}}
                  id="btn"
                  onClick={() => {
                    goToSlide2(0);
                  }}
                >
                  What is Ayurveda?
                </Button>
              </div>
              <div
                aria-label={"click button to book a session."}
                style={{ textAlign: "center" }}
              >
                <Button
               //   className={classes.btn}
               style={{textTransform:'none', backgroundColor:'#C3A336', color:'white',borderRadius:'24px', width:'75%', marginTop:'1rem', height:'3rem'}}
                  id="btn"
                  onClick={() => {
                    goToSlide2(1);
                  }}
                >
                  Schedule a Free 15min Consultation
                </Button>
              </div>
            </div>

            <div  className="BoxContainer_1_right" >
              <Carousel
                responsive={responsive}
                arrows={false}
                showDots={true}
                ref={carouselRef}
                autoPlay={true}
                autoPlaySpeed={10000}
                infinite={true}
              >
                <img src={card1} className="CardImage" />
                <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: "5%",
                    backgroundColor: "#B28D42",
                    height:'100%'
                  }}
                >
                  <h1
                    style={{
                      font: "italic normal normal 40px Hoefler Text",
                      marginTop: "30px",
                      marginBottom: "30px",
                    }}
                  >
                    What is Ayurveda?
                  </h1>
                  <p
                    className="TextFont"
                    
                  >
                    Ayurvedic Medicine is the traditional holistic medical
                    science of ancient India. Orgin of Ayurveda dates back more
                    than 5,000 years ago, yet its principles are applicable to
                    our modern life. Today, it is practiced not only in India,
                    but also has become popular in the U.S. and all over the
                    world.
                  </p>
                  <p
                    className="TextFont"
                    >
                    Nitya Ayurveda brings theis classical Ayurvedic healthcare
                    to clients in the South Bay. We offer Ayurvedic health
                    consultations; herbal suggestions, diet & lifestyle plans
                    and Ayurvedic body therapies to our clients. Every client is
                    treated holistically.
                  </p>
                </div>
              </Carousel>
            </div>
            </div>

            <div>
                  <Services/>
            </div>


            <div >
               <About/>
            </div>
   
            <div  className="BoxContainer_4_Contact">
            <div className="Container_1_Contact">
              <div className= "Title_Contact">Contact Us</div>
              <div className= "Body_Contact"> 6055 Meridian Ave #40, </div>
              <div className= "Body_Contact" style={{marginTop:'-1rem'}}> San Jose, CA 95120, USA </div>
              <div className= "Body_Contact" >Office: 408 471 7004</div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                width="356px"
                style={{ border: 0, borderRadius: "30px", height: "12rem", marginTop:'2rem' }}
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
                    style={{ fontWeight:'600',fontSize:'16px', width: "100%", color:'#C3A336',border:'3px solid #C3A336', borderRadius:'24px', height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.name}
                  />
           
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    style={{ fontWeight:'600',fontSize:'16px', width: "100%", color:'#C3A336',border:'3px solid #C3A336', borderRadius:'24px', height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.email}
                  />
        
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    style={{ fontWeight:'600',fontSize:'16px', width: "100%", color:'#C3A336',border:'3px solid #C3A336', borderRadius:'24px', height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.subject}
                  />

                  <textarea
                    type="textarea"
                    name="text"
                    id="message"
                    placeholder="Type your message here"
                    style={{fontWeight:'600',fontSize:'16px', width: "100%",color:'#C3A336', height: "139px", border:'3px solid #C3A336', borderRadius:'16px', textTransform:'none',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.message}
                  />
                <br />
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  aria-label={"click button to submit your messsage session."}
                >
                  <button style={{color:'white', backgroundColor:'#C3A336',borderRadius:"24px", border:'0px', height:'3rem', width:'40%'}} >Submit</button>
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

                    style={{ color: "#b28d42", }}
                  />
                </div>
          </div>
    </div>

          {/*   <div className="BoxContainer_5">
                <div className="BoxContainer_5_Text">
                    <div  className="BoxContainer_5_Text_Header" >
                    What our clients say
                    </div>
                    <div  className="BoxContainer_5_Text_Body" >
                    “Choosing Infinite Options to create a wireframe for the early phase of my startup was the best decision I have made! 
                    From the introduction, to development, to completion, the IO team was warm, consistent, and competent in their expertise.
                     As someone without a technical background, the IO team made the process understandable and seamless. 
                     I am obsessed with the final product and am looking forward to working with them again in the future!”
                   </div>
                   <p  className="BoxContainer_5_Text_Tail">
                   -Mercedes Fernandez,
                    </p>
                    <div className="BoxContainer_5_Text_Tail">
                    Founder, Walk with Pop
                    </div>
                </div>
            </div>

            <div  className="BoxContainer_6" style={{marginTop:'-1rem'}} >
                <div  className="BoxContainer_6_Text_Header" >
                    Teams
                </div>
                <div className="BoxContainer_6_Text_Body" >
                    <div>
                        <p>Front-End Development</p>
                        <p>Back-End Development</p>
                        <p>Mobile App Development</p>
                    </div>
                    <div className="BoxContainer_6_Text_Body_Margin">
                        <p>UI / UX Design</p>
                        <p>Marketing</p>
                        <p>Human Resources</p>
                    </div>
                </div>
                <div  style={{display:'flex', justifyContent:'center'}}>
                    <button  ref={myRef} className="BoxContainer_6_Text_Button" onClick={()=> history.push("/teams")}>
                    Join the team
                    </button>
                </div>
            </div>
        
           
            <div  className="BoxContainer_5">
                <div className="BoxContainer_5_Text">
                    <div  className="BoxContainer_5_Text_Header" >
                    About Us
                    </div>
                    <div  className="BoxContainer_7_Text_Body" >
                    Infinite Options was primarily started in 2019 to help college students gain real work experience along with their coursework.
                    Prashant Marathay, the Founder and CEO, has 25+ years of experience as a project manager in Silicon Valley at companies 
                    like Apple, Intel, Alphabet.
               
                   </div>
                   <div  className="BoxContainer_7_Text_Body" >
                        
                    We’ve since built multiple businesses in-house, we offer business-in-a-box to people who want to be self-employed and
                    we also work with clients to design and develop their business ideas.
                    </div>
                    <div style={{display:'flex', justifyContent:'center'}}>
                    <button style={{fontSize:'20px' , marginTop:'2rem', border:'3px solid #52330D',color:'#52330D', borderRadius:'42px',fontFamily:'Avenir LT Std 45 Book',fontWeight:'600',padding:'1rem',paddingLeft:'2rem',paddingRight:'2rem',textTransform:'none', backgroundColor:"white"}}>
                    Learn More
                    </button>
                </div>
                </div> 
            </div>*/}
            </Box>
            </Box>
        </div>
    )
}