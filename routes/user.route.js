const express = require("express");
const router = express.Router();
const {
  fetchAllUsers,
  createWallet,
  fundWallet,
  transferFunds,
  withdrawFunds,
} = require("../controllers/user.controller");
const authenticated  = require("../middleware/auth.middleware");

router.get("/", fetchAllUsers);
router.post("/wallet", authenticated, createWallet);
router.post("/fundWallet/:id", authenticated, fundWallet);
router.post(
  "/transferFunds/:senderId/:receiverId",
  authenticated,
  transferFunds
);
router.post("/withdraw/:id", authenticated, withdrawFunds);

module.exports = router;
