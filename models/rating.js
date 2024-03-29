export default (sequelize, DataTypes) => {
  const Rating = sequelize.define("Rating", {
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
    event_id: {
      type: DataTypes.INTEGER(11),
      allow_null: false,
      references: {
        model: "Events",
        key: "id"
      }
    },
    value: {
      type: DataTypes.INTEGER,
      allow_null: false
    }
  });

  Rating.associate = models => {
    Rating.belongsTo(models.Event);
  };

  return Rating;
};
