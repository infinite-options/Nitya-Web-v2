import React, { Component } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import './BookNowBtn.css';

class BookNowBTN extends Component {
  constructor(props) {
    super(props);
    this.state = { tID: props.apptID };
  }

  render() {
    return (
      <div aria-label={"click button to book a session now"} style={{display:"flex", justifyContent:"center",marginTop:'1rem'}}>
        <Button
          style={{
            backgroundColor: "#D3A625",
            border: "none",
            //borderRadius: "36px",
            //padding: "10px",
            width:"40%",
            height: "auto",
            align:"center",
            textDecorationLine:'none'

          }}
        >
          <Link to={`/${this.state.tID}/appt`} style={{textDecoration:'none'}} >
            <p
              className="BookNowBtn"
              style={{
                color: "white",
                display:'flex',
                justifyContent:'center',
                fontSize:"20px",
                textDecoration:'none'
                

              }}
            >
              Book Now
            </p>
          </Link>
        </Button>
      </div>
    );
  }
}

export default BookNowBTN;
