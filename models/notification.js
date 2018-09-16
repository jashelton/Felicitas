export default (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
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
    action_type: {
      type: DataTypes.ENUM("spam", "inappropriate")
    },
    action_by_user_id: {
      type: DataTypes.INTEGER(11),
      allow_null: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    action_for_user_id: {
      type: DataTypes.INTEGER(11),
      allow_null: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    state: {
      type: DataTypes.ENUM("viewed", "new")
    }
  });

  Notification.associate = models => {
    Notification.belongsTo(models.Event);
    Notification.belongsTo(models.User);
  };

  return Notification;
};
