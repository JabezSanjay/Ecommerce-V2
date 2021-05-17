const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.post("/checkout", isSignedIn, isAuthenticated, razorPayCheckout);

module.exports = router;
