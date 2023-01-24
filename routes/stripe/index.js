const express = require("express");
const mongoose = require("mongoose");
const stripe = require("../middlewares/stripe");
const bodyParser = require("body-parser");
const checkout = require("./checkout");
const subscription = require("./subscription");
const invoice = require("./invoice");
const rawBody = require("raw-body");

// Prepare Core Router
let app = express.Router();

// app.use(express.raw({ type: "application/json" }));

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
//Webhook handler for asynchronous events.
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    // let data;
    // let eventType;
    console.log(`webhook"]`, endpointSecret);
    // Check if webhook signing is configured.
    if (endpointSecret) {
      // Retrieve the event by verifying the signature using the raw body and secret.

      console.log(
        `req.headers["stripe-signature"]`,
        req.headers["stripe-signature"]
      );
      let sig = req.headers["stripe-signature"];
      let event;
      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`);
        return res.sendStatus(400);
      }
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = req.body.data;
      eventType = req.body.type;
    }

    checkout(eventType, data);
    subscription(eventType, data);
    invoice(eventType, data);

    // if (eventType === "checkout.session.completed") {
    // 	console.log(`🔔  Payment received!`);
    // }

    res.sendStatus(200);
  }
);

module.exports = app;
