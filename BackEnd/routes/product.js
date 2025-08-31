const express = require("express");
const QRCode = require("qrcode");
const Product = require("../models/Product");

const router = express.Router();

// Add new product
router.post("/add", async (req, res) => {
  try {
    const { farmer_id, name, description, price, harvest_date } = req.body;

    // Generate QR code (contains basic info)
    const qrData = `Product: ${name}, Farmer ID: ${farmer_id}`;
    const qrCodeUrl = await QRCode.toDataURL(qrData);

    const product = await Product.create({
      farmer_id,
      name,
      description,
      price,
      harvest_date,
      qr_code_url: qrCodeUrl
    });

    res.json({ message: "✅ Product added", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// View product details
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
