const express = require("express");

// const openai = require("../middlewares/openai");
// const {
//   initMiddleware,
//   creditCheck,
//   contentFilterCheck,
//   sendResponse,
//   creditPayment,
//   saveToHistory,
// } = require("./middleware");
// const openai = require("../middlewares/openai");
// const { sendResponse } = require("./middleware");

let app = express.Router();

// app.use('/', initMiddleware, creditCheck);

// app.use('/', initMiddleware, creditCheck);

app.use("/", require("./application"));
app.use("/", require("./summary"));
// app.use('/', require('./code/interpret'));
// app.use('/', require('./writing/intro'));
// app.use('/', require('./jobad'));
// app.use('/', require('./helloworld'));
app.use("/", require("./example"));

// app.use('/', contentFilterCheck);
// app.use('/', creditPayment);
// app.use('/', saveToHistory);

// app.use('/', sendResponse);

module.exports = app;
