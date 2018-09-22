export default (sequelize, DataTypes) => {
  const Image = sequelize.define("Image", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER(11),
      allow_null: false,
      references: {
        model: "Events",
        key: "id"
      }
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allow_null: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    image: {
      type: DataTypes.STRING,
      allow_null: false
    }
  });

  Image.associate = models => {
    Image.belongsTo(models.Event);
    Image.belongsTo(models.User);
  };

  return Image;
};
