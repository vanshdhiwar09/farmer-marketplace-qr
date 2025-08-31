const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  "farmer_marketplace",   // DB name
  "root",                 // MySQL username
  process.env.DB_PASS,    // password from .env
  {
    host: "localhost",
    dialect: "mysql"
  }
);

module.exports = sequelize;
