const express = require("express");
const sequelize = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express(); // ✅ initialize app first
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// Connect DB
sequelize.authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch(err => console.log("❌ Error: " + err));

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
