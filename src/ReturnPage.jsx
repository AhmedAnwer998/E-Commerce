import React, { useEffect, useState } from "react";

const ReturnPage = () => {
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id"
    );

    if (sessionId) {
      // Fetch the session status from your Firebase Function
      fetch(
        `http://127.0.0.1:5002/e-commerce-681c3/us-central1/createCheckoutSession/session_status?session_id=${sessionId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setStatus(data.status);
          setPaymentStatus(data.payment_status);
          setEmail(data.customer_email);
        })
        .catch((error) => {
          console.error("Error fetching session status:", error);
        });
    }
  }, []);

  if (status === "complete") {
    return <h1>Payment Successful! Thank you, {email}.</h1>;
  } else if (status === "open") {
    return <h1>Payment Failed or Canceled. Please try again.</h1>;
  } else {
    return <h1>Loading...</h1>;
  }
};

export default ReturnPage;
