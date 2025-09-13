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
  },
  farmer_id: { type: DataTypes.INTEGER, allowNull: false } // 👈 link order to farmer
}, {
  timestamps: true
});

// Relations
Order.belongsTo(User, { foreignKey: "consumer_id", as: "consumer" });   // who placed order
Order.belongsTo(User, { foreignKey: "farmer_id", as: "farmer" });       // farmer of the product
Order.belongsTo(Product, { foreignKey: "product_id" });                 // which product

Product.hasMany(Order, { foreignKey: "product_id" });
User.hasMany(Order, { foreignKey: "consumer_id" });
User.hasMany(Order, { foreignKey: "farmer_id" });

module.exports = Order;
