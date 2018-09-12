export default (sequelize, DataTypes) => {
  const Rating = sequelize.define(
    "Rating",
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
      event_id: {
        type: DataTypes.INTEGER,
        allow_null: false
      },
      value: {
        type: DataTypes.INTEGER,
        allow_null: false
      },
      created_at: {
        type: DataTypes.DATE,
        allow_null: false
      },
      updated_at: DataTypes.DATE
    },
    {
      underscored: true
    }
  );

  Rating.associate = models => {
    Rating.belongsTo(models.Event);
  };

  return Rating;
};
