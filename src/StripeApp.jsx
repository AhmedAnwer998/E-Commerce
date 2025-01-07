import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Load your Publishable Key
const stripePromise = loadStripe(
  "pk_test_51QZDgFGqLw8AAx3CPbhPTvEwggjHVtZLbxIjfDLEywnfm4A8cASX8AxoqP1K2r8u4JMVwbqFEDIwfGjPEMpexKdM00rQBhh1dw"
);

const StripeApp = ({ children }) => {
  return <>{children}</>;
};

export { StripeApp, stripePromise };
