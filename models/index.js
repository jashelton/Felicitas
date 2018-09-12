import Sequelize from "sequelize";
require("dotenv").load();

const sequelize = new Sequelize(
  process.env.MONETA_DATABASE,
  process.env.MONETA_USER,
  process.env.MONETA_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const db = {
  User: sequelize.import("./user"),
  Event: sequelize.import("./event"),
  Comment: sequelize.import("./comment"),
  Follow: sequelize.import("./follow")
  // Board: sequelize.import("./board"),
  // Suggestion: sequelize.import("./suggestion")
};

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
// db.Sequelize = Sequelize;

export default db;
