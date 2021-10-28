

import React, { useState, useEffect, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import InstagramIcon from "@material-ui/icons/Instagram";
import Logo from "../Assets/Images/Logo.png";
import "./Navbar.css";

const useStyles = makeStyles((theme) => ({
  authModal: {
    position: "absolute",
    width: "500px",
  },

  buttonColor: {
    color: "#000000"
  }
}));


function useOutsideAlerter(ref) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !ref.current.hidden
      ) {
        ref.current.hidden = true;
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Navbar = () => {
  const classes = useStyles();
  const location  = useLocation();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [projects, setProjects] = useState(false)
  const [onClickAbout, setOnClickAbout] = useState(false)
  const [onClickproject, setOnClickProject] = useState(false)
  const [onClickteams, setOnClickTeams] = useState(false)



  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
    setProjects(false)

  };

  const closeMenuHome = () => {
    setOpen(false);
    setProjects(false)
    setOnClickAbout(!onClickAbout)
    console.log("about", onClickAbout)

  };

  const closeMenuProjects = () => {
    setOpen(false);
    setProjects(true)
    setOnClickProject(!onClickproject)
    console.log("clickPro", onClickproject)

  };

  const closeMenuTeams = () => {
    setOpen(false);
    setProjects(true)
    setOnClickTeams(!onClickteams)
    console.log("click", onClickteams)
  };

  const scrollToTop = () => {
   // scroll.scrollToTop();
  };

  return (
    // <nav className="navbar" style={{ background: location.pathname === "/projects" ? '#52330D' : 'white' }}>
  <nav className="navbar">
    <div className="emptyDiv">
      </div>
      <Link to="/" className="nav-logo"  onClick={closeMenu}>
         {/* <img src={location.pathname === "/projects" ? "/Navigation/Logo-White.png"  : "/Navigation/Logo.png"}/> */}
         <img src={Logo} style={{height:'auto', width:'10rem'}}/>
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item" >
          {/* <Link to={{pathname: '/projects', state_project : { project: onClickproject } }} className="nav-link" onClick={closeMenuProjects} style={{color: location.pathname === "/projects" ? 'white' : ''}} > */}
          <Link to={{pathname: '/', state_project : { project: onClickproject } }} className="nav-link" onClick={closeMenuProjects} >
           Home
          </Link>
        </li>
        <li className="nav-item">
          {/* <Link to={{pathname: '/teams', state_teams : { teams: onClickteams } }} className="nav-link" onClick={closeMenuTeams}  style={{color: location.pathname === "/projects" ? 'white' : ''}}> */}
          <Link to={{pathname: '/services', state_teams : { teams: onClickteams } }} className="nav-link" onClick={closeMenuTeams} >
            Services
          </Link>
        </li>

        <li className="nav-item">
          {/* <Link to={{pathname: '/', state : { click: onClickAbout } }}  className="nav-link" onClick={closeMenuHome}  style={{color: location.pathname === "/projects" ? 'white' : ''}}> */}
          <Link to={{pathname: '/about', state : { click: onClickAbout } }}  className="nav-link" onClick={closeMenuHome} >
            About Us
          </Link>
        </li>

        <li className="nav-item">
          {/* <Link to="/contact" className="nav-link" onClick={closeMenu}  style={{color: location.pathname === "/projects" ? 'white' : ''}}> */}
          <Link to="/contact" className="nav-link" onClick={closeMenu} > 
            Contact
          </Link>
        </li>

        <li className="nav-item">
          {/* <Link to={{pathname: '/', state : { click: onClickAbout } }}  className="nav-link" onClick={closeMenuHome}  style={{color: location.pathname === "/projects" ? 'white' : ''}}> */}
          <Link to={{pathname: '/blog', state : { click: onClickAbout } }}  className="nav-link" onClick={closeMenuHome} >
           Blog
          </Link>
        </li>
      </ul>

      <div className="emptyDiv1" >
      {/* <AccountCircleIcon 
      size='large'
      style={{color:'#ad8131', marginRight:'0.5rem', marginTop:'0.3rem'}}/> */}
   
      <InstagramIcon
          fontSize="large"
          className="instagram-icon"
          onClick={(event) =>
            (window.location.href = "https://www.instagram.com/nityaayurveda/")
          }
        />
      </div>
    </nav>
  );
};

export default Navbar;
