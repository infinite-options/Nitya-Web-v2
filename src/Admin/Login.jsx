import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "js-cookie";
import { useHistory, withRouter } from "react-router";
import axios from "axios";
import { Button, Typography } from "@material-ui/core";

import Google from "../Assets/Images/Google.svg";
import { Col, Form, Modal, Row } from "react-bootstrap";
import { AuthContext } from "../auth/AuthContext";
import { GoogleLogin } from "react-google-login";

const eye = ""; // <FontAwesomeIcon icon={faEye} />;

const BASE_URL = process.env.REACT_APP_SERVER_BASE_URI;
let CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
let CLIENT_SECRET = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
function AdminLogin(props) {
  const [emailValue, setEmail] = useState("");
  const [passwordValue, setPassword] = useState("");
  const [errorValue, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [idToken, setIdToken] = useState("");
  const [socialId, setSocialId] = useState("");
  const [userID, setUserID] = useState("");
  const [loggedIn, setLoggedIn] = useState();
  const [doNotExistShow, setDoNotExistShow] = useState(false);
  const [userExistShow, setUserExistShow] = useState(false);
  const Auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (
      process.env.REACT_APP_APPLE_CLIENT_ID &&
      process.env.REACT_APP_APPLE_REDIRECT_URI
    ) {
      /* window.AppleID.auth.init({
        clientId: process.env.REACT_APP_APPLE_CLIENT_ID,
        scope: "email",
        redirectURI: process.env.REACT_APP_APPLE_REDIRECT_URI,
      }); */
    }
    let queryString = props.location.search;
    let urlParams = new URLSearchParams(queryString);
    // Clear Query parameters
    window.history.pushState({}, document.title, window.location.pathname);
    console.log(props, urlParams);
    // Successful Log in with Apple, set cookies, context, redirect
    if (urlParams.has("id")) {
      let customerId = urlParams.get("id");
      Auth.setIsAuth(true);
      Cookies.set("login-session", "good");
      Cookies.set("customer_uid", customerId);
      props.history.push("/admin");
    }
    // Log which media platform user should have signed in with instead of Apple
    // May eventually implement to display the message for which platform to Login
    else if (urlParams.has("media")) {
      console.log(urlParams.get("media"));
    }
  }, []);

  const handleEmailChange = (e) => {
    // console.log('email is changing')
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    // console.log('password is changing')
    setPassword(e.target.value);
  };
  const responseGoogle = (response) => {
    console.log(response);
    if (response.profileObj) {
      let email = response.profileObj.email;
      let ta_id = "";
      setEmail(response.profileObj.email);
      setSocialId(response.googleId);
      axios.get(BASE_URL + `taTokenEmail/${email}`).then((response) => {
        console.log(
          "in events",
          response["data"]["ta_unique_id"],
          response["data"]["ta_google_auth_token"]
        );
        console.log("in events", response);
        setAccessToken(response["data"]["ta_google_auth_token"]);
        let url =
          "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=";

        console.log("Login successful");
        console.log(email);
        history.push({
          pathname: "/home",
          state: email,
        });
        setUserID(response["data"]["ta_unique_id"]);
        ta_id = response["data"]["ta_unique_id"];
        var old_at = response["data"]["ta_google_auth_token"];
        console.log("in events", old_at);
        var refreshToken = response["data"]["ta_google_refresh_token"];

        let checkExp_url = url + old_at;
        console.log("in events", checkExp_url);
        fetch(
          `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${old_at}`,
          {
            method: "GET",
          }
        )
          .then((response) => {
            console.log("in events", response);
            if (response["status"] === 400) {
              console.log("in events if");
              let authorization_url =
                "https://accounts.google.com/o/oauth2/token";

              var details = {
                refresh_token: refreshToken,
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                grant_type: "refresh_token",
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
                  "Content-Type":
                    "application/x-www-form-urlencoded;charset=UTF-8",
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
                  var id_token = data["id_token"];
                  setAccessToken(at);
                  setIdToken(id_token);
                  console.log("in events", at);
                  let url = BASE_URL + `UpdateAccessToken/${ta_id}`;
                  axios
                    .post(url, {
                      google_auth_token: at,
                    })
                    .then((response) => {})
                    .catch((err) => {
                      console.log(err);
                    });
                  return accessToken;
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              setAccessToken(old_at);
              console.log(old_at);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        console.log("in events", refreshToken, accessToken);
      });

      _socialLoginAttempt(email, accessToken, socialId, "GOOGLE");
    }
  };

  const _socialLoginAttempt = (email, at, socialId, platform) => {
    axios
      .get(BASE_URL + "UserSocialLogin/" + email)
      .then((res) => {
        console.log("loginSocialTA in events", res.data.result);
        if (res.data.result !== false) {
          // setUserID(res.data.result[0]);

          setAccessToken(res.data.result[1]);
          setLoggedIn(true);
          history.push("/blog");
          console.log("Login successful");
          console.log(email);

          // Successful log in, Try to update tokens, then continue to next page based on role
        } else {
          axios
            .get(BASE_URL + "GetUserEmailId/" + email)
            .then((response) => {
              if (response.data.message === "User ID doesnt exist") {
                console.log("log in error");
                // history.push('/signup');
                setDoNotExistShow(true);
              } else {
                setUserExistShow(true);
              }
            })
            .catch((error) => {
              console.log("its in landing page");
              console.log(error);
            });
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };
  const userDoNotExist = () => {
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
      <Modal show={doNotExistShow} onHide={hideDoNotExist} style={modalStyle}>
        <Form>
          <Modal.Header style={headerStyle} closeButton>
            <Modal.Title>User Account Does Not Exist</Modal.Title>
          </Modal.Header>

          <Modal.Body style={bodyStyle}>
            <div>
              The User with email: {emailValue} does not exist! Please Sign Up!
            </div>
          </Modal.Body>

          <Modal.Footer style={footerStyle}>
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
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
                  onClick={hideDoNotExist}
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
                  onClick={() => history.push("/signup")}
                  className={classes.loginbutton}
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  };
  const hideDoNotExist = () => {
    setDoNotExistShow(false);
  };

  const verifyLoginInfo = (e) => {
    console.log("Verifying");
    // Attempt to login
    // Get salt for account
    e.preventDefault();
    axios
      .post(
        "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/AccountSalt",
        {
          // params: {
          email: emailValue,
          // }
        }
      )
      .then((res) => {
        console.log("response recieved: ");
        console.log(res);
        // console.log(emailValue, passwordValue);
        let saltObject = res;
        if (saltObject.data.code === 200) {
          let hashAlg = saltObject.data.result[0].password_algorithm;
          let salt = saltObject.data.result[0].password_salt;
          // let salt = "cec35d4fc0c5e83527f462aeff579b0c6f098e45b01c8b82e311f87dc6361d752c30293e27027653adbb251dff5d03242c8bec68a3af1abd4e91c5adb799a01b";
          if (hashAlg != null && salt != null) {
            // Make sure the data exists
            if (hashAlg !== "" && salt !== "") {
              // Rename hash algorithm so client can understand
              switch (hashAlg) {
                case "SHA512":
                  hashAlg = "SHA-512";
                  break;
                default:
                  break;
              }
              // console.log(hashAlg);
              // Salt plain text password
              let saltedPassword = passwordValue + salt;
              // console.log(saltedPassword);
              // Encode salted password to prepare for hashing
              const encoder = new TextEncoder();
              const data = encoder.encode(saltedPassword);
              //Hash salted password
              crypto.subtle.digest(hashAlg, data).then((res) => {
                let hash = res;
                // Decode hash with hex digest
                let hashArray = Array.from(new Uint8Array(hash));
                let hashedPassword = hashArray
                  .map((byte) => {
                    return byte.toString(16).padStart(2, "0");
                  })
                  .join("");
                console.log(hashedPassword);
                let loginObject = {
                  email: emailValue,
                  password: hashedPassword,
                  social_id: "",
                  signup_platform: "",
                };
                console.log(JSON.stringify(loginObject));
                axios
                  //post api login
                  .post(
                    "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login",
                    loginObject,
                    {
                      headers: {
                        "Content-Type": "text/plain",
                      },
                    }
                  )
                  //TODO: Tell Prashant social login has to be done from back end
                  .then((res) => {
                    //TODO: tell to please use Google/ Facebook login
                    console.log(res);
                    if (res.data.code === 200) {
                      history.push("/blog");
                      Auth.setIsAuth(true);
                      Auth.isLoggedIn(true);
                      setError("");
                      console.log("Login success");
                      let customerInfo = res.data.result[0];

                      Auth.setIsAuth(true);
                      Cookies.set("login-session", "good");
                      Cookies.set("customer_uid", customerInfo.customer_uid);
                      Cookies.set("role", customerInfo.role);

                      let newAccountType = customerInfo.role.toLowerCase();
                      switch (newAccountType) {
                        case "admin":
                          Auth.setAuthLevel(2);
                          props.history.push("/blog");
                          break;

                        case "customer":
                          Auth.setAuthLevel(0);
                          props.history.push("/home");
                          break;

                        default:
                          Auth.setAuthLevel(1);
                          props.history.push("/home");
                          break;
                      }
                    } else if (res.data.code === 406 || res.data.code === 404) {
                      console.log("Invalid credentials");
                      setError("credential");
                      setErrorMessage("Invalid credentials");
                    } else if (res.data.code === 401) {
                      console.log("Need to log in by social media");
                      setError("social");
                      setErrorMessage(res.data.message);
                    } else if (res.data.code === 407) {
                      console.log("Need email verification");
                      setError("email_verify");
                      axios
                        .post(
                          process.env.REACT_APP_SERVER_BASE_URI +
                            "email_verification",
                          { email: emailValue },
                          {
                            headers: {
                              "Content-Type": "text/plain",
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res);
                          setErrorMessage(
                            "Email not verified. Check your email to get link for verification."
                          );
                        })
                        .catch((err) => {
                          setErrorMessage("Email not verified.");
                          if (err.response) {
                            console.log(err.response);
                          }
                          console.log(err);
                        });
                    } else {
                      console.log("Unknown login error");
                      setError("unknown");
                      setErrorMessage(res.data.message);
                    }
                  })
                  .catch((err) => {
                    // Log error for Login endpoint
                    if (err.response) {
                      console.log(err.response);
                    }
                    console.log(err);
                  });
              });
            }
          } else {
            // No hash/salt information, probably need to sign in by socail media
            console.log("Salt not found");
            // Try to login anyway to confirm
            let loginObject = {
              email: emailValue,
              password: "test",
              token: "",
              signup_platform: "",
            };
            // console.log(JSON.stringify(loginObject))
            axios
              .post(
                "https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/Login",
                loginObject,
                {
                  headers: {
                    "Content-Type": "text/plain",
                  },
                }
              )
              .then((res) => {
                console.log(res);
                if (res.data.code === 404) {
                  console.log("Invalid credentials");
                  setError("credential");
                  setErrorMessage("Invalid credentials");
                } else {
                  console.log("Unknown login error");
                  setError("unknown");
                  setErrorMessage("Login failed, try again");
                }
              })
              .catch((err) => {
                // Log error for Login endpoint
                if (err.response) {
                  console.log(err.response);
                }
                console.log(err);
              });
          }
        } else if (res.data.code === 401) {
          console.log("Use Social Login");
          setError("social");
          let socialMediaUsed = res.data.result[0].user_social_media;
          let socialMediaUsedFormat =
            socialMediaUsed.charAt(0) + socialMediaUsed.slice(1).toLowerCase();
          let newErrorMessage = "Use " + socialMediaUsedFormat + " to login";
          setErrorMessage(newErrorMessage);
        } else if (res.data.code === 404) {
          // No information, probably because invalid email
          console.log("Invalid credentials");
          setError("credential");
          setErrorMessage("Invalid credentials");
        } else {
          console.log("Unknown log in error");
          setError("Log in failed, try again");
        }
      })
      .catch((err) => {
        // Log error for account salt endpoint
        if (err.response) {
          console.log(err.response);
        }
        console.log(err);
      });
  };

  const showError = () => {
    if (errorValue === "") {
      return null;
    }
    return <Typography style={{ color: "red" }}>{errorMessage}</Typography>;
  };

  const pageColor = "#b28d42";
  const useStyles = makeStyles({
    pageText: {
      fontSize: "24px",
      color: pageColor,
    },
    root: {
      backgroundColor: "#DADADA",
      padding: "50px",
    },
    container: {
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      backgroundColor: "white",
      width: "883px",
      padding: "20px",
    },
    formContainer: {
      display: "flex",
      flexDirection: "column",
      width: "457px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    formTextInput: {
      width: "457px",
      padding: "10px 20px",
      margin: "7px",
      borderRadius: "25px",
      border: "2px solid " + pageColor,
      outline: "none",
      "&::placeholder": {
        color: pageColor,
      },
    },
    button: {
      height: "60px",
      width: "243px",
      color: "white",
      backgroundColor: pageColor,
      borderRadius: "25px",
      border: "none",
      "&:focus": {
        outline: "none",
      },
    },
    inputWrapper: {
      position: "relative",
    },
    eye: {
      color: pageColor,
      position: "absolute",
      top: "20px",
      right: "28px",
      cursor: "pointer",
    },
    buttonLayout: { width: "100%", padding: "0", margin: "0" },
    loginbuttons: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    loginbutton: {
      background: "#b28d42 0% 0% no-repeat padding-box",
      borderRadius: "10px",
      font: "normal normal bold 16px Quicksand-Bold",
      color: "#ffffff",
      margin: "1rem",
      textTransform: "none",
    },
  });

  const classes = useStyles();
  const [password1Shown, setPassword1Shown] = useState(false);
  const togglePasswordVisiblity = (passwordShown) => {
    setPassword1Shown(!passwordShown);
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.pageText} style={{ paddingBottom: "20px" }}>
          Login
        </div>
        {/* <SocialLogin /> */}
        <Row xs={12} className={classes.buttonLayout}>
          <Col></Col>
          <Col xs={8} className={classes.loginbuttons}>
            <Button>
              <GoogleLogin
                clientId={CLIENT_ID}
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
                buttonText="Log In"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                isSignedIn={false}
                disable={false}
                cookiePolicy={"single_host_origin"}
              />
            </Button>
          </Col>
          <Col></Col>
        </Row>
        <div className={classes.pageText} style={{ padding: "10px" }}>
          Or
        </div>
        <form className={classes.formContainer}>
          <div className={classes.inputWrapper}>
            <input
              className={classes.formTextInput}
              type="text"
              placeholder="Email Address"
              value={emailValue}
              onChange={handleEmailChange}
            />
          </div>

          <div className={classes.inputWrapper}>
            <input
              className={classes.formTextInput}
              type={password1Shown ? "text" : "password"}
              placeholder="Password"
              value={passwordValue}
              onChange={handlePasswordChange}
            />
            <i
              className={classes.eye}
              onClick={() => togglePasswordVisiblity(password1Shown)}
            >
              {eye}
            </i>
          </div>

          <div style={{ padding: "15px" }}>
            <input
              type="submit"
              value="Login"
              className={classes.button}
              onClick={verifyLoginInfo}
            />
          </div>
        </form>
        <div>{showError()}</div>
        <div className={classes.pageText} style={{ marginTop: "40px" }}>
          Don't have an account?
        </div>
        <button
          className={classes.button}
          style={{ marginBottom: "30px" }}
          onClick={() => {
            history.push("/signup");
          }}
        >
          Sign Up
        </button>
      </div>
      {userDoNotExist()}
    </div>
  );
}

const paperStyle = {
  width: "500px",
  textAlign: "center",
  display: "inline-block",
  padding: "20px",
  marginTop: "50px",
  backgroundColor: "#e9d9ac",
};

export default withRouter(AdminLogin);
