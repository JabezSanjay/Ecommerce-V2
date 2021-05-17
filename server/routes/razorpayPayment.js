const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { razorPayCheckout } = require("../controllers/razorpayPayment");

router.post("/checkout", razorPayCheckout);

module.exports = router;
