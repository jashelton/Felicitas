export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allow_null: false,
        unique: true
      },
      username: DataTypes.STRING,
      push_token: DataTypes.STRING,
      profile_image: DataTypes.STRING,
      facebook_id: {
        type: DataTypes.BIGINT,
        allow_null: false,
        unique: true
      }
    },
    {
      getterMethods: {
        name() {
          return `${this.get("first_name")} ${this.get("last_name")}`;
        }
      }
    }
  );

  User.associate = models => {
    User.hasMany(models.Event);
    User.hasMany(models.Comment);
    User.hasMany(models.Report);
    User.hasMany(models.Image);
    User.hasMany(models.Follow, { foreignKey: "followed_id" });
  };

  return User;
};
