export default (sequelize, DataTypes) => {
  const Report = sequelize.define("Report", {
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
    reason: {
      type: DataTypes.ENUM("spam", "inappropriate")
    }
  });

  Report.associate = models => {
    // Report.belongsTo(models.Event);
    Report.belongsTo(models.User);
  };

  return Report;
};
