require("dotenv").load();

module.exports = {
  development: {
    username: process.env.MONETA_USER,
    password: process.env.MONETA_PASSWORD,
    database: process.env.MONETA_DATABASE,
    host: process.env.MONETA_HOST,
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};
