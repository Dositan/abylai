const Sequelize = require("sequelize");

// Initialize database
const db = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  // SQLite only
  storage: "dev.db",
});

module.exports = db;
