const express = require("express");
const router = express.Router();
const { register } = require("../controllers/auth.js");
const { check } = require("express-validator");

router.post(
  "/register",
  [
    check("name", "Name should be at least 3 characters").isLength({ min: 3 }),
    check("email", "Email is required").isEmail(),
    check("password", "Password should be at least 3 characters").isLength({
      min: 3,
    }),
  ],
  register
);

module.exports = router;
