export default (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allow_null: false
    },
    liked_by_id: {
      type: DataTypes.INTEGER,
      allow_null: false
    },
    created_at: {
      type: DataTypes.DATE,
      allow_null: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allow_null: false
    }
  });

  Like.associate = models => {
    Like.belongsTo(models.Event);
  };

  return Like;
};
