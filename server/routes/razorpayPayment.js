const express = require("express");
const router = express.Router();

const {
  razorPayCheckout,
  razorPayVerification,
} = require("../controllers/razorpayPayment");

router.post("/verification", razorPayVerification);
router.post("/checkout", razorPayCheckout);

module.exports = router;
