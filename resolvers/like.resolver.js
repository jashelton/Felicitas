export default {
  Mutation: {
    createLike: async (parent, { event_id }, { models, user }) => {
      try {
        const exists = await models.Like.findOne({
          where: { event_id, liked_by_id: user.id }
        });

        if (exists) throw new Error("User has already liked this event.");

        return models.Like.create({ event_id, liked_by_id: user.id });
      } catch (err) {
        throw new Error(err);
      }
    },
    deleteLike: (parent, { event_id }, { models, user }) =>
      models.Like.destroy({ where: { event_id, liked_by_id: user.id } })
  }
};
