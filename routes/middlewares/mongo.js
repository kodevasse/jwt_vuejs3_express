// Export mongoose
const mongoose = require("mongoose");
const colors = require("colors");

require("dotenv-flow").config();

//Assign MongoDB connection string to Uri and declare options settings
// var uri = `mongodb+srv://${process.env.MONGO_URL_NAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL_CLUSTER}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
console.log(`url: ` + process.env.MONGO_URI);
const db = require("../models");
const User = db.user;

db.mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.".green);
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new User({
        email: "admin@domain.com",
        password:
          "$2a$08$hVnfdemp6cpovhm0uOvDeOqPcwiO7Ek0SWcGqLwlTTytFRBg7C.TW", // KeepingHumanSafe101
        accountType: "admin",
        fname: "Admin",
        lname: "",
        accountType: "admin",
        plan: "Ultimate",
        status: "active",
        credits: 10000,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("admin user added".underline);
      });

      new User({
        email: "support@openai.com",
        password:
          "$2a$12$gfFwZrZvYWoXiSGyqOueseI6i9tdt8Sya7ZpVZ8ZEcINrvcL1YNdm", // HelloHello
        accountType: "user",
        fname: "OpenAI",
        lname: "Support",
        plan: "Ultimate",
        status: "active",
        credits: 500,
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("normaluser added".blue);
      });
    }
  });
}
