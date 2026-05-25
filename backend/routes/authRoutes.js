const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware.js');
const { admin } = require('../middleware/adminMiddleware.js');
const { registerUser, loginUser, getUsers } = require('../controllers/authController.js');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers); // Admin only route to get all users

module.exports = router;