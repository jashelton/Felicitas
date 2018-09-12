export default (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allow_null: false
      },
      event_type: {
        type: DataTypes.ENUM("moment", "vibe"),
        allow_null: false
      },
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      privacy: DataTypes.ENUM("public", "private"),
      latitude: DataTypes.DECIMAL(10, 6),
      longitude: DataTypes.DECIMAL(10, 6),
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      city: DataTypes.STRING,
      country_code: DataTypes.STRING,
      region: DataTypes.STRING,
      created_at: {
        type: DataTypes.DATE,
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
    Event.hasMany(models.Comment);
    Event.hasMany(models.Like);
  };

  return Event;
};
