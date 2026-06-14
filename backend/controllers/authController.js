const User = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password, adminToken } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if admin token is valid
    const role = adminToken === process.env.ADMIN_TOKEN ? "admin" : "user";

    const user = await User.create({ name, email, password: hashedPassword, role });
    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
      const message = `
      Welcome to ShopNest, ${name}!
      Thank you for registering with us. We're excited to have you on board.
      Your OTP for email verification is: ${otp}`;

      await sendEmail(
        user.email,
        "Welcome to ShopNest - Email Verification",
        message,
      );
      res.status(201).json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    console.error(error);
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Users (Admin Only)
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getUsers };