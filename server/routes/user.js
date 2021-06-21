const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  addFavorite,
  userPurchaseList,
  getAllUsers,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/users/all", getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.put(
  "/user/add/favorite/:userId",
  isSignedIn,
  isAuthenticated,
  addFavorite
);

router.get(
  "/user/orders/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
