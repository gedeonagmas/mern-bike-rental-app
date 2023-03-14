const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Admin = require("../models/adminSchema");

// Admin Signin
module.exports = router.post("/signinAdmin", async (req, res) => {
  try {
    console.log(req.body);
    let token;
    const { adminName, adminPassword } = req.body;

    if (!adminName || !adminPassword) {
      return res
        .status(400)
        .json({ error: "invalid crededntials provide email and password" });
    }

    const adminSignin = await Admin.findOne({ adminName: adminName });

    if (adminSignin) {
      const isSame = await bcrypt.compare(
        adminPassword,
        adminSignin.adminPassword
      );
      // const isSame = adminPassword === adminSignin.adminPassword;
      // token = await adminSignin.generateAuthToken();
      // console.log(token, "ttttt");

      res.cookie("jwtAdmin", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isSame) {
        res
          .status(400)
          .json({ error: "invalid credentials password not match" });
      } else {
        res.json({ message: "user signin successfully" });
      }
    } else {
      res.status(400).json({ error: "invalid crededntials admin not found" });
    }
  } catch (error) {
    console.log("wrong");
  }
});
