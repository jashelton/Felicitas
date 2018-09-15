import { AuthenticationError } from "apollo-server";

export default {
  Event: {
    user: ({ user_id }, args, { models }) =>
      models.User.findOne({
        where: { id: user_id }
      }),
    // comments: ({ id }, args, { models }) =>
    //   models.Comment.findAll({
    //     include: [models.User],
    //     attributes: ["*"],
    //     where: { event_id: id }
    //   }),
    comments_count: ({ id }, args, { models }) =>
      models.Comment.count({
        where: { event_id: id }
      }),
    likes_count: ({ id }, args, { models }) =>
      models.Like.count({
        where: { event_id: id }
      }),
    avg_rating: async ({ id }, args, { models }) => {
      const data = await models.Rating.findAll({
        attributes: [
          [
            models.sequelize.fn("AVG", models.sequelize.col("value")),
            "avg_rating"
          ]
        ],
        where: { event_id: id }
      });

      return data[0].dataValues.avg_rating;
    },
    current_user_rating: async ({ id }, args, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      const data = await models.Rating.findOne({
        attributes: ["value"],
        where: { event_id: id, user_id: user.id }
      });

      return data ? data.dataValues.value : null;
    }
  },
  Query: {
    allEvents: (parent, { offset }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.Event.findAll({
        order: models.sequelize.literal("created_at DESC"),
        limit: 20,
        offset
      });
    },
    getEvent: (parent, { id }, { models }) =>
      models.Event.findOne({ where: { id } }),
    eventComments: async (parent, { event_id }, { models }) =>
      models.sequelize.query(
        `select * from comments where event_id = ${event_id};`,
        { type: models.sequelize.QueryTypes.SELECT }
      ),
    eventLikes: async (parent, { event_id }, { models }) => {
      return await models.sequelize.query(
        `
          select * from likes L
          join users U on U.id = L.liked_by_id
          where L.event_id = ${event_id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    }
  }
};
