import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ReturnPage = () => {
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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

          // Redirect to ProductList page if payment is successful
          if (data.status === "complete") {
            setTimeout(() => {
              navigate("/"); // Redirect to the ProductList page
            }, 3000); // Wait 3 seconds before redirecting
          }
        })
        .catch((error) => {
          console.error("Error fetching session status:", error);
        });
    }
  }, [navigate]);

  if (status === "complete") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold">
          Payment Successful! Thank you, {email}. Redirecting to the home
          page...
        </h1>
      </div>
    );
  } else if (status === "open") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold">
          Payment Failed or Canceled. Please try again.
        </h1>
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }
};

export default ReturnPage;
