const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  getFavorite,
  addFavorite,
  removeFavorite,
  userPurchaseList,
  getAllUsers,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/users/all", getAllUsers);
router.get("/user/get/favorite/:userId", getFavorite);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.put(
  "/user/add/favorite/:userId",
  isSignedIn,
  isAuthenticated,
  addFavorite
);

router.put(
  "/user/remove/favorite/:userId",
  isSignedIn,
  isAuthenticated,
  removeFavorite
);

router.get(
  "/user/orders/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
