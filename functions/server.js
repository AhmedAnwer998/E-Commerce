const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")(
  "sk_test_51QZDgFGqLw8AAx3CwW4eNIUy0uoq2CSzIIMO6rh9OGN5T1vU1u418EmCD7ynaeY49hNU7mHXQEdAWKPpEW3ut4CR00nCUvOmxB"
);
const functions = require("firebase-functions");

const app = express();
app.use(bodyParser.json());

// Create a Stripe Checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { lineItems, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail,
      success_url:
        "http://192.168.1.100:4000/success?session_id={CHECKOUT_SESSION_ID}", // Use your local IP address
      cancel_url: "http://192.168.1.100:4000/cancel", // Use your local IP address
    });

    // Send the sessionId back to the frontend
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).send(error.message);
  }
});

// Fetch the status of a Stripe Checkout session
app.get("/session_status", async (req, res) => {
  try {
    const { session_id } = req.query;

    // Retrieve the session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id);

    // Send the session status back to the frontend
    res.json({
      status: session.status,
      payment_status: session.payment_status,
      customer_email: session.customer_details.email,
    });
  } catch (error) {
    console.error("Error fetching session status:", error);
    res.status(500).send(error.message);
  }
});

// Start the server on your local IP address
const PORT = 5002;
const HOST = "192.168.1.100"; // Replace with your machine's local IP address
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

// Export the express app to Firebase Functions
exports.createCheckoutSession = functions.https.onRequest(app);
