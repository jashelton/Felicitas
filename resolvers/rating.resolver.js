export default {
  Mutation: {
    rateEvent: async (parent, { event_id, value }, { models, user }) => {
      const exists = await models.Rating.findOne({
        where: { event_id, user_id: user.id }
      });

      if (exists) {
        await models.Rating.update(
          {
            event_id,
            user_id: user.id,
            value
          },
          { where: { event_id, user_id: user.id } }
        );
      } else {
        await models.Rating.create({ event_id, user_id: user.id, value });
      }

      return models.Event.findById(event_id);
    }
  }
};
