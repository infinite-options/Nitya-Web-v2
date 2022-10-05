import React, { Component } from "react";
import { Link } from "react-router-dom";

class LearnMoreBtn extends Component {
  constructor(props) {
    super(props);
    // this.state = { apptID: "330-000006" };
    this.state = { tID: props.apptID };
  }

  render() {
    return (
      <div>
        <br />
        <div
          style={{
            textAlign: "center",
            color: "blue",
            textDecoration: "underline",
            font: "normal normal normal 22px/26px Hoefler Text",
          }}
          aria-label={"click button to learn more."}
        >
          <Link
            to={{ pathname: "/learnMore", state: { id: this.state.tID } }}
            style={{ color: "#0288D1", fontSize: "16px" }}
          >
            Learn More
          </Link>
        </div>
      </div>
    );
  }
}

export default LearnMoreBtn;
