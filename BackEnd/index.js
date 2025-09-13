const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");

dotenv.config();
const app = express();

// ✅ Allow frontend (React) to talk to backend
app.use(cors({
  origin: "http://localhost:3000",   // your React dev server
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
  });
});
