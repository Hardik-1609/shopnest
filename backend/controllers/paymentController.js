const razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../model/Order.js");
dotenv = require("dotenv").config();

const createOrder = async (req, res) => {
  try {
    const instance = new razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    const order = await instance.orders.create(options);
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
    if (generated_signature === razorpay_signature) {
      res.json({ message: "Payment verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid payment signature" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { createOrder, verifyPayment };
