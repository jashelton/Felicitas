export default (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.INTEGER,
      allow_null: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allow_null: false
    },
    text: {
      type: DataTypes.STRING,
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

  Comment.associate = models => {
    Comment.belongsTo(models.Event);
  };

  return Comment;
};
