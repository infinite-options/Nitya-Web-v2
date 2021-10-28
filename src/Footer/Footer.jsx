import React from "react";
import Logo from '../Assets/Images/Group 15.svg'
import InstagramIcon from "@material-ui/icons/Instagram";
import CAAM from "../Assets/Images/CAAM_logo.png";
import Namacb from "../Assets/Images/namacb.png";
import { Link } from "react-router-dom";
import { useHistory, useLocation } from "react-router-dom";


export default function Footer(){
    const history = useHistory();

    return(
        <div style={{display:'flex',marginTop:'5rem', justifyContent:'space-evenly',fontFamily:'Avenir LT Std 45 Book',fontSize:'12px' , color:'white',alignItems:'center',width:'100%',backgroundColor:'white', position:'relative', bottom:'0'}}>
            {/* <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end',padding:'2rem', flex:'0.3'}}>
                <img src={Logo} style={{ height:'5rem', width:'8rem'}}/>
                <div> </div>
                <div>© 2021 by Leena Marathay</div>
            </div> */}
            <div style={{display:'flex', flex:'1', flexDirection:'column', color:'#C3A336'}}>
            <div style={{fontSize:'18px',display:'flex', justifyContent:'space-evenly', marginLeft:'7rem'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', borderRight:'2px solid #424242', marginTop:'2rem', paddingRight:'5rem'}} >
                <div>6055 Meridian Ave, Ste. 40A,</div>
                <div>San Jose, CA 95120</div>
              
                </div>
                <div style={{fontSize:'18px',display:'flex', justifyContent:'space-evenly', flexDirection:'column', borderRight:'2px solid #424242', marginTop:'2rem', paddingRight:'5rem'}} >
                <div  style={{fontSize:'28px'}}>Leena Marathay</div>
                <div style={{marginTop:'2rem'}}>NAMA Certified Ayurvedic Practitioner</div>
                </div>
                <div  style={{fontSize:'18px',display:'flex', justifyContent:'space-evenly', flexDirection:'column', marginTop:'2rem', paddingRight:'5rem'}}>
                <div>Office: 408 471 7004</div>
                <div>Email: Leena@nityaayurveda.com</div>
            
                </div>
               
            </div>
            <div style={{display:'flex', justifyContent:'flex-start', marginTop:'1rem'}}>
              
                <img src={CAAM} style={{ height:'7rem', marginTop:'2rem', marginLeft:'10%'}}/>
                <img src={Namacb} style={{  height:'7rem', marginTop:'2rem', marginLeft:'15%'}}/>
                <InstagramIcon
          fontSize="large"
          className="instagram-icon"
          style={{color:'white', display:'flex', justifyContent:'center', marginTop:'3%', marginLeft:'25%'}}
          onClick={(event) =>
            (window.location.href = "https://www.instagram.com/nityaayurveda/")
          }
        />
            
            </div>

            <div style={{marginTop:'3rem', marginBottom:'2rem', textAlign:'center'}}>
            <button onClick={ ()=> {history.push("/login")}} style={{textTransform:'none',cursor:'pointer', color:'#C3A336', backgroundColor:'white', border:'0px'}} >
            © 2021 by Leena Marathay
            </button>
            </div>
            </div>
        </div>
    )
}