import React from "react";
import Logo from '../Assets/Images/Group 15.svg'
import InstagramIcon from "@material-ui/icons/Instagram";
import CAAM from "../Assets/Images/CAAM_logo.png";
import Namacb from "../Assets/Images/namacb.png";
import { Link } from "react-router-dom";


export default function Footer(){
    return(
        <div style={{display:'flex',marginTop:'5rem', justifyContent:'space-evenly',fontFamily:'Avenir LT Std 45 Book',fontSize:'12px' , color:'white',alignItems:'center',width:'100%',backgroundColor:'#424242', position:'relative', bottom:'0'}}>
            {/* <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end',padding:'2rem', flex:'0.3'}}>
                <img src={Logo} style={{ height:'5rem', width:'8rem'}}/>
                <div> </div>
                <div>© 2021 by Leena Marathay</div>
            </div> */}
            <div style={{display:'flex', flex:'1', flexDirection:'column'}}>
            <div style={{display:'flex', justifyContent:'space-evenly', marginLeft:'7rem'}}>
                <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', borderRight:'2px solid white', marginTop:'2rem', paddingRight:'5rem'}} >
                <div>Tel: 925-400-7469</div>
                <div>San Jose, CA 95120</div>
              
                </div>
                <div style={{display:'flex', justifyContent:'space-evenly', flexDirection:'column', borderRight:'2px solid white', marginTop:'2rem', paddingRight:'5rem'}} >
                <div>Tel: 925-400-7469</div>
                <div>San Jose, CA 95120</div>
                </div>
                <div  style={{display:'flex', justifyContent:'space-evenly', flexDirection:'column', marginTop:'2rem', paddingRight:'5rem'}}>
                <div>Careers</div>
                <div>info@infiniteoptions.com</div>
            
                </div>
               
            </div>
            <div style={{display:'flex', justifyContent:'space-evenly', marginTop:'1rem'}}>
              
                <img src={CAAM} style={{ height:'5rem', marginTop:'2rem'}}/>
                <img src={Namacb} style={{  height:'5rem', marginTop:'2rem'}}/>
                <InstagramIcon
          fontSize="large"
          className="instagram-icon"
          style={{color:'white', marginLeft:'1rem', display:'flex', justifyContent:'center'}}
          onClick={(event) =>
            (window.location.href = "https://www.instagram.com/nityaayurveda/")
          }
        />
            
            </div>
            </div>
        </div>
    )
}