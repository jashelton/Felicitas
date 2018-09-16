export default (sequelize, DataTypes) => {
  const EventView = sequelize.define("Event_View", {
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
    }
  });

  EventView.associate = models => {
    EventView.belongsTo(models.Event);
    EventView.belongsTo(models.User);
  };

  return EventView;
};
