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
  })
    .then(({ dataValues }) => {
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
    })
    .then(() => {
      db.Comment.create({
        event_id: 1,
        user_id: 1,
        text: "This is a new comment!"
      });
    })
    .then(() => {
      db.User.create({
        first_name: "Oliver",
        last_name: "Queen",
        facebook_id: "123456789"
      });
    })
    .then(() => {
      db.User.create({
        first_name: "Theia",
        last_name: "Queen",
        facebook_id: "987654321"
      });
    })
    .then(() => {
      db.Follow.create({
        followed_id: 2,
        follower_id: 1
      });
    })
    .then(() => {
      db.Follow.create({
        followed_id: 1,
        follower_id: 2
      });
    })
    .then(() => {
      db.Event.create({
        user_id: 2,
        event_type: "moment",
        description: "This moment is fireeee... pun intended.",
        latitude: 36.117515,
        longitude: -115.188159,
        image: "http://www.gstatic.com/webp/gallery/5.jpg",
        city: "Las Vegas",
        country_code: "US",
        region: "NV"
      });
    })
    .then(() => {
      db.Event.create({
        user_id: 3,
        event_type: "moment",
        description: "Just chillin'.",
        latitude: 36.117515,
        longitude: -115.188159,
        image: "http://www.gstatic.com/webp/gallery/2.jpg",
        city: "Las Vegas",
        country_code: "US",
        region: "NV"
      });
    });
});

db.sequelize = sequelize;

export default db;
