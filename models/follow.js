export default (sequelize, DataTypes) => {
  const Follow = sequelize.define("Follow", {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true
    },
    followed_id: {
      type: DataTypes.INTEGER(11),
      allow_null: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    follower_id: {
      type: DataTypes.INTEGER(11),
      allow_null: false,
      references: {
        model: "Users",
        key: "id"
      }
    }
  });

  Follow.associate = models => {
    Follow.belongsTo(models.User, { foreignKey: "followed_id" });
    Follow.belongsTo(models.User, { foreignKey: "follower_id" });
  };

  return Follow;
};
