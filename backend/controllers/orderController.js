const Order = require("../model/Order.js");
const sendEmail = require("../utils/sendEmail.js");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;
    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !address ||
      !paymentId
    ) {
      return res.status(400).json({ message: "All order fields are required" });
    } else {
      const order = new Order({
        user: req.user._id,
        items,
        totalAmount,
        address,
        paymentId,
      });
      await order.save();
      const message = `dear ${req.user.name}, \n\nThank for your order! Your order has been received and is being processed. We will notify you once it is shipped.\n\nOrder Details:\n- Total Amount: $${totalAmount}\n- Shipping Address: ${address.street}, ${address.city}, ${address.postalCode}, ${address.country}\n\nThank you for shopping with us!\n\nBest regards,\nShopNest Team`;
      await sendEmail(req.user.email, "Order Confirmation", message);
      res.status(201).json({ message: "Order created successfully", order });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "items.product",
      "name price",
    );
    res.json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server Error"});
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status;
      await order.save();
      res.json({ message: "Order status updated", order });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  createOrder,
  myOrders,
  getOrders,
  updateOrderStatus,
};
