export default (sequelize, type) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: type.INTEGER,
        allow_null: false
      },
      event_type: {
        type: type.ENUM("moment", "vibe"),
        allow_null: false
      },
      description: type.STRING,
      active: type.BOOLEAN,
      privacy: type.ENUM("public", "private"),
      latitude: type.DECIMAL(10, 6),
      longitude: type.DECIMAL(10, 6),
      title: type.STRING,
      image: type.STRING,
      city: type.STRING,
      country_code: type.STRING,
      region: type.STRING,
      created_at: {
        type: type.DATE,
        allow_null: false
      }
    },
    {
      underscored: true,
      timestamps: false
    }
  );

  Event.associate = models => {
    // 1 to many with Event
    Event.belongsTo(models.User);
  };

  return Event;
};
