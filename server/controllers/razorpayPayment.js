const Razorpay = require("razorpay");

const razorInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.razorPayCheckout = (req, res) => {
  const { products, token } = req.body;
  const options = {
    amount: products.total * 100,
    currency: "INR",
  };
};
