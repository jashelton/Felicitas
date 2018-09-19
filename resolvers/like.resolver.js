export default {
  Mutation: {
    toggleLike: async (parent, { event_id }, { models, user }) => {
      const exists = await models.Like.findOne({
        where: { event_id, liked_by_id: user.id }
      });

      if (exists) {
        await models.Like.destroy({
          where: { event_id, liked_by_id: user.id }
        });
      } else {
        await models.Like.create({ event_id, liked_by_id: user.id });
      }

      return models.Event.findById(event_id);
    }
  }
};
