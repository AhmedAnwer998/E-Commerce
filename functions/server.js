const express = require("express");
const bodyParser = require("body-parser");
const stripe = require("stripe")("sk_test_...");
const functions = require("firebase-functions");
const cors = require("cors"); // Add this

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true })); // Add this

// Create a Stripe Checkout session
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { lineItems, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail,
      success_url: "https://e-commerce-eta-snowy-81.vercel.app/", // Update this
      cancel_url: "https://e-commerce-eta-snowy-81.vercel.app/", // Update this
    });

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

    const session = await stripe.checkout.sessions.retrieve(session_id);

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

exports.createCheckoutSession = functions.https.onRequest(app);
