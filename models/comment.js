export default (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
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
    text: {
      type: DataTypes.STRING,
      allow_null: false
    }
  });

  Comment.associate = models => {
    Comment.belongsTo(models.Event);
    Comment.belongsTo(models.User);
  };

  return Comment;
};
