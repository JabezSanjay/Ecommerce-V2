const express = require("express");
const router = express.Router();

const { isAdmin, isAuthenticated, isSignedIn } = require("../controllers/auth");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  getCategory,
} = require("../controllers/category");
const { getUserById } = require("../controllers/user");

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

router.get("/category/all", getAllCategories);
router.get("/category/:categoryId", getCategory);

module.exports = router;
