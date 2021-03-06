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
  // req.body.order.user = req.profile;
  const order = new Order(req.body);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }

    return res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders so far!",
        });
      }
      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

//MIDDLEWARES
exports.updateStock = (req, res, next) => {
  let stockUpdation = req.body.products.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: { $inc: { stock: -product.count, sold: +product.count } },
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
  req.body.products.forEach((product) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      count: product.count,
      amount: req.body.amount,
      transaction_id: req.body.transaction_id,
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

exports.updateOrderStatus = (req, res) => {
  Order.updateOne(
    { _id: req.order._id },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status!",
        });
      }
      return res.json(req.order);
    }
  );
};
