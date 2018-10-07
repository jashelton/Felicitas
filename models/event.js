export default (sequelize, DataTypes) => {
  const Event = sequelize.define(
    "Event",
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER(11),
        allow_null: false,
        references: {
          model: "Users",
          key: "id"
        }
      },
      event_type: {
        type: DataTypes.ENUM("moment", "vibe"),
        allow_null: false
      },
      description: DataTypes.TEXT,
      display_on_map: DataTypes.BOOLEAN,
      has_randomized_location: DataTypes.BOOLEAN,
      latitude: DataTypes.DECIMAL(10, 6),
      longitude: DataTypes.DECIMAL(10, 6),
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      city: DataTypes.STRING,
      country_code: DataTypes.STRING,
      region: DataTypes.STRING
    },
    {
      getterMethods: {
        coordinate() {
          return {
            latitude: this.get("latitude"),
            longitude: this.get("longitude")
          };
        }
      },
      setterMethods: {
        coordinate(value) {
          this.setDataValue("longitude", value.longitude);
          this.setDataValue("latitude", value.latitude);
        }
      }
    }
  );

  Event.associate = models => {
    Event.belongsTo(models.User);
    Event.hasMany(models.Like, { onDelete: "CASCADE" });
    Event.hasMany(models.Report, { onDelete: "CASCADE" });
    Event.hasMany(models.Comment, { onDelete: "CASCADE" });
    Event.hasMany(models.Rating, { onDelete: "CASCADE" });
    Event.hasMany(models.Image, { onDelete: "CASCADE" });
  };

  return Event;
};
