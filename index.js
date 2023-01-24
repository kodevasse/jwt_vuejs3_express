const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv").config();
const rawBody = require("raw-body");
//const { Configuration, OpenAIApi } = require("openai");
const axios = require("axios");
const port = process.env.PORT || 5000;

require("dotenv-flow").config();
require("./routes/middlewares/mongo");

const app = express();

// app.use(express.json());
app.use(morgan("dev"));

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

app.set("jwt", "ebeb1a5ada5cf38bfc2b49ed5b3100e0");

app.use("/api", require("./routes/api"));

// Set static folder
app.use(express.static(path.join(__dirname, "dist")));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`.green.inverse);
});
