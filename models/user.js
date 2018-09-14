export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      push_token: DataTypes.STRING,
      profile_image: DataTypes.STRING,
      facebook_id: {
        type: DataTypes.INTEGER,
        allow_null: false
      },
      created_at: DataTypes.DATE
    },
    {
      underscored: true,
      timestamps: false,
      getterMethods: {
        name() {
          return `${this.get("first_name")} ${this.get("last_name")}`;
        }
      }
    }
  );

  User.associate = models => {
    // models.Event.belongsTo(User);
    // User.hasMany(models.Event);
    //   User.belongsToMany(models.User, {
    //     through: models.Follow,
    //     foreignKey: "followed_id",
    //     as: "following"
    //   });
    //   User.belongsToMany(models.User, {
    //     through: models.Follow,
    //     foreignKey: "follower_id",
    //     as: "followers"
    //   });
    // };
  };

  return User;
};
