const db = require("../models");
const jwt = require("jsonwebtoken");
const User = db.user;

// route middleware to verify a token
const verifyToken = (req, res, next) => {
  // check header or url parameters or post parameters for token
  console.log("auhen", req.headers.authorization);
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).send({ message: "Unauthorized Access" });
  }

  const token = authHeader.split(" ")[1];
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, req.app.get("jwt"), function (err, decoded) {
      if (err) {
        res.statusMessage = "Token Authentication Failed";
        res.sendStatus(401);
      } else {
        console.log("VERIFIED", decoded);
        req.user = decoded;
        next();
      }
    });
  } else {
    res.sendStatus(403).json();
  }
};

const isAdmin = (req, res, next) => {
  User.findById(req.user._id).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.accountType === "admin") {
      next();
    } else {
      res.status(403).send({ message: "You are not an admin" });
    }
  });
};

const authJwt = {
  // createJwtToken,
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
