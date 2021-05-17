const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.razorPayCheckout = async (req, res) => {
  const { total } = req.body;
  const options = {
    amount: (total * 100).toString(),
    currency: "INR",
    receipt: shortid.generate(),
    payment_capture: 1,
  };
  try {
    const response = await razorInstance.orders.create(
      options,
      (error, order) => {
        if (error) {
          res.json(error);
        } else {
          res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
