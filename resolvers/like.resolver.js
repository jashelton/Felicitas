export default {
  Mutation: {
    toggleLike: async (
      parent,
      { event_id, action_for_user_id },
      { models, user }
    ) => {
      const exists = await models.Like.findOne({
        where: { event_id, liked_by_id: user.id }
      });

      if (exists) {
        await models.Like.destroy({
          where: { event_id, liked_by_id: user.id }
        });
      } else {
        await models.Like.create({ event_id, liked_by_id: user.id });

        if (action_for_user_id !== user.id) {
          models.Notification.create({
            event_id,
            action_type: "like",
            action_by_user_id: user.id,
            action_for_user_id,
            state: "new"
          });
        }
      }

      return models.Event.findById(event_id);
    }
  }
};
