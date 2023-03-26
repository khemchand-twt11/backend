const express = require("express");
const { userModel } = require("../models/user.mode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const userRoute = express.Router();
userRoute.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      if (err) return res.status(400).send({ error: err.message });
      const newUser = new userModel({ name, email, pass: hash });
      await newUser.save();
      res.status(200).send({ msg: "user registere successfully!" });
    });
  } catch (error) {
    res.send({ error: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).send({ msg: "user doesn't exists" });
    } else {
      let result = await bcrypt.compare(pass, user.pass);
      if (result) {
        res.status(200).send({
          status: "success",
          token: jwt.sign({ userID: user._id }, process.env.KEY, {
            expiresIn: "1h",
          }),
        });
      } else {
        res.status(400).send({ msg: "wrong credentials" });
      }
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = { userRoute };
