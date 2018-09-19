export default {
  Notification: {
    event: ({ event_id }, args, { models }) => models.Event.findById(event_id)
  },
  Query: {
    userNotifications: (parent, { offset }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.Notification.findAll({
        offset,
        limit: 25,
        where: { action_for_user_id: user.id }
      });
    }
  }
};
