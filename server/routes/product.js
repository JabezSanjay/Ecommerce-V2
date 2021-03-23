const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { createProduct } = require("../controllers/product");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
  "/product/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

module.exports = router;
