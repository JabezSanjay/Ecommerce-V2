const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
  getAllUsers,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/users/all", getAllUsers);

router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

router.get(
  "/user/orders/:userId",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

module.exports = router;
