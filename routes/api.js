// Init Path
__path = process.cwd();
// End Init Path

// Init Var Express JS, Cors, Secure, Request, Axios, Dotenv, Fs
var express = require("express");
var secure = require("ssl-express-www");
var cors = require("cors");
var request = require("request");
var axios = require("axios");
var fetch = require("node-fetch");
var dotenv = require("dotenv").config();
var fs = require("fs");

// Init Router
var router = express.Router();

// Init Libary
var { crud } = require("./../lib");

// set header api
router.use(function (req, res, next) {
  res.setHeader("X-Powered-By", "Nabils24-Api");
  res.setHeader("contact", "nabilsahsadacode@gmail.com");
  next();
});

// apiku
router.post("/adduser", async (req, res, next) => {
  /**
   * id, username, age, email
   */
  var id = req.query.id;
  var username = req.query.username;
  var age = req.query.age;
  var email = req.query.email;
  if (!id || !username || !age || !email) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  } else {
    crud
      .adduser(id, username, age, email)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
});

router.get("/finduser", async (req, res, next) => {
  /**
   * id
    */
  var id = req.query.id;
  if (!id) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  } else {
    crud.finduser(id).then((result) => {
      res.status(200).json(result);
    });
  }
});

router.put("/updateuser", async (req, res, next) => {
  /**
   * id, username, age, email
   *  */
  var id = req.query.id;
  var username = req.query.username;
  var age = req.query.age;
  var email = req.query.email;
  if (!id || !username || !age || !email) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  } else {
    crud.updateuser(id, username, age, email).then((result) => {
      res.status(200).json(result);
    });
  }
});

router.delete("/deleteuser", async (req, res, next) => {
  /**
   * id
   * */
  var id = req.query.id;
  if (!id) {
    res.status(400).json({
      status: 400,
      message: "Bad Request",
    });
  } else {
    crud.deleteuser(id).then((result) => {
      res.status(200).json(result);
    });
  }
});


router.use(function (req, res) {
  res.status(404).json({
    status: 404,
    message: "Not Found",
  });
});

module.exports = router;
