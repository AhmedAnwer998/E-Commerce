import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import stripe from "stripe";

// Load environment variables from the .env file
dotenv.config();

// Ensure the STRIPE_SECRET_KEY is loaded correctly
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("STRIPE_SECRET_KEY is not set in the environment variables!");
  process.exit(1); // Stop the server if the key is not found
}

// Initialize Stripe with the secret key from environment
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // Corrected typo from 'exxpress' to 'express'

// Test route to verify server is working
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Sample route for Stripe payment intent (as an example)
app.post("/checkout",async(req, res) => {
  let error;
  let status;
  try {
    const {cart, token} = req.body;
    const customer = await stripeClient.customers.create({
      email: token.email,
      source: token.id,
    })
    const key = uuidv4();
    const charge = await stripe.ChargesResource.create(
      {
        amount: cart.calculateSubTotal * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: "products description here",
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      { idempotencyKey: key }
    );
    status = "success";
    }
    catch (error) {
    console.log(error);
    status = "error";
  }
  res.json({status});
});

// Start the server
const port = 8081; // Change the port to something else, like 8081 or any other available port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
