const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Product = sequelize.define("Product", {
  product_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  harvest_date: { type: DataTypes.DATE },
  qr_code_url: { type: DataTypes.TEXT(`long`) }
});

// Relation: Product belongs to a farmer
Product.belongsTo(User, { foreignKey: "farmer_id" });

module.exports = Product;
