const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Product = require("../models/Product");

// Place an order
router.post("/place", async (req, res) => {
  try {
    const { consumer_id, product_id, quantity } = req.body;

    // Find product
    const product = await Product.findByPk(product_id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    const total_price = product.price * quantity;

    const order = await Order.create({ 
      consumer_id, 
      product_id, 
      quantity, 
      total_price 
    });

    res.json({ message: "✅ Order placed", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders by consumer
router.get("/consumer/:id", async (req, res) => {
  try {
    const orders = await Order.findAll({ where: { consumer_id: req.params.id } });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
