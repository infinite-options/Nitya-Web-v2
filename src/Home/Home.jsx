import React, { useEffect, useRef, useState } from "react";
import {Box, Button} from '@material-ui/core';
import '../Home/Home.css'
import { useHistory, useLocation } from "react-router-dom";
import ScrollToTop from "../Blog/ScrollToTop";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import About from '../About/about';
import Contact from '../Contact/contact';
import '../Contact/contact.css';
import card1 from "../Assets/Images/card1.jpg";
import Axios from "axios";
import MapSection from "../Contact/Map";
import InstagramIcon from "@material-ui/icons/Instagram";
import Services from '../Services/services';
import DocumentMeta from 'react-document-meta';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
            handleClickOpen()
          });

          
      // Axios.post('https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/sendEmail', { email: data.email })
      // .then((res) => {
      //   console.log("response email", res)
        
      // })
      }

      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        window.location.reload(false);
      };

      function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
      }

      const meta = {
        title: 'Nitya Ayurveda, Center for Ayurveda',
        description: 'Nitya Ayurveda is a holistic healing center that offers classical Ayurvedic solutions for your health issues with herbal plans, diet and lifestyle guidance, and follow ups.  The center also offers Panchakarma (cleansing and purification treatments) and traditional Ayurvedic wellness therapies to maintain health, relaxation and rejuvenation.',
        canonical: 'https://nityaayurveda.com',
        meta: {
            charset: 'utf-8',
            name: {
                keywords: 'react,meta,document,html,tags'
            }
        }
      }

    return(
        <div>
          <DocumentMeta {...meta}/>
          <ScrollToTop/>
            <Box ref={myRef_home} style={{backgroundColor:'#DADADA'}}>
            <Box className="HomeContainer">
            <div  className="BoxContainer_1">
            <div className="BoxContainer_1_left">
              <p className="BoxContainer_1_title" >
                Helping your body heal itself
              </p>
              {/* <div
                aria-label={"click button to book a session."}
                style={{ textAlign: "center" }}
              >
                <Button
                //  className={classes.btn}
                  style={{textTransform:'none',backgroundColor:'#D3A625', color:'white',borderRadius:'24px', width:'75%', height:'3rem'}}
                  id="btn"
                  onClick={() => {
                    goToSlide2(1);
                  }}
                >
                  What is Ayurveda?
                </Button>
              </div> */}
              <div
                aria-label={"click button to book a session."}
                style={{ textAlign: "center" }}
              >
                <Button
               //   className={classes.btn}
               style={{textTransform:'none', backgroundColor:'#D3A625', color:'white',fontSize:'24px' , width:'75%', height:'3rem'}}
                  id="btn"
                  onClick={() => {
                    history.push("/contact")
                  }}
                >
                 Book a Session
                </Button>
              </div>
            </div>

            <div  className="BoxContainer_1_right" >
              {/* <Carousel
                responsive={responsive}
                arrows={false}
                showDots={true}
                ref={carouselRef}
                autoPlay={true}
                autoPlaySpeed={10000}
                infinite={true}
              > */}
                <img src={card1} className="CardImage" />
                {/* <div
                  style={{
                    color: "white",
                    textAlign: "center",
                    padding: "5%",
                    backgroundColor: "#D3A625",
                   
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
          “Ayurvedic Medicine is the traditional holistic medical science of ancient India. 
          Origin of Ayurveda dates back more than 5,000 years ago, yet its principles are applicable to our modern life.
          Today, it is practiced not only in India, but also has become popular in the U.S. and all over the world.
          Nitya Ayurveda brings this classical Ayurvedic healthcare to clients in the South Bay. 
          We offer Ayurvedic health consultations; herbal suggestions, diet & lifestyle plans, Panchakarma & Ayurvedic therapies.
           Every client is treated holistically taking into account the uniqueness of his/her mind, body and causative factors.
            Nitya Ayurveda supports clients in their journey in maintaining health and bringing harmony and balance to their life.”
                  </p>
                </div> */}
              {/* </Carousel> */}
            </div>
            </div>

            <div >
               <About/>
            </div>

            <div className="BoxContainer_2_Mobile">
              <Services/>
            </div >
   
            <div   className="BoxContainer_1" >
            <div style={{padding:'2rem', textAlign:'center', flex:'1'}}>
              <div className= "Title_Contact">Contact Us</div>
              <div className= "Body_Contact"> 6055 Meridian Ave #40, San Jose, CA 95120, USA </div>
              <div className= "Body_Contact" >Office: 408 471 7004</div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                className="Contact_Map"
                allowfullscreen=""
                loading="lazy"
              ></iframe>
            </div>
            <div  style={{padding:'2rem', flex:'1', backgroundColor:'#DADADA',marginRight:'2rem', paddingTop:'5rem'}}>
           
                <div style={{display:'flex'}}>
                  <input  
                    type="text"
                    name="name"
                    id="name"
                    placeholder="  Full Name"
                    style={{ fontSize:'16px', width: "50%", height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.name}
                  />
           
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="  Email"
                    style={{marginRight:'-0.5rem', marginLeft:'1rem', fontSize:'16px', width: "50%", height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.email}
                  />
                  </div>
        
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="  Subject"
                    style={{fontSize:'16px', width: "100%", height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.subject}
                  />

                  <textarea
                    type="textarea"
                    name="text"
                    id="message"
                    placeholder="  Type your message here"
                    className="MessageFont"
                    style={{paddingTop:'1rem', fontSize:'16px', width: "100%", height: "139px", textTransform:'none',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.message}
                  />
                <br />
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  aria-label={"click button to submit your messsage session."}
                >
                  <button className="ButtonFont" onClick={submit} style={{color:'white',fontSize:'20px', backgroundColor:'#C3A336', border:'0px',marginTop:'2rem', width:'50%', height:'3rem', cursor:'pointer'}} >Submit</button>
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

                    style={{ color: "#b28d42", cursor:'pointer' }}
                  />
                </div>
                <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Message Recieved"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              We Got your Message!!! Please Check your email
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
          </div>
          </div>
            </Box>
            </Box>
        </div>
    )
}