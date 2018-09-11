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
      facebook_id: DataTypes.BIGINT,
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
    // 1 to many with board
    User.hasMany(models.Event);
  };

  return User;
};
