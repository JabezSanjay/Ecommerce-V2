const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.status(400).json({
        error: "User not found!",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encrypted_password = undefined;
  return res.json(req.profile);
};

exports.getAllUsers = (req, res) => {
  User.find().exec((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "No users found!",
      });
    }
    res.json(users);
  });
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (error, user) => {
      if (error) {
        return res.status(400).json({
          error: "You are not authorized to update the user!",
        });
      }
      user.salt = undefined;
      user.encrypted_password = undefined;
      return res.json(user);
    }
  );
};

exports.getFavorite = (req, res) => {
  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: "You are not logged in!",
      });
    }
    return res.status(200).json(user.favourites);
  });
};

exports.addFavorite = (req, res) => {
  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: "You are not logged in!",
      });
    }
    user.favourites.push(req.body);
    user.save((err, updatedUser) => {
      if (err) {
        return res.status(401).json({
          error: "You are not logged in!",
        });
      }
      return res.status(200).json(updatedUser.favourites);
    });
  });
};

exports.removeFavorite = (req, res) => {
  User.findOne({ _id: req.profile._id }, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: "You are not logged in!",
      });
    }

    const prodIndex = user.favourites.findIndex((product) => {
      return product._id === req.body._id;
    });
    if (prodIndex !== -1) {
      user.favourites.splice(prodIndex, 1);
    }

    user.save((err, updatedUser) => {
      if (err) {
        return res.status(401).json({
          error: "You are not logged in!",
        });
      }

      return res.status(200).json(updatedUser.favourites);
    });
  });
};

exports.userPurchaseList = (req, res) => {
  const id = req.profile._id;

  User.findById(id).exec((err, order) => {
    if (err || order.purchases === []) {
      return res.status(400).json({
        error: "No Order in this account",
      });
    }
    return res.json(order.purchases);
  });
};
