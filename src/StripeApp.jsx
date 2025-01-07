import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Load your Publishable Key
const stripePromise = loadStripe(
  "pk_test_51QZDgFGqLw8AAx3CPbhPTvEwggjHVtZLbxIjfDLEywnfm4A8cASX8AxoqP1K2r8u4JMVwbqFEDIwfGjPEMpexKdM00rQBhh1dw"
);

const StripeApp = ({ cart, user }) => {
  const handleCheckout = useCallback(async () => {
  try {
    const stripe = await stripePromise;

    // Use the emulator endpoint
    const response = await fetch(
      "http://127.0.0.1:5002/e-commerce-681c3/us-central1/createCheckoutSession/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lineItems: cart.map((item) => ({
            price_data: {
              currency: "usd",
              product_data: { name: item.description, images: [item.image] },
              unit_amount: item.price * 100, // Convert to cents
            },
            quantity: item.quantity,
          })),
          customerEmail: user?.email || "customer@example.com", // Use the user's email if available
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error("Error redirecting to checkout:", error);
      alert("Failed to redirect to checkout. Please try again.");
    }
  } catch (error) {
    console.error("Error during checkout:", error);
    alert("An error occurred during checkout. Please check your connection and try again.");
  }
}, [cart, user]);

  return (
    <div id="checkout" className="mt-4">
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default StripeApp;
