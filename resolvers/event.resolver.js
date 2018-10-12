import { AuthenticationError } from "apollo-server";
import Sequelize from "sequelize";
const Op = Sequelize.Op;

export default {
  Event: {
    user: ({ user_id }, args, { models }) =>
      models.User.findOne({
        where: { id: user_id }
      }),
    comments_count: ({ id }, args, { models }) =>
      models.Comment.count({
        where: { event_id: id }
      }),
    likes_count: ({ id }, args, { models }) =>
      models.Like.count({
        where: { event_id: id }
      }),
    has_liked: ({ id }, args, { models, user }) => {
      return models.Like.findOne({
        where: { event_id: id, liked_by_id: user.id }
      });
    },
    current_user_rating: async ({ id }, args, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      const data = await models.Rating.findOne({
        where: { event_id: id, user_id: user.id }
      });

      return data ? data.dataValues.value : null;
    },
    Images: ({ id }, args, { models }) =>
      models.Image.findAll({ where: { event_id: id } })
  },
  Query: {
    allEvents: async (parent, args, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      const { offset, rating_threshold } = args;
      const withoutOffset = Object.assign({}, args);
      delete withoutOffset.offset;
      delete withoutOffset.rating_threshold;
      delete withoutOffset.following; // TODO: Remove this when ready

      let where = {
        ...withoutOffset,
        "$Reports.id$": { [Op.eq]: null }
      };

      if (args.following)
        where = {
          ...where,
          [Op.or]: {
            "$User->Follows.followed_id$": { [Op.not]: null },
            "$Event.user_id$": user.id
          }
        };

      const events = await models.Event.findAll({
        attributes: [
          "id",
          "user_id",
          "event_type",
          "description",
          "display_on_map",
          "has_randomized_location",
          "latitude",
          "longitude",
          "title",
          "city",
          "country_code",
          "region",
          "created_at",
          "updated_at",
          [
            models.sequelize.fn("AVG", models.sequelize.col("Ratings.value")),
            "avg_rating"
          ],
          [
            models.sequelize.fn("COUNT", models.sequelize.col("Ratings.id")),
            "ratings_count"
          ]
        ],
        include: [
          {
            model: models.Rating,
            attributes: [],
            duplicating: false
          },
          {
            model: models.Report,
            attributes: [],
            on: {
              event_id: models.sequelize.where(
                models.sequelize.col("Reports.event_id"),
                "=",
                models.sequelize.col("Event.id")
              ),
              user_id: models.sequelize.where(
                models.sequelize.col("Reports.user_id"),
                "=",
                user.id
              )
            },
            duplicating: false
          },
          {
            model: models.User,
            attributes: [],
            duplicating: false,
            include: [
              {
                model: models.Follow,
                attributes: [],
                on: {
                  follower_id: models.sequelize.where(
                    models.sequelize.col("User->Follows.follower_id"),
                    "=",
                    user.id
                  ),
                  followed_id: models.sequelize.where(
                    models.sequelize.col("User->Follows.followed_id"),
                    "=",
                    models.sequelize.col("User.id")
                  )
                },
                duplicating: false
              }
            ]
          }
        ],
        group: ["Event.id"],
        order: models.sequelize.literal("Event.created_at DESC"),
        limit: 20,
        offset,
        having: {
          [Op.or]: {
            avg_rating: { [Op.gte]: rating_threshold },
            ratings_count: { [Op.lte]: 10 }
          }
        },
        where
      });

      if (!events.length) return [];
      return events.map(e => e.get({ plain: true }));
    },
    getEvent: (parent, { id }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.Event.findOne({
        where: { id }
      });
    },
    eventComments: (parent, { event_id }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.sequelize.query(
        `select * from Comments where event_id = ${event_id};`,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    },
    eventLikes: (parent, { event_id }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.sequelize.query(
        `
          select * from Likes L
          join Users U on U.id = L.liked_by_id
          where L.event_id = ${event_id};
        `,
        { type: models.sequelize.QueryTypes.SELECT }
      );
    }
  },
  Mutation: {
    deleteEvent: (parent, { id }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.Event.destroy({ where: { id, user_id: user.id } });
    },
    createVibe: (parent, { description }, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      return models.Event.create({
        description,
        event_type: "vibe",
        user_id: user.id
      });
    },
    createMoment: async (parent, args, { models, user }) => {
      if (!user) throw new AuthenticationError("Unauthorized!");

      const moment = await models.Event.create({
        ...args,
        event_type: "moment",
        user_id: user.id
      });

      const images = args.images.map(img => {
        return {
          ...img,
          event_id: moment.id,
          user_id: user.id
        };
      });

      await models.Image.bulkCreate(images);

      const { latitude, longitude } = moment;
      moment.coordinate = { latitude, longitude };

      return moment;
    }
  }
};
