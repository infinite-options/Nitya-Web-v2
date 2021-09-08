import { React, useState } from "react";
import axios from "axios";
import ScrollToTop from "../../Blog/ScrollToTop";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import SocialLogin from "./SocialLogin";


const eye = <FontAwesomeIcon icon={faEye} />;

export default function SignUp(props) {
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
      marginLeft: "auto",
      marginRight: "auto",
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
  });
  const classes = useStyles();
  const [password1Shown, setPassword1Shown] = useState(false);
  const [password2Shown, setPassword2Shown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [open, setOpen] = useState(false);
  const togglePasswordVisiblity = (id, passwordShown) => {
    if (id === 1) setPassword1Shown(!passwordShown);
    else setPassword2Shown(!passwordShown);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const object = {
    email: email,
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    unit: "",
    city: "",
    state: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    referral_source: "",
    role: "CUSTOMER",
    social: "NULL",
    password: password,
    mobile_access_token: "FALSE",
    mobile_refresh_token: "FALSE",
    user_access_token: "FALSE",
    user_refresh_token: "FALSE",
    social_id: "NULL"
  }

  function Success() {
    handleClose()
    window.location.href = "/login";
  }

  function handleSignUp() {
    if (password === confirmPassword) {
      axios
        .post("https://mfrbehiqnb.execute-api.us-west-1.amazonaws.com/dev/api/v2/createAccount", object)
        .then((res) => {
          console.log("res", res)
        });
      handleClickOpen()
    } else {
      alert("Password does not match")
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.pageText} style={{ paddingBottom: "20px" }}>
          Sign Up
        </div>
        <SocialLogin />
        <div className={classes.pageText} style={{ paddingTop: "20px" }}>
          Or
        </div>
        <form className={classes.formContainer}>
          <div className={classes.inputWrapper}>
            <input
              className={classes.formTextInput}
              type="text"
              placeholder="Email Address"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>

          <div className={classes.inputWrapper}>
            <input
              className={classes.formTextInput}
              type={password1Shown ? "text" : "password"}
              placeholder=" Create Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <i
              className={classes.eye}
              onClick={() => togglePasswordVisiblity(1, password1Shown)}
            >
              {eye}
            </i>
          </div>
          <div className={classes.inputWrapper}>
            <input
              className={classes.formTextInput}
              type={password2Shown ? "text" : "password"}
              placeholder=" Confirm Password"
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            />
            <i
              className={classes.eye}
              onClick={() => togglePasswordVisiblity(2, password2Shown)}
            >
              {eye}
            </i>
          </div>


        </form>
        <Button type="submit" onClick={handleSignUp} className={classes.button} > SignUp</Button>
        {/* <input type="submit" value="Sign Up" className={classes.button} /> */}
        <div className={classes.pageText} style={{ marginTop: "40px" }}>
          Already have an account?
        </div>
        <button
          className={classes.button}
          style={{ marginBottom: "30px" }}
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Login
        </button>
      </div>


      <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open alert dialog
        </Button> */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"SignUp Successful"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You Have successfully created a New Account
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={Success} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>


    </div>
  );
}
