export default {
  Notification: {
    event: ({ event_id }, args, { models }) => models.Event.findById(event_id)
  },
  Query: {
    userNotifications: (parent, args, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.Notification.findAll({
        where: { action_for_user_id: user.id }
      });
    }
  }
};
