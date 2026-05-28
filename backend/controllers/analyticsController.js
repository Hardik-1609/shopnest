const Order = require("../model/Order.js");
const Product = require("../model/Product.js");
const User = require("../model/User.js");

const getAdminStats = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments({});
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalProducts = await Product.countDocuments({});

    const orders = await Order.find({});
    const totalEarnings = orders.reduce(
      (acc, order) => acc + order.totalPrice,
      0,
    );

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalEarnings,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAdminStats };
