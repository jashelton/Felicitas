export default (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      followed_id: {
        type: DataTypes.INTEGER,
        allow_null: false
      },
      follower_id: {
        type: DataTypes.INTEGER,
        allow_null: false
      },
      following: DataTypes.BOOLEAN,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE
    },
    {
      underscored: true
    }
  );

  // Follow.associate = models => {
  //   // 1 to many with Follow
  //   Follow.belongsTo(models.User, { foreignKey: "followed_id" });
  // };

  return Follow;
};
