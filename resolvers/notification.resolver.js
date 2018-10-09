import { AuthenticationError } from "apollo-server";

export default {
  Notification: {
    event: ({ event_id }, args, { models }) => models.Event.findById(event_id),
    actor: ({ action_by_user_id: id }, args, { models }) => {
      return models.User.findById(id);
    }
  },
  Query: {
    userNotifications: (parent, { offset }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.Notification.findAll({
        offset,
        limit: 25,
        order: models.sequelize.literal("created_at DESC"),
        where: { action_for_user_id: user.id }
      });
    }
  }
};
