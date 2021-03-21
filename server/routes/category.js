const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const { createCategory } = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

module.exports = router;
