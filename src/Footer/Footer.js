import React from "react";
import Namacb from "../namacb.png";
import CAAM from "../CAAM_logo.png";
import Logo from "../Group 15.svg";
import InstagramIcon from "@material-ui/icons/Instagram";
// import FacebookIcon from "@material-ui/icons/Facebook";
// import TwitterIcon from "@material-ui/icons/Twitter";
// import PinterestIcon from "@material-ui/icons/Pinterest";
import "./Footer.css";
import { /*Button,*/ Row, Col } from "reactstrap";

function Footer() {
  return (
    <div className="main-footer">
      <div className="main-container">
        <Row>
          {/* <Col></Col> */}
          <Col
            style={{
              display: "flex",
              justifyContent: "left",
              height: "120px",
            }}
          >
            <div>
              <img
                src={Logo}
                style={{
                  height: "101px",
                }}
              />
              <div style={{ fontSize: "13px", textAlign: "center" }}>
                &copy;{new Date().getFullYear()} by Leena Marathay
              </div>
            </div>
          </Col>
          <Col md="auto">
            <Row style={{ paddingTop: " 30px", paddingBottom: "15px" }}>
              {/* className="col-sm" */}
              {/* Column1 */}
              <Col
                md="auto"
                style={{
                  display: "flex",
                  justifyContent: "left",
                }}
              >
                <p style={{ fontSize: "13px", textAlign: "left" }}>Leena Marathay <br /> NAMA Certified Ayurvedic Practitioner</p>
                {/* <ui className="list-unstyled">
                  <li style={{ fontSize: "13px", textAlign: "left" }}>
                    Leena Marathay
                  </li>
                  <li style={{ fontSize: "13px", textAlign: "left" }}>
                    NAMA Certified Ayurvedic Practitioner
                  </li>
                </ui> */}
              </Col>
              {/* Column3 */}
              <Col md="auto">
                <p style={{ fontSize: "13px", textAlign: "left" }}> Office: 408 471 7004 <br /> Email: Leena@nityaayurveda.com</p>
                {/* <ui
                  className="list-unstyled"
                  style={{ fontSize: "13px", textAlign: "left" }}
                >
                  <li>Office: 408 471 7004</li>
                  <li>Email: Leena@nityaayurveda.com</li>
                </ui> */}
              </Col>

              {/* Column2 */}
              <Col md="auto" style={{}}>
                <p style={{ fontSize: "13px" }}>6055 Meridian Ave, Ste. 40A, <br />San Jose, CA 95120</p>
                {/* <ui className="list-unstyled" style={{ fontSize: "13px" }}>
                  <li>6055 Meridian Ave, Ste. 40A,</li>
                  <li>San Jose, CA 95120</li>
                </ui> */}
              </Col>
            </Row>


            <Row style={{ paddingTop: " 15px", paddingBottom: "30px" }}>
              <Col md="auto" style={{ width: "261px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    textDecoration: "underline",
                    margin: "0px",
                  }}
                >
                  <a href="/login" style={{ color: "white" }}>
                    Admin Login
                  </a>
                </p>
              </Col>
              <Col
                md="auto"
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
                id="hideAfter"
              >
                <img
                  src={Namacb}
                  style={{
                    height: "64px",
                    float: "center",
                  }}
                  alt="An Image of NAMACB CAP"
                />
                <img
                  src={CAAM}
                  
                  style={{
                    // width: "198",
                    height: "54px",
                    marginLeft: "40px",
                  }}
                  // id="hideAfter"
                ></img>
                <div
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginLeft: "39px",
                  }}
                  className="hideMe"
                  
                >
                  <InstagramIcon
                    id="hideAfter"
                    fontSize="large"
                    onClick={(event) =>
                      (window.location.href =
                        "https://www.instagram.com/nityaayurveda/")
                    }
                    style={{ height: "45px", width: "45px", cursor: "pointer" }}
                    aria-hidden="false"
                    aria-label="Instagram"
                  />
                </div>
              </Col>
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </div>




      <div className="mobile-container" style={{ padding: "15px" }}>
        <Row style={{ padding: "10px" }}>
          <Col style={{ textAlign: "center" }}>
            <img src={Logo} style={{ height: "100px" }} />
            <p style={{ font: "normal normal 600 8px SF Pro Display", margin: "0px", marginTop: "5px" }}>
              &copy;{new Date().getFullYear()} by Leena Marathay
            </p>
          </Col>
        </Row>
        <Row style={{display:"flex", justifyContent:"center"}}>
               <Col md="auto" style={{ textAlign: "center"}}>
                <p
                  style={{
                    font: "normal normal 600 14px/25px SF Pro Display",
                    textDecoration: "underline",
                    margin: "0px",
                    padding: "0 0 20px 0",
                  }}
                >
                  <a href="/login" style={{ color: "white" }}>
                    Admin Login
                  </a>
                </p>
              </Col>
        </Row>


        <div>
          <Row style={{margin:"0",  }}>
            <Col style={{float:"left"}}>
              <p style={{ fontSize: "13px", }}>6055 Meridian Ave, Ste. 40A, <br /> San Jose, CA 95120</p>
            </Col>
            <Col>
              <div style={{float:"right"}}>
              <p style={{ fontSize: "13px",  }}> Office: 408 471 7004 <br /> Leena@nityaayurveda.com</p>
              </div>
              
            </Col>
          </Row>

          <Row style={{margin:"0"}}>
            <Col>
              <p style={{ fontSize: "13px", textAlign: "left", }}>Leena Marathay <br /> NAMA Certified Ayurvedic Practitioner</p>
            </Col>
            <Col>
            <div style={{float:"right"}}>
              <img
                  src={CAAM}
                  style={{
                    height: "60px",
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row style={{padding:"0 0 0 15px", margin:"0"}}>
            <img
                  src={Namacb}
                  style={{
                    width: "50px",
                    height: "50px",
                    float: "center",
                  }}
                  alt="An Image of NAMACB CAP"
                />
                 &nbsp; &nbsp;
                <InstagramIcon
                  fontSize="large"
                  onClick={(event) =>
                    (window.location.href =
                      "https://www.instagram.com/nityaayurveda/")
                  }
                  style={{ height: "50px", width: "50px", cursor: "pointer" }}
                  aria-hidden="false"
                  aria-label="Instagram"
                />
          </Row>
        </div>




        
      </div>
    </div>
  );
}

export default Footer;
