const express = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { admin } = require("../middleware/adminMiddleware.js");
const { createOrder, getOrders, myOrders, updateOrderStatus } = require("../controllers/orderController.js");

const router = express.Router();

// Create a new order
router.route("/").post(protect, createOrder).get(protect, admin, getOrders);

// Get order by ID
router.route("/myorders").get(protect, myOrders);

// Update order status
router.route("/:id/status").put(protect, admin, updateOrderStatus);

module.exports = router;
