const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth.js");

// 🛒 Place an order (only consumer)
router.post("/place", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "consumer") {
      return res.status(403).json({ error: "Only consumers can place orders" });
    }

    const { product_id, quantity } = req.body;

    // Find product
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const total_price = product.price * quantity;

    const order = await Order.create({
      consumer_id: req.user.userId,
      product_id,
      quantity,
      total_price,
      farmer_id: product.farmer_id, // link order to farmer
      status: "Pending",
    });

    res.json({ message: "✅ Order placed", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📦 Get all orders for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    let orders;
    if (req.user.role === "consumer") {
      // Orders placed by consumer
      orders = await Order.findAll({ where: { consumer_id: req.user.userId } });
    } else if (req.user.role === "farmer") {
      // Orders for farmer's products
      orders = await Order.findAll({ where: { farmer_id: req.user.userId } });
    } else {
      return res.status(403).json({ error: "Invalid role" });
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
