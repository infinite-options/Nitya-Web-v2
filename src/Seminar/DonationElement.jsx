import React from "react";

import { Elements } from "@stripe/react-stripe-js";

import Donation from "./Donation";

export default function DonationElement(props) {
  console.log("stripePromise is set to: " + props.stripePromise, props);

  return (
    <Elements stripe={props.stripePromise}>
      <Donation firstName={props.firstName} email={props.email} />
    </Elements>
  );
}
