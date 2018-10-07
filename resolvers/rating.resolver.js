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

      // TODO: This is gross but needs for now since I change avg_rating in the event.resolver
      const event = await models.Event.findById(event_id);
      const avg_rating = await models.Rating.findAll({
        where: { event_id },
        attributes: [
          [
            models.sequelize.fn("AVG", models.sequelize.col("value")),
            "avg_rating"
          ]
        ]
      });

      event.dataValues.avg_rating = avg_rating[0].dataValues.avg_rating;
      return event.get({ plain: true });
    }
  }
};
