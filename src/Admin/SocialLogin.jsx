import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { Button } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useHistory } from "react-router-dom";
import { Container, Col, Form, Modal, Row } from "react-bootstrap";
import Google from "../Assets/Images/Google.svg";

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
let CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
const useStyles = makeStyles({
  loginbuttons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  signupbuttons: {
    background: "#000000 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    font: "normal normal bold 16px Quicksand-Bold",
    color: "#ffffff",
    margin: "1rem",
    textTransform: "none",
  },
  loginbutton: {
    background: "#b28d42 0% 0% no-repeat padding-box",
    borderRadius: "10px",
    font: "normal normal bold 16px Quicksand-Bold",
    color: "#ffffff",
    margin: "1rem",
    textTransform: "none",
  },
  buttonLayout: { width: "100%", padding: "0", margin: "0" },

  textfield: {
    background: "##757575",
    borderRadius: "25px",
    marginBottom: "0.2rem",
    color: "#b28d42",
    padding: "10px 20px",
    width: "300px",
  },
});

export default function SocialLogin() {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newFName, setNewFName] = useState("");
  const [newLName, setNewLName] = useState("");

  const [socialId, setSocialId] = useState("");
  const [refreshToken, setrefreshToken] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [accessExpiresIn, setaccessExpiresIn] = useState("");
  const [alreadyExists, setAlreadyExists] = useState(false);

  const [socialSignUpModalShow, setSocialSignUpModalShow] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  let redirecturi = "https://nityaayurveda.com";

  const responseGoogle = (response) => {
    console.log("response", response);

    let auth_code = response.code;
    let authorization_url = "https://accounts.google.com/o/oauth2/token";

    console.log("auth_code", auth_code);
    var details = {
      code: auth_code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: "http://localhost:3000",
      // redirect_uri: redirecturi,
      grant_type: "authorization_code",
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(authorization_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: formBody,
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        return responseData;
      })
      .then((data) => {
        console.log(data);
        let at = data["access_token"];
        let rt = data["refresh_token"];
        let ax = data["expires_in"];
        setAccessToken(at);
        setrefreshToken(rt);
        setaccessExpiresIn(ax);
        console.log("res", at, rt);

        axios
          .get(
            "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=" +
              at
          )
          .then((response) => {
            console.log(response.data);

            let data = response.data;
            //setUserInfo(data);
            let e = data["email"];
            let fn = data["given_name"];
            let ln = data["family_name"];
            let si = data["id"];

            setEmail(e);
            setNewFName(fn);
            setNewLName(ln);
            setSocialId(si);
            axios.get(BASE_URL + "GetUserEmailId/" + e).then((response) => {
              console.log(response.data);
              if (response.data.message === "User ID doesnt exist") {
                setSocialSignUpModalShow(!socialSignUpModalShow);
              } else {
                setAlreadyExists(!alreadyExists);
              }
            });
          })
          .catch((error) => {
            console.log("its in landing page");
            console.log(error);
          });

        // setSocialSignUpModalShow(!socialSignUpModalShow);

        return (
          accessToken,
          refreshToken,
          accessExpiresIn,
          email,
          newFName,
          newLName,
          socialId
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(email);
  const loginSuccessfulModal = () => {
    const modalStyle = {
      position: "absolute",
      top: "30%",
      left: "35%",
      width: "500px",
    };
    const headerStyle = {
      border: "none",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      font: "normal normal 600 20px Quicksand-Book",
      textTransform: "uppercase",
      backgroundColor: " #757575",
      padding: "1rem",
      color: "#b28d42",
    };
    const footerStyle = {
      border: "none",
      backgroundColor: " #757575",
    };
    const bodyStyle = {
      backgroundColor: " #757575",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      font: "normal normal 600 16px Quicksand-Regular",
    };
    return (
      <Modal
        show={loginSuccessful}
        onHide={hideLoginSuccessful}
        style={modalStyle}
      >
        <Form as={Container}>
          <Modal.Header style={headerStyle} closeButton>
            <Modal.Title>Sign Up Successful</Modal.Title>
          </Modal.Header>

          <Modal.Body style={bodyStyle}>
            <div>
              You have successfully signed up! Please Login to continue!
            </div>
          </Modal.Body>

          <Modal.Footer style={footerStyle}>
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Col
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  onClick={hideLoginSuccessful}
                  className={classes.loginbutton}
                >
                  Cancel
                </Button>
              </Col>
              <Col
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  onClick={() => history.push("/login")}
                  className={classes.loginbutton}
                >
                  Log in
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };
  const alreadyExistsModal = () => {
    const modalStyle = {
      position: "absolute",
      top: "30%",
      left: "35%",
      width: "500px",
    };
    const headerStyle = {
      border: "none",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      font: "normal normal 600 20px Quicksand-Book",
      textTransform: "uppercase",
      backgroundColor: " #757575",
      padding: "1rem",
      color: "#b28d42",
    };
    const footerStyle = {
      border: "none",
      backgroundColor: " #757575",
    };
    const bodyStyle = {
      backgroundColor: " #757575",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      font: "normal normal 600 16px Quicksand-Regular",
    };
    return (
      <Modal show={alreadyExists} onHide={hideAlreadyExists} style={modalStyle}>
        <Form>
          <Modal.Header style={headerStyle} closeButton>
            <Modal.Title>User Account Exists</Modal.Title>
          </Modal.Header>

          <Modal.Body style={bodyStyle}>
            <div>
              The user with email: {email} exists! Please log in to continue
            </div>
          </Modal.Body>

          <Modal.Footer style={footerStyle}>
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Col
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  onClick={hideLoginSuccessful}
                  className={classes.loginbutton}
                >
                  Cancel
                </Button>
              </Col>
              <Col
                xs={6}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  type="submit"
                  onClick={() => history.push("/login")}
                  className={classes.loginbutton}
                >
                  Log in
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };
  const hideAlreadyExists = () => {
    //setSignUpModalShow(false);
    setAlreadyExists(!alreadyExists);
    history.push("/");
  };
  const hideSignUp = () => {
    //setSignUpModalShow(false);
    setSocialSignUpModalShow(false);
    // setLoginSuccessful(true);
    //history.push("/login");
    setNewPhoneNumber("");
    setNewFName("");
    setNewLName("");
  };

  const handleNewPhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value);
  };

  const handleNewFNameChange = (event) => {
    setNewFName(event.target.value);
  };

  const handleNewLNameChange = (event) => {
    setNewLName(event.target.value);
  };

  const handleSocialSignUpDone = () => {
    axios
      .post(BASE_URL + "UserSocialSignUp", {
        customer_email: email,
        customer_first_name: newFName,
        customer_last_name: newLName,
        customer_phone_num: newPhoneNumber,
        role: "ADMIN",
        user_access_token: accessToken,
        user_refresh_token: refreshToken,
        social_id: socialId,
        access_expires_in: accessExpiresIn.toString(),
        user_social_media: "GOOGLE",
      })
      .then((response) => {
        console.log(response);
        setLoginSuccessful(true);
        if (response.status != 200) {
          return;
          // add validation
        }
        console.log("in else");
        hideSignUp();
        //hideSignUp();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const socialSignUpModal = () => {
    const modalStyle = {
      position: "absolute",
      top: "30%",
      left: "35%",
      width: "500px",
    };
    const headerStyle = {
      border: "none",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      font: "normal normal 600 20px Quicksand-Book",
      textTransform: "uppercase",
      backgroundColor: " #757575",
      padding: "1rem",
      color: "#b28d42",
    };
    const footerStyle = {
      border: "none",
      backgroundColor: " #757575",
    };
    const bodyStyle = {
      backgroundColor: " #757575",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      font: "normal normal 600 16px Quicksand-Regular",
    };
    return (
      <Modal
        show={socialSignUpModalShow}
        onHide={hideSignUp}
        style={modalStyle}
      >
        <Form>
          <Modal.Header style={headerStyle} closeButton>
            <Modal.Title>Sign Up with social media</Modal.Title>
          </Modal.Header>
          <Modal.Body style={bodyStyle}>
            <Form.Group className="formEltMargin">
              <Form.Group as={Row} className="formEltMargin">
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={newFName}
                    onChange={handleNewFNameChange}
                    className={classes.textfield}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    value={newLName}
                    onChange={handleNewLNameChange}
                    className={classes.textfield}
                  />
                </Col>
              </Form.Group>

              <Col>
                <Form.Group as={Row} className="formEltMargin">
                  <Form.Control
                    type="tel"
                    placeholder="Phone Number"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={newPhoneNumber}
                    onChange={handleNewPhoneNumberChange}
                    className={classes.textfield}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group as={Row} className="formEltMargin">
                  <Form.Control
                    plaintext
                    readOnly
                    value={email}
                    className={classes.textfield}
                  />
                </Form.Group>
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer style={footerStyle}>
            <Form.Group className="formEltMargin">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSocialSignUpDone}
                  className={classes.loginbutton}
                >
                  Sign Up
                </Button>

                <Button
                  variant="primary"
                  type="submit"
                  onClick={hideSignUp}
                  className={classes.loginbutton}
                >
                  Cancel
                </Button>
              </div>
            </Form.Group>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };

  const hideLoginSuccessful = () => {
    setLoginSuccessful(false);
  };

  return (
    <Row xs={12} className={classes.buttonLayout}>
      <Row xs={12} className={classes.buttonLayout}>
        <Col></Col>
        <Col xs={8} className={classes.loginbuttons}>
          <Button>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              accessType="offline"
              prompt="consent"
              responseType="code"
              buttonText="Log In"
              ux_mode="redirect"
              isSignedIn={false}
              disable={true}
              cookiePolicy={"single_host_origin"}
              // redirectUri={"https://nityaayurveda.com"}
              scope="https://www.googleapis.com/auth/calendar"
              redirectUri="http://localhost:3000"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              render={(renderProps) => (
                <img
                  src={Google}
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  alt={""}
                  style={{
                    minWidth: "60%",
                    maxWidth: "70%",
                    padding: "0",
                    margin: 0,
                  }}
                ></img>
              )}
            />
          </Button>
        </Col>
        <Col></Col>
      </Row>

      {socialSignUpModal()}
      {alreadyExistsModal()}
      {loginSuccessfulModal()}
    </Row>
  );
}
