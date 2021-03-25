const { Order, ProductCart } = require("../models/order");
const Product = require("../models/product");

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    res.json(order);
  });
};

exports.updateStock = (req, res, next) => {
  let stockUpdation = req.body.order.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: product.stock - 1, sold: product.sold + 1 } },
      },
    };
  });
  Product.bulkWrite(stockUpdation, {}, (error, products) => {
    if (error) {
      return res.status(400).json({
        error: error,
      });
    }
    next();
  });
};
