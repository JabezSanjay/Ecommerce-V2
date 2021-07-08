const Razorpay = require("razorpay");
const shortid = require("shortid");
const crypto = require("crypto");

const razorInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID_BACKEND,
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

exports.razorPayVerification = (req, res) => {
  const secret = process.env.RAZOR_SECRET;

  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    return res.status(200);
  }
  res.json({ status: "ok" });
  return;
};
