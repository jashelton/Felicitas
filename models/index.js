import Sequelize from "sequelize";
require("dotenv").load();

const sequelize = new Sequelize(
  process.env.MONETA_DATABASE,
  process.env.MONETA_USER,
  process.env.MONETA_PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    define: { underscored: true },
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
  Follow: sequelize.import("./follow"),
  Like: sequelize.import("./like"),
  Rating: sequelize.import("./rating"),
  Report: sequelize.import("./report"),
  Notification: sequelize.import("./notification"),
  EventView: sequelize.import("./event-view")
};

Object.keys(db).forEach(modelName => {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

sequelize.sync({ force: true }).then(() => {
  db.User.create({
    first_name: "Justin",
    last_name: "Shelton",
    facebook_id: "10216754142308209"
  }).then(({ dataValues }) => {
    db.Event.create({
      user_id: dataValues.id,
      event_type: "vibe",
      description: "This is a new Vibe",
      privacy: "Public"
    }).then(({ dataValues }) => {
      db.Event.create({
        user_id: dataValues.user_id,
        event_type: "moment",
        description: "This is a new moment with a test image.",
        privacy: "Public",
        latitude: 35.945075,
        longitude: -78.847563,
        image: "http://www.gstatic.com/webp/gallery/1.jpg",
        city: "Durham",
        country_code: "US",
        region: "NC"
      });
    });
  });
});

db.sequelize = sequelize;

export default db;
