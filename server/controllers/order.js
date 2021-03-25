const { Order, ProductCart } = require("../models/order");
const Product = require("../models/product");
const User = require("../models/user");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Order not found!",
        });
      }
      req.order = order;
      next();
    });
};

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

exports.getAllOrders = (req, res) => {
  Order.find((error, orders) => {
    if (error) {
      return res.status(400).json({
        error: "No orders so far!",
      });
    }
    return res.json(orders);
  });
};

//MIDDLEWARES
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

exports.pushOrderInPurchaseList = (req, res, next) => {
  let purchases = [];
  req.body.order.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (error, purchases) => {
      if (error) {
        return res.status(400).json({
          error: "Unable to save the purchase list of user!",
        });
      }
      next();
    }
  );
};
