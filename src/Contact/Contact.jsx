import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import InstagramIcon from "@material-ui/icons/Instagram";
import {Box, Button} from '@material-ui/core';
import { Helmet } from "react-helmet";

import card1 from "../Assets/Images/card1.jpg";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import ScrollToTop from "../Blog/ScrollToTop";

import '../Home/Home.css';
import { set } from "js-cookie";

export default function Contact(){

        const url =
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/addContact";
      const [data, setData] = useState({
        name: "",
        email: "",
        phone:"",
        subject: "",
        message: "",
      });
    
      function submit() {
      
        Axios.post(url, {
          name: data.name,
          email: data.email,
          phone: data.phone,
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
      }
    
      const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        data.name = ""
        data.email = ""
        data.phone = ""
        data.subject = ""
        data.message = ""
      };
    
      function handle(e) {
        const newData = { ...data };
        newData[e.target.id] = e.target.value;
        setData(newData);
      }

        return(
            <div className="HomeContainer" >

                <div className="Card">
                    <div className="CardGrid">
                    <div style={{ display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <div className="CardTitle" style={{marginBottom:'2rem'}}>Contact Us </div>
                        <div className="CardText"> 6055 Meridian Ave  Ste #40 <br></br> San Jose, CA 95120, USA </div>
                        <div className="CardText" style={{marginBottom:'1rem'}}> Office: 408 471 7004</div>
            
                        <input  
                            type="text"
                            name="name"
                            id="name"   
                            className="NewInput"
                            placeholder="  Full Name"
                            onChange={(e) => handle(e)}
                            value={data.name}
                         />

                        <input
                            type="phone"  
                            name="phone"
                            id="phone"
                            className="NewInput"
                            placeholder="  Phone"
                           onChange={(e) => handle(e)}
                           value={data.phone}
                         />

                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="NewInput"
                            placeholder="  Email"
                            onChange={(e) => handle(e)}
                            value={data.email}
                           />

                           
                        <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="  Subject"
                        className="NewInput"
                        onChange={(e) => handle(e)}
                        value={data.subject}
                    />

                    <input
                        type="text"
                        name="message"
                        id="message"
                        placeholder="  Type Message Here"
                        className="NewInput"
                        onChange={(e) => handle(e)}
                        value={data.message}
                    />

                    <button className="CardButton"  onClick={submit}  >Submit</button>

                    </div>
                    <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                        className="Contact_Map"
                        allowfullscreen=""
                        loading="lazy">
                        </iframe>
                    </div>
                    </div>
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
                        Thanks for your Message! We have sent a copy to your email.
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary">
                        Close
                      </Button>
                    </DialogActions>
                </Dialog>
           </div>
        )
    }