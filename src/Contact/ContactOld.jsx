import React, { useState } from "react";
import Axios from "axios";
import InstagramIcon from "@material-ui/icons/Instagram";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, Box} from "@material-ui/core";

import '../Home/Home.css';

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
  return (
    <div className="Container">
        <div className="Intro_Container_Grid">
            <div style={{textAlign:'center'}}>
            <div className= "Title_Contact">Contact Us</div>
            <div className= "Body_Contact"> 6055 Meridian Ave #40, San Jose, CA 95120, USA </div>
            <div className= "Body_Contact" >Office: 408 471 7004</div>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3176.732452474541!2d-121.8872221846979!3d37.230325779862234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808e314406ce969d%3A0x82fb75802c5ef489!2s6055%20Meridian%20Ave%20%2340%2C%20San%20Jose%2C%20CA%2095120!5e0!3m2!1sen!2sus!4v1618695078070!5m2!1sen!2sus"
                width="356px"
                className="Contact_Map"
                allowfullscreen=""
                loading="lazy">
            </iframe>
            </div>
       

        <div style={{padding:'2rem', flex:'1', backgroundColor:'#DADADA',marginRight:'2rem', paddingTop:'5rem', marginLeft:'2rem'}}>
            <div style={{display:'flex'}}>
                <input  
                    type="text"
                    name="name"
                    id="name"
                    className="MessageFont"
                    placeholder="  Full Name"
                    style={{ fontSize:'16px', width: "50%", height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.name}/>
           
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="MessageFont"
                    placeholder="  Email"
                    style={{marginRight:'-0.5rem', marginLeft:'1rem', fontSize:'16px', width: "50%", height:'3rem',marginTop:'1rem' }}
                    onChange={(e) => handle(e)}
                    value={data.email}/>
            </div>
        
            <input
                type="text"
                name="subject"
                id="subject"
                placeholder="  Subject"
                className="MessageFont"
                style={{fontSize:'16px', width: "100%", height:'3rem',marginTop:'1rem' }}
                onChange={(e) => handle(e)}
                value={data.subject}/>

            <textarea
                type="textarea"
                name="text"
                id="message"
                placeholder="  Type your message here"
                className="MessageFont"
                style={{paddingTop:'1rem', fontSize:'16px', width: "100%", height: "139px", textTransform:'none',marginTop:'1rem' }}
                onChange={(e) => handle(e)}
                value={data.message}/>
            <br/>
            <div
                style={{ display: "flex", justifyContent: "center" }}
                aria-label={"click button to submit your messsage session."}>
                                
                     <button className="ButtonFont" onClick={submit} style={{color:'white',fontSize:'20px', backgroundColor:'#C3A336', border:'0px',marginTop:'2rem', width:'50%', height:'3rem', cursor:'pointer'}} >Submit</button>
            </div>
            <br/>
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
                    style={{ color: "#b28d42", cursor:'pointer' }}/>
            </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
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
  );
}