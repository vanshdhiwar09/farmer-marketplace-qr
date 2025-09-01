const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Product = require("./Product");

const Order = sequelize.define("Order", {
  order_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  total_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  status: { 
    type: DataTypes.ENUM("pending", "completed", "cancelled"), 
    defaultValue: "pending" 
  }
}, {
  timestamps: true
});

// Relations
Order.belongsTo(User, { foreignKey: "consumer_id" });   // who placed the order
Order.belongsTo(Product, { foreignKey: "product_id" }); // which product
Product.hasMany(Order, { foreignKey: "product_id" });
User.hasMany(Order, { foreignKey: "consumer_id" });

module.exports = Order;
