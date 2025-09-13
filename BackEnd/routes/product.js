const express = require("express");
const QRCode = require("qrcode");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/auth.js");

const router = express.Router();

// ➕ Add new product (only farmer)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({ error: "Only farmers can add products" });
    }

    const { name, description, price, harvest_date } = req.body;

    // Generate QR code (can contain product + farmer details)
    const qrData = `Product: ${name}, Farmer ID: ${req.user.userId}`;
    const qrCodeUrl = await QRCode.toDataURL(qrData);

    const product = await Product.create({
      farmer_id: req.user.userId,
      name,
      description,
      price,
      harvest_date,
      qr_code_url: qrCodeUrl,
    });

    res.json({ message: "✅ Product added", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📦 Get all products for logged-in farmer
router.get("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "farmer") {
      return res.status(403).json({ error: "Only farmers can view their products" });
    }

    const products = await Product.findAll({ where: { farmer_id: req.user.userId } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔍 View single product details (public)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
